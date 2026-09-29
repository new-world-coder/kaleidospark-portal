import { z } from "zod";
import { insertLead, insertSubscriber, insertAssessment } from "@/lib/db";
import { sendLeadNotification, sendSubscriberConfirm } from "@/lib/email";

export const leadSchema = z.object({
  type: z.enum([
    "contact",
    "book-call",
    "demo",
    "newsletter",
    "whitepaper",
    "webinar",
    "partner",
    "investor",
    "career",
    "assessment",
    "media",
    "speaking",
  ]),
  page: z.string().optional(),
  email: z.string().email(),
  name: z.string().min(1).max(200).optional(),
  company: z.string().max(200).optional(),
  message: z.string().max(5000).optional(),
  phone: z.string().max(50).optional(),
  role: z.string().max(120).optional(),
  website: z.string().max(0).optional(), // honeypot
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  turnstileToken: z.string().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

async function verifyTurnstile(token?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form },
  );
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}

async function postCrmWebhook(body: Record<string, unknown>) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return { skipped: true as const };
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { skipped: false as const };
  } catch (error) {
    console.error("[crm] webhook failed", error);
    return { skipped: false as const, error: true as const };
  }
}

export async function processLead(raw: unknown) {
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: "Invalid form data",
      details: parsed.error.flatten(),
    };
  }

  const data = parsed.data;

  // Honeypot
  if (data.website) {
    return { ok: true as const, ignored: true as const };
  }

  const turnstileOk = await verifyTurnstile(data.turnstileToken);
  if (!turnstileOk) {
    return { ok: false as const, error: "Spam verification failed" };
  }

  const utm: Record<string, string> = {};
  if (data.utm_source) utm.source = data.utm_source;
  if (data.utm_medium) utm.medium = data.utm_medium;
  if (data.utm_campaign) utm.campaign = data.utm_campaign;

  const payload = {
    ...(data.payload ?? {}),
    message: data.message,
    phone: data.phone,
    role: data.role,
  };

  if (data.type === "newsletter") {
    await insertSubscriber(data.email, data.page);
    await sendSubscriberConfirm(data.email);
  } else if (data.type === "assessment") {
    const scores =
      (data.payload?.scores as Record<string, number> | undefined) ?? {};
    const answers =
      (data.payload?.answers as Record<string, unknown> | undefined) ?? {};
    await insertAssessment({
      email: data.email,
      name: data.name,
      company: data.company,
      scores,
      answers,
    });
  } else {
    await insertLead({
      type: data.type,
      page: data.page,
      email: data.email,
      name: data.name,
      company: data.company,
      payload,
      utm,
    });
  }

  await sendLeadNotification({
    type: data.type,
    email: data.email,
    name: data.name,
    company: data.company,
    page: data.page,
    payload,
  });

  await postCrmWebhook({
    type: data.type,
    email: data.email,
    name: data.name,
    company: data.company,
    page: data.page,
    payload,
    utm,
    receivedAt: new Date().toISOString(),
  });

  return { ok: true as const };
}
