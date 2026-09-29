import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import { SubscribeForm } from "@/components/forms/subscribe-form";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] text-[#e8eef5]">
      <div className="container-page section-tight">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="display text-3xl tracking-tight">
              Kaleido<span className="text-[color-mix(in_srgb,#7fd4d9_80%,white)]">Spark</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#b7c2d0]">
              Boutique AI consultancy for enterprises that need strategy, delivery,
              and governance in one accountable team.
            </p>
            <div className="mt-6 space-y-1 text-sm text-[#b7c2d0]">
              <p>
                <a className="hover:text-white focus-ring" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <a className="hover:text-white focus-ring" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                  {siteConfig.phone}
                </a>
              </p>
              <p>{siteConfig.location}</p>
            </div>
            <div className="mt-8 max-w-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7fd4d9]">
                Insights newsletter
              </p>
              <p className="mt-2 text-sm text-[#b7c2d0]">
                Research notes and practical governance briefings. No spam.
              </p>
              <div className="mt-4">
                <SubscribeForm source="/footer" variant="dark" />
              </div>
            </div>
          </div>

          {(
            [
              ["Company", footerNav.company],
              ["Expertise", footerNav.expertise],
              ["Insights", footerNav.insights],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7fd4d9]">
                {title}
              </p>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#c5ced9] transition-colors hover:text-white focus-ring"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-[#8b97a8] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white focus-ring">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
