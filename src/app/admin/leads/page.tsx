import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { listLeads } from "@/lib/db";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Admin · Leads",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin");

  const leads = await listLeads(200);

  return (
    <>
      <PageHero eyebrow="Admin" title="Leads" description={`${leads.length} recent submissions`} />
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
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Page</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-[var(--muted)]" colSpan={6}>
                      No leads yet. Submissions appear here after forms are used.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-[var(--line)]">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleString("en-GB")}
                      </td>
                      <td className="px-4 py-3">{lead.type}</td>
                      <td className="px-4 py-3">{lead.email}</td>
                      <td className="px-4 py-3">{lead.name || "—"}</td>
                      <td className="px-4 py-3">{lead.company || "—"}</td>
                      <td className="px-4 py-3">{lead.page || "—"}</td>
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
