"use server";

import { processLead } from "@/lib/leads";

export async function submitLeadAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const payloadRaw = formData.get("payload");
  let payload: Record<string, unknown> | undefined;
  if (typeof payloadRaw === "string" && payloadRaw) {
    try {
      payload = JSON.parse(payloadRaw) as Record<string, unknown>;
    } catch {
      payload = undefined;
    }
  }

  const result = await processLead({
    ...raw,
    payload,
  });

  return result;
}
