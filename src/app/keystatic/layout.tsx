import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  const allow = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allow.includes(email.toLowerCase());
}

export default async function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Local content editing without SSO friction; production requires allowlisted Google SSO
  if (process.env.NODE_ENV !== "development") {
    const session = await auth();
    if (!isAdminEmail(session?.user?.email)) {
      redirect("/admin");
    }
  }

  return (
    <div className="min-h-screen bg-white text-black [&_header]:hidden [&_footer]:hidden">
      {children}
    </div>
  );
}
