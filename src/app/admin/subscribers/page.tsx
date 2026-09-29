import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { listSubscribers } from "@/lib/db";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Admin · Subscribers",
  robots: { index: false, follow: false },
};

export default async function AdminSubscribersPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin");

  const subscribers = await listSubscribers(500);

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Subscribers"
        description={`${subscribers.length} newsletter subscribers`}
      />
      <section className="section">
        <div className="container-page">
          <Link href="/admin" className="text-sm font-semibold text-[var(--accent)]">
            ← Dashboard
          </Link>
          <div className="mt-6 overflow-x-auto rounded-lg border border-[var(--line)] bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[var(--line)] bg-[var(--bg)] text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">When</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Source</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-[var(--muted)]" colSpan={3}>
                      No subscribers yet.
                    </td>
                  </tr>
                ) : (
                  subscribers.map((s) => (
                    <tr key={s.id} className="border-b border-[var(--line)]">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(s.created_at).toLocaleString("en-GB")}
                      </td>
                      <td className="px-4 py-3">{s.email}</td>
                      <td className="px-4 py-3">{s.source || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
