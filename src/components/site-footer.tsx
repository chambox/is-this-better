import { Link } from "@tanstack/react-router";
import { Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const BRAND_PRIMARY = "#0d7a5f";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span
                className="grid size-8 place-items-center rounded-xl shadow-sm"
                style={{ background: `linear-gradient(135deg, ${BRAND_ORANGE}, #c9a84c)` }}
              >
                <Heart className="size-4 fill-white text-white" />
              </span>
              <span className="text-xl font-extrabold tracking-tight">
                give<span style={{ color: BRAND_ORANGE }}>hope</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-neutral-600">
              The trusted home for community fundraising. Turn empathy into action — start a fundraiser or support a cause in minutes.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid size-9 place-items-center rounded-full border border-neutral-200 text-neutral-600 transition hover:border-[#0d7a5f] hover:text-[#0d7a5f]"
                  aria-label="Social link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Fundraise"
            links={[
              { label: "Start a Fundraiser", to: "/start" },
              { label: "Categories", to: "/", hash: "categories" },
              { label: "How It Works", to: "/about/how-it-works" },
              { label: "Success Stories", to: "/", hash: "stories" },
            ]}
          />
          <FooterCol
            title="About"
            links={[
              { label: "Our Story", to: "/about/how-it-works" },
              { label: "Refund Guarantee", to: "/about/refund-guarantees" },
              { label: "FAQ", to: "/about/faq" },
              { label: "Trust & Safety", to: "/", hash: "trust" },
            ]}
          />
          <FooterCol
            title="Support"
            links={[
              { label: "Contact Us", to: "/contact" },
              { label: "Help Center", to: "/about/faq" },
              { label: "How It Works", to: "/about/how-it-works" },
              { label: "Refund Policy", to: "/about/refund-guarantees" },
            ]}
          />

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} givehope. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#0d7a5f]">Terms</a>
            <a href="#" className="hover:text-[#0d7a5f]">Privacy</a>
            <a href="#" className="hover:text-[#0d7a5f]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string; hash?: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-extrabold uppercase tracking-wide text-neutral-900">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-neutral-600">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} hash={l.hash} className="hover:text-[#0d7a5f]">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
