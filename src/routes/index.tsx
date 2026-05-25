import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Search, MapPin, Users, TrendingUp, ChevronDown, User as UserIcon } from "lucide-react";
import { CATEGORIES, fmtFCFA, useCampaigns } from "@/lib/campaigns";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "givehope — Fundraisers that build community" },
      { name: "description", content: "Discover and support community fundraisers, or start your own in minutes." },
      { property: "og:title", content: "givehope — Fundraisers that build community" },
      { property: "og:description", content: "Discover and support community fundraisers, or start your own in minutes." },
    ],
  }),
  component: Browse,
});

function Browse() {
  const user = useAuth();
  const campaigns = useCampaigns();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return campaigns.filter((c) => {
      if (activeCat !== "All" && c.category !== activeCat) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.story.toLowerCase().includes(q) ||
        c.organizer.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      );
    });
  }, [campaigns, query, activeCat]);




  const heroTiles = [
    {
      src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80&auto=format&fit=crop",
      label: "Medical",
      raised: "1.2M FCFA",
      className: "col-span-2 row-span-2 h-full",
    },
    {
      src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80&auto=format&fit=crop",
      label: "Education",
      raised: "450k FCFA",
      className: "col-span-2 row-span-1 h-44 sm:h-52",
    },
    {
      src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80&auto=format&fit=crop",
      label: "Emergency",
      raised: "3.4M FCFA",
      className: "col-span-1 row-span-1 h-44 sm:h-52",
    },
    {
      src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80&auto=format&fit=crop",
      label: "Sports",
      raised: "780k FCFA",
      className: "col-span-1 row-span-1 h-44 sm:h-52",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f1] text-neutral-900">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-3 items-center px-4 sm:px-8">
          {/* Left nav */}
          <nav className="flex items-center gap-6 text-sm font-semibold text-neutral-800">
            <a href="#discover" className="inline-flex items-center gap-1.5 hover:text-[#02a95c]">
              <Search className="size-4" /> To search
            </a>
            <button className="hidden items-center gap-1 hover:text-[#02a95c] sm:inline-flex">
              Donate <ChevronDown className="size-3.5" />
            </button>
            <button className="hidden items-center gap-1 hover:text-[#02a95c] sm:inline-flex">
              Fundraising <ChevronDown className="size-3.5" />
            </button>
          </nav>

          {/* Center logo */}
          <Link to="/" className="flex items-center justify-center gap-1.5">
            <span className="grid size-7 place-items-center rounded-full bg-[#02a95c]">
              <Heart className="size-3.5 fill-white text-white" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">givehope</span>
          </Link>

          {/* Right nav */}
          <div className="flex items-center justify-end gap-5">
            <button className="hidden items-center gap-1 text-sm font-semibold text-neutral-800 hover:text-[#02a95c] sm:inline-flex">
              About <ChevronDown className="size-3.5" />
            </button>
            {user ? (
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-bold text-neutral-800 hover:bg-neutral-50">
                <span className="grid size-6 place-items-center rounded-full bg-neutral-100">
                  <UserIcon className="size-3.5 text-neutral-700" />
                </span>
                {user.name.split(" ")[0]}
                <ChevronDown className="size-3.5" />
              </Link>
            ) : (
              <Link to="/login" className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-bold text-neutral-800 hover:bg-neutral-50">
                <span className="grid size-6 place-items-center rounded-full bg-neutral-100">
                  <UserIcon className="size-3.5 text-neutral-700" />
                </span>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 pt-16 text-center sm:px-6 sm:pt-24">
          <span className="inline-block rounded-md bg-[#d3f4b4] px-3 py-1.5 text-xs font-extrabold text-neutral-900">
            The most popular platform for crowdfunding
          </span>
          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            The starting point of successful fundraising campaigns
          </h1>
          <div className="mt-10">
            <Link
              to="/start"
              className="inline-flex items-center justify-center rounded-full bg-[#0a4d2e] px-8 py-4 text-base font-extrabold text-white shadow-sm transition hover:bg-[#073a23]"
            >
              Start a givehope
            </Link>
          </div>

          {/* Hero collage */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-4 grid-rows-2 gap-3 sm:gap-4">
            {heroTiles.map((t, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-3xl bg-neutral-200 shadow-sm ring-1 ring-black/5 ${t.className}`}
              >
                <img
                  src={t.src}
                  alt={t.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 text-left">
                  <div className="flex items-end justify-between gap-2">
                    <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-neutral-900">
                      {t.label}
                    </span>
                    <span className="text-xs font-extrabold text-white drop-shadow">
                      {t.raised} raised
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Discover */}
      <section id="discover" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">Discover fundraisers</h2>
            <p className="mt-1 text-sm text-neutral-600">{filtered.length} of {campaigns.length} shown</p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Search fundraisers, organizers, places"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-neutral-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((cat) => {
            const active = activeCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                  active
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <p className="text-base font-bold text-neutral-900">No fundraisers match your search</p>
            <p className="mt-1 text-sm text-neutral-600">Try a different keyword or category.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => {
              const percent = Math.min(100, (c.raised / c.goal) * 100);
              return (
                <Link
                  key={c.slug}
                  to="/c/$slug"
                  params={{ slug: c.slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] bg-neutral-900">
                    {c.image ? (
                      <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#02a95c] to-[#016e3d] text-white">
                        <span className="text-5xl font-black opacity-30">{c.title.charAt(0)}</span>
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-neutral-900">
                      {c.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-5 py-4">
                    <h3 className="line-clamp-2 text-base font-extrabold leading-snug group-hover:text-[#02a95c]">
                      {c.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{c.story}</p>
                    <div className="mt-3 flex items-center gap-3 text-[11px] text-neutral-500">
                      <span className="inline-flex items-center gap-1"><Users className="size-3" /> {c.organizer}</span>
                      <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {c.location}</span>
                    </div>
                    <div className="mt-auto pt-4">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                        <div className="h-full rounded-full bg-[#02a95c]" style={{ width: `${percent}%` }} />
                      </div>
                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-sm font-extrabold">{fmtFCFA(c.raised)} FCFA</span>
                        <span className="text-[11px] font-semibold text-neutral-500">of {fmtFCFA(c.goal)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA strip */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl">Have a cause to raise for?</h2>
            <p className="mt-1 text-sm text-neutral-600">Start your fundraiser in under 2 minutes. No setup fees.</p>
          </div>
          <Link to="/start" className="inline-flex items-center gap-1.5 rounded-full bg-[#02a95c] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#028f4e]">
            <TrendingUp className="size-4" /> Start a fundraiser
          </Link>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-neutral-500 sm:flex-row">
            <div className="flex items-center gap-1.5">
              <span className="grid size-6 place-items-center rounded-full bg-[#02a95c]">
                <Heart className="size-2.5 fill-white text-white" />
              </span>
              <span className="text-sm font-extrabold tracking-tight text-neutral-900">givehope</span>
            </div>
            <span>&copy; {new Date().getFullYear()} givehope · Community fundraising made simple</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
