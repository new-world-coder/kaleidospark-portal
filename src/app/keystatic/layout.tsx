export const runtime = "nodejs";
export const dynamic = "force-static";

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-black [&_header]:hidden [&_footer]:hidden">
      {children}
    </div>
  );
}
