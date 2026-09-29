import { NextResponse } from "next/server";
import { processLead } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await processLead(body);
    const status = result.ok ? 200 : 400;
    return NextResponse.json(result, { status });
  } catch (error) {
    console.error("[api/leads]", error);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
