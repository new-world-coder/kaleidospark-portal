import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Keystatic UI in production unless authenticated admin
  if (pathname.startsWith("/keystatic")) {
    // Allow in development for local content editing without SSO friction
    if (process.env.NODE_ENV === "development") {
      return NextResponse.next();
    }
    const session = await auth();
    const allow = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const email = session?.user?.email?.toLowerCase();
    if (!email || !allow.includes(email)) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/keystatic/:path*"],
};
