import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, X, ChevronDown, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";

const BRAND_PRIMARY = "#0d7a5f";

export function SiteHeader() {
  const user = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    if (!aboutOpen) return;
    const close = () => setAboutOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [aboutOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span
            className="grid size-8 place-items-center rounded-xl shadow-sm"
            style={{ background: `linear-gradient(135deg, ${BRAND_ORANGE}, #c9a84c)` }}
          >
            <Heart className="size-4 fill-white text-white" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-neutral-900">
            give<span style={{ color: BRAND_ORANGE }}>hope</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-sm font-semibold text-neutral-700 md:flex">
          <Link to="/" hash="featured" className="hover:text-[#0d7a5f]">
            Donate
          </Link>
          <Link to="/start" className="hover:text-[#0d7a5f]">
            Fundraise
          </Link>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setAboutOpen((v) => !v)}
              className="inline-flex items-center gap-1 hover:text-[#0d7a5f]"
            >
              About <ChevronDown className="size-3.5" />
            </button>
            {aboutOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl animate-fade-in">
                <Link
                  to="/about/how-it-works"
                  className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-[#e8f5f0] hover:text-[#0d7a5f]"
                >
                  How It Works
                </Link>
                <Link
                  to="/about/refund-guarantees"
                  className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-[#e8f5f0] hover:text-[#0d7a5f]"
                >
                  Refund Guarantees
                </Link>
                <Link
                  to="/about/faq"
                  className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-[#e8f5f0] hover:text-[#0d7a5f]"
                >
                  FAQ
                </Link>
              </div>
            )}
          </div>
          <Link to="/contact" className="hover:text-[#0d7a5f]">
            Contact
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-bold text-neutral-800 hover:bg-neutral-50"
            >
              <span className="grid size-6 place-items-center rounded-full bg-[#E8F4FF]">
                <UserIcon className="size-3.5 text-[#c9a84c]" />
              </span>
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link to="/login" className="text-sm font-semibold text-neutral-700 hover:text-[#0d7a5f]">
              Sign In
            </Link>
          )}
          <Link
            to="/start"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
            style={{ background: BRAND_ORANGE }}
          >
            Start a Fundraiser
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-lg border border-neutral-200 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm font-semibold text-neutral-700 sm:px-8">
            <Link to="/" hash="featured" className="rounded-lg px-3 py-2 hover:bg-neutral-50" onClick={() => setMobileOpen(false)}>
              Donate
            </Link>
            <Link to="/start" className="rounded-lg px-3 py-2 hover:bg-neutral-50" onClick={() => setMobileOpen(false)}>
              Fundraise
            </Link>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 hover:bg-neutral-50">
                About <ChevronDown className="size-4 transition group-open:rotate-180" />
              </summary>
              <div className="ml-3 mt-1 flex flex-col">
                <Link to="/about/how-it-works" className="rounded-lg px-3 py-2 text-neutral-600 hover:bg-neutral-50" onClick={() => setMobileOpen(false)}>
                  How It Works
                </Link>
                <Link to="/about/refund-guarantees" className="rounded-lg px-3 py-2 text-neutral-600 hover:bg-neutral-50" onClick={() => setMobileOpen(false)}>
                  Refund Guarantees
                </Link>
                <Link to="/about/faq" className="rounded-lg px-3 py-2 text-neutral-600 hover:bg-neutral-50" onClick={() => setMobileOpen(false)}>
                  FAQ
                </Link>
              </div>
            </details>
            <Link to="/contact" className="rounded-lg px-3 py-2 hover:bg-neutral-50" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
            {!user && (
              <Link to="/login" className="rounded-lg px-3 py-2 hover:bg-neutral-50" onClick={() => setMobileOpen(false)}>
                Sign In
              </Link>
            )}
            <Link
              to="/start"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-bold text-white shadow-sm"
              style={{ background: BRAND_ORANGE }}
            >
              Start a Fundraiser
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
