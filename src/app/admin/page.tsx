import type { Metadata } from "next";
import Link from "next/link";
import { auth, signIn, signOut, requireAdmin } from "@/lib/auth";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";
import { isDatabaseConfigured } from "@/lib/db";
import { isEmailConfigured } from "@/lib/email";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await auth();
  const admin = session?.user?.email ? await requireAdmin() : null;

  if (!admin) {
    return (
      <>
        <PageHero
          eyebrow="Admin"
          title="Sign in with Google"
          description="Access is limited to allowlisted KaleidoSpark emails configured via ADMIN_EMAILS."
        />
        <section className="section">
          <div className="container-narrow">
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/admin" });
              }}
            >
              <Button type="submit" size="lg">
                Continue with Google
              </Button>
            </form>
            <p className="mt-4 text-sm text-[var(--muted)]">
              Requires AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_SECRET, and ADMIN_EMAILS in the
              environment.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Operations dashboard"
        description={`Signed in as ${admin.user?.email}`}
      />
      <section className="section">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AdminCard href="/admin/leads" title="Leads" body="Contact, demo, assessment, and other form submissions." />
          <AdminCard href="/admin/subscribers" title="Subscribers" body="Newsletter subscription list." />
          <AdminCard href="/keystatic" title="Content (Keystatic)" body="Edit blog, research, newsroom, and events in git." />
          <div className="rounded-lg border border-[var(--line)] bg-white p-6 text-sm text-[var(--muted)]">
            <p className="font-semibold text-[var(--ink)]">Environment</p>
            <ul className="mt-3 space-y-1">
              <li>Database: {isDatabaseConfigured() ? "Neon configured" : "Memory fallback"}</li>
              <li>Email: {isEmailConfigured() ? "Resend configured" : "Skipped"}</li>
              <li>CRM webhook: {process.env.CRM_WEBHOOK_URL ? "Set" : "Not set"}</li>
            </ul>
            <form
              className="mt-6"
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin" });
              }}
            >
              <Button type="submit" variant="outline">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function AdminCard({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-[var(--line)] bg-white p-6 transition-colors hover:border-[var(--accent)] focus-ring"
    >
      <h2 className="display text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">{body}</p>
    </Link>
  );
}
