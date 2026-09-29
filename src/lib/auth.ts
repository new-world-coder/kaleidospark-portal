import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

function adminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/admin",
    error: "/admin",
  },
  callbacks: {
    async signIn({ user }) {
      const allow = adminEmails();
      if (!allow.length) {
        // Without ADMIN_EMAILS configured, deny all (safe default)
        console.warn("[auth] ADMIN_EMAILS not configured — denying sign-in");
        return false;
      }
      const email = user.email?.toLowerCase();
      return Boolean(email && allow.includes(email));
    },
    async session({ session }) {
      return session;
    },
  },
  trustHost: true,
});

export async function requireAdmin() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  const allow = adminEmails();
  if (!email || !allow.includes(email)) {
    return null;
  }
  return session;
}
