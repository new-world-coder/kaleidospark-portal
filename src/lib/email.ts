import { Resend } from "resend";

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendLeadNotification(input: {
  type: string;
  email: string;
  name?: string;
  company?: string;
  page?: string;
  payload?: Record<string, unknown>;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[email] RESEND_API_KEY missing — skipping lead notification");
    return { skipped: true as const };
  }

  const resend = new Resend(apiKey);
  const to = process.env.LEAD_NOTIFY_EMAIL || "kaleidospark@icloud.com";
  const from =
    process.env.RESEND_FROM_EMAIL || "KaleidoSpark <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to,
    subject: `[KaleidoSpark] New ${input.type} lead — ${input.email}`,
    text: [
      `Type: ${input.type}`,
      `Email: ${input.email}`,
      `Name: ${input.name ?? "—"}`,
      `Company: ${input.company ?? "—"}`,
      `Page: ${input.page ?? "—"}`,
      "",
      "Payload:",
      JSON.stringify(input.payload ?? {}, null, 2),
    ].join("\n"),
  });

  return { skipped: false as const };
}

export async function sendSubscriberConfirm(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[email] RESEND_API_KEY missing — skipping subscriber confirm");
    return { skipped: true as const };
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM_EMAIL || "KaleidoSpark <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to: email,
    subject: "You’re on the KaleidoSpark Insights list",
    text: "Thanks for subscribing. You’ll receive research notes, event invitations, and practical AI governance briefings from KaleidoSpark. You can unsubscribe at any time by replying to this email.",
  });

  return { skipped: false as const };
}
