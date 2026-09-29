import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export type LeadRow = {
  id: string;
  type: string;
  page: string | null;
  email: string;
  name: string | null;
  company: string | null;
  payload: Record<string, unknown>;
  utm: Record<string, string>;
  created_at: string;
};

export type SubscriberRow = {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
};

let sql: NeonQueryFunction<false, false> | null = null;
let schemaReady = false;

const memoryLeads: LeadRow[] = [];
const memorySubscribers: SubscriberRow[] = [];

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!sql) sql = neon(url);
  return sql;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

async function ensureSchema() {
  const db = getSql();
  if (!db || schemaReady) return;
  await db`
    CREATE TABLE IF NOT EXISTS leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      type TEXT NOT NULL,
      page TEXT,
      email TEXT NOT NULL,
      name TEXT,
      company TEXT,
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      utm JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS subscribers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL UNIQUE,
      source TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS assessment_responses (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL,
      name TEXT,
      company TEXT,
      scores JSONB NOT NULL DEFAULT '{}'::jsonb,
      answers JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  schemaReady = true;
}

function uid() {
  return crypto.randomUUID();
}

export async function insertLead(input: {
  type: string;
  page?: string;
  email: string;
  name?: string;
  company?: string;
  payload?: Record<string, unknown>;
  utm?: Record<string, string>;
}) {
  const db = getSql();
  const payload = input.payload ?? {};
  const utm = input.utm ?? {};

  if (!db) {
    const row: LeadRow = {
      id: uid(),
      type: input.type,
      page: input.page ?? null,
      email: input.email,
      name: input.name ?? null,
      company: input.company ?? null,
      payload,
      utm,
      created_at: new Date().toISOString(),
    };
    memoryLeads.unshift(row);
    return { id: row.id, persisted: "memory" as const };
  }

  await ensureSchema();
  const rows = await db`
    INSERT INTO leads (type, page, email, name, company, payload, utm)
    VALUES (
      ${input.type},
      ${input.page ?? null},
      ${input.email},
      ${input.name ?? null},
      ${input.company ?? null},
      ${JSON.stringify(payload)},
      ${JSON.stringify(utm)}
    )
    RETURNING id
  `;
  return { id: rows[0].id as string, persisted: "neon" as const };
}

export async function insertSubscriber(email: string, source?: string) {
  const db = getSql();
  if (!db) {
    const existing = memorySubscribers.find((s) => s.email === email);
    if (existing) return { id: existing.id, persisted: "memory" as const };
    const row: SubscriberRow = {
      id: uid(),
      email,
      source: source ?? null,
      created_at: new Date().toISOString(),
    };
    memorySubscribers.unshift(row);
    return { id: row.id, persisted: "memory" as const };
  }

  await ensureSchema();
  const rows = await db`
    INSERT INTO subscribers (email, source)
    VALUES (${email}, ${source ?? null})
    ON CONFLICT (email) DO UPDATE SET source = COALESCE(EXCLUDED.source, subscribers.source)
    RETURNING id
  `;
  return { id: rows[0].id as string, persisted: "neon" as const };
}

export async function insertAssessment(input: {
  email: string;
  name?: string;
  company?: string;
  scores: Record<string, number>;
  answers: Record<string, unknown>;
}) {
  const result = await insertLead({
    type: "assessment",
    page: "/assessment",
    email: input.email,
    name: input.name,
    company: input.company,
    payload: { scores: input.scores, answers: input.answers },
  });

  const db = getSql();
  if (db) {
    await ensureSchema();
    await db`
      INSERT INTO assessment_responses (email, name, company, scores, answers)
      VALUES (
        ${input.email},
        ${input.name ?? null},
        ${input.company ?? null},
        ${JSON.stringify(input.scores)},
        ${JSON.stringify(input.answers)}
      )
    `;
  }

  return result;
}

export async function listLeads(limit = 100): Promise<LeadRow[]> {
  const db = getSql();
  if (!db) return memoryLeads.slice(0, limit);
  await ensureSchema();
  const rows = await db`
    SELECT id, type, page, email, name, company, payload, utm, created_at
    FROM leads
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows as LeadRow[];
}

export async function listSubscribers(limit = 100): Promise<SubscriberRow[]> {
  const db = getSql();
  if (!db) return memorySubscribers.slice(0, limit);
  await ensureSchema();
  const rows = await db`
    SELECT id, email, source, created_at
    FROM subscribers
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows as SubscriberRow[];
}
