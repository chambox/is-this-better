import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, MapPin, Users, Heart, Share2, ShieldCheck, BadgeCheck, Lock, Sparkles,
  GraduationCap, Stethoscope, Siren, Building2, Flower2, HandHeart, ArrowRight, Star, Quote,
} from "lucide-react";
import { CATEGORIES, fmtFCFA, useCampaigns } from "@/lib/campaigns";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StatCounter } from "@/components/stat-counter";

const PRIMARY = "#0d7a5f";
const GOLD = "#c9a84c";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "givehope — Help People. Change Lives." },
      { name: "description", content: "Start a fundraiser or support a verified cause. Trusted crowdfunding for medical, education, emergencies, memorials, and community projects." },
      { property: "og:title", content: "givehope — Help People. Change Lives." },
      { property: "og:description", content: "Start a fundraiser or support a verified cause in minutes." },
    ],
  }),
  component: Home,
});

function Home() {
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

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f5f0e1] via-white to-[#f5f0e1]">
        <div className="pointer-events-none absolute -left-32 top-10 size-80 rounded-full bg-[#e8f5f0] opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-[#f0ebd8] opacity-70 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#0d7a5f] shadow-sm ring-1 ring-[#e8f5f0]">
              <Sparkles className="size-3.5" /> Trusted by 2M+ donors worldwide
            </span>
            <h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl">
              Help People.{" "}
              <span className="bg-gradient-to-r from-[#0d7a5f] to-[#c9a84c] bg-clip-text text-transparent">
                Change Lives.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-neutral-600">
              Whether you're rallying around a friend or supporting a stranger in need, every gift creates real impact. Start a fundraiser or give in seconds.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/start"
                className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#d4e8df] transition hover:opacity-90"
                style={{ background: PRIMARY }}
              >
                Start a Fundraiser
              </Link>
              <Link
                to="/"
                hash="featured"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-3.5 text-sm font-bold text-neutral-800 shadow-sm transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
              >
                Donate Now <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-5 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-[#c9a84c]" />
                Verified campaigns
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="size-4 text-[#c9a84c]" />
                Secure donations
              </div>
            </div>
          </div>

          {/* Hero collage */}
          <div className="relative">
            <div className="grid grid-cols-6 grid-rows-6 gap-3 sm:gap-4">
              <div className="col-span-4 row-span-4 overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80&auto=format&fit=crop"
                  alt="Community helping each other"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-2 row-span-3 overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                <img
                  src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80&auto=format&fit=crop"
                  alt="Volunteers"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-2 row-span-3 overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                <img
                  src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80&auto=format&fit=crop"
                  alt="Education support"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-3 row-span-2 overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                <img
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80&auto=format&fit=crop"
                  alt="Medical care"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-3 row-span-2 overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80&auto=format&fit=crop"
                  alt="Donor support"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            {/* Floating donation card */}
            <div className="absolute -bottom-4 -left-4 hidden w-56 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 sm:block">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full" style={{ background: "#FFEFE0" }}>
                  <Heart className="size-4" style={{ color: PRIMARY }} />
                </span>
                <div>
                  <div className="text-[11px] font-semibold text-neutral-500">Just now</div>
                  <div className="text-sm font-extrabold text-neutral-900">+ 50,000 FCFA</div>
                </div>
              </div>
              <p className="mt-2 text-xs text-neutral-600">"Sending love & strength 💛" — Sarah M.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section id="featured" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>
              Featured Fundraisers
            </span>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Causes that need you right now</h2>
            <p className="mt-2 max-w-2xl text-neutral-600">
              Real people. Real stories. Every donation goes directly to support these urgent needs.
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Search fundraisers…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-neutral-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-[#0d7a5f] focus:ring-2 focus:ring-[#e8f5f0]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((cat) => {
            const active = activeCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                  active
                    ? "border-[#0d7a5f] bg-[#0d7a5f] text-white shadow"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-[#0d7a5f] hover:text-[#0d7a5f]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <p className="text-base font-bold">No fundraisers match your search</p>
            <p className="mt-1 text-sm text-neutral-600">Try a different keyword or category.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, 6).map((c) => {
              const percent = Math.min(100, (c.raised / c.goal) * 100);
              return (
                <Link
                  key={c.slug}
                  to="/c/$slug"
                  params={{ slug: c.slug }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    {c.image ? (
                      <img src={c.image} alt={c.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#0d7a5f] to-[#c9a84c] text-white">
                        <span className="text-6xl font-black opacity-30">{c.title.charAt(0)}</span>
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#0d7a5f] shadow-sm">
                      {c.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="line-clamp-2 text-base font-extrabold leading-snug group-hover:text-[#0d7a5f]">
                      {c.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-neutral-600">{c.story}</p>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                      <span className="inline-flex items-center gap-1"><Users className="size-3" /> {c.organizer}</span>
                      <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {c.location}</span>
                    </div>
                    <div className="mt-auto pt-2">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${PRIMARY}, ${GOLD})` }}
                        />
                      </div>
                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-sm font-extrabold">{fmtFCFA(c.raised)} FCFA</span>
                        <span className="text-[11px] font-semibold text-neutral-500">of {fmtFCFA(c.goal)}</span>
                      </div>
                      <button
                        className="mt-4 w-full rounded-full py-2.5 text-sm font-bold text-white transition group-hover:opacity-90"
                        style={{ background: PRIMARY }}
                      >
                        Donate
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="bg-[#FAFBFD]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>How It Works</span>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Three simple steps</h2>
            <p className="mx-auto mt-3 max-w-xl text-neutral-600">Launch a successful fundraiser in under 5 minutes — no setup fees.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", icon: Sparkles, title: "Create your fundraiser", body: "Add a story, photo, and goal. We'll guide you step-by-step." },
              { n: "02", icon: Share2, title: "Share with supporters", body: "Spread the word on social media, email, and text — share tools built in." },
              { n: "03", icon: HandHeart, title: "Receive donations", body: "Funds are deposited safely, with full tracking and donor updates." },
            ].map((s) => (
              <div key={s.n} className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <span className="absolute right-5 top-5 text-5xl font-black text-neutral-100">{s.n}</span>
                <span className="grid size-12 place-items-center rounded-2xl" style={{ background: "#e8f5f0" }}>
                  <s.icon className="size-6" style={{ color: PRIMARY }} />
                </span>
                <h3 className="mt-5 text-lg font-extrabold">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>Categories</span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">Find a cause close to your heart</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { icon: Stethoscope, label: "Medical", tint: "#e8f5f0", color: PRIMARY },
            { icon: GraduationCap, label: "Education", tint: "#f0ebd8", color: "#c9a84c" },
            { icon: Siren, label: "Emergency", tint: "#e8f5f0", color: PRIMARY },
            { icon: Building2, label: "Nonprofit", tint: "#f0ebd8", color: "#c9a84c" },
            { icon: Flower2, label: "Memorial", tint: "#e8f5f0", color: PRIMARY },
            { icon: HandHeart, label: "Community", tint: "#f0ebd8", color: "#c9a84c" },
          ].map((cat) => (
            <button
              key={cat.label}
              onClick={() => {
                setActiveCat(cat.label === "Nonprofit" || cat.label === "Memorial" ? cat.label : cat.label);
                document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex flex-col items-center gap-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#0d7a5f] hover:shadow-md"
            >
              <span className="grid size-14 place-items-center rounded-2xl transition group-hover:scale-110" style={{ background: cat.tint }}>
                <cat.icon className="size-7" style={{ color: cat.color }} />
              </span>
              <span className="text-sm font-bold">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section id="stories" className="scroll-mt-20 bg-gradient-to-br from-[#f5f0e1] via-white to-[#f5f0e1]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>Success Stories</span>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Real impact, real people</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "We raised more than triple our goal in two weeks. The community wrapped its arms around us.",
                name: "Marie Tchoumi", role: "Organizer · Medical fundraiser",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop",
              },
              {
                quote: "Setting it up took 4 minutes. By morning we had donations from 60 different people.",
                name: "Jean-Paul Nkemdirim", role: "Organizer · Education fund",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop",
              },
              {
                quote: "After the floods, this was the fastest way to get real aid to families. Simple and trustworthy.",
                name: "Aïcha Diallo", role: "Coordinator · Emergency relief",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100 transition hover:-translate-y-1 hover:shadow-xl">
                <Quote className="size-7" style={{ color: PRIMARY }} />
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-neutral-100 pt-4">
                  <img src={t.avatar} alt={t.name} className="size-11 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-extrabold">{t.name}</div>
                    <div className="text-[11px] text-neutral-500">{t.role}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-[#0d7a5f] text-[#0d7a5f]" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section id="trust" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>Trust & Safety</span>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Your donation is in safe hands</h2>
            <p className="mt-3 max-w-md text-neutral-600">
              From the moment you give to the moment funds reach the cause, every step is monitored, verified, and backed by our guarantee.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                { icon: Lock, title: "Secure payments", body: "Bank-grade encryption on every transaction." },
                { icon: BadgeCheck, title: "Verified campaigns", body: "Every organizer is identity-verified before launch." },
                { icon: ShieldCheck, title: "Refund guarantee", body: "If something is wrong, you get your donation back." },
                { icon: Heart, title: "Fraud protection", body: "Our trust team monitors campaigns 24/7." },
              ].map((f) => (
                <div key={f.title} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl" style={{ background: "#f0ebd8" }}>
                    <f.icon className="size-5" style={{ color: "#c9a84c" }} />
                  </span>
                  <div>
                    <div className="text-sm font-extrabold">{f.title}</div>
                    <div className="mt-0.5 text-xs text-neutral-600">{f.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80&auto=format&fit=crop"
                alt="Handshake — trust"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-4 -top-4 hidden rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 sm:block">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5" style={{ color: PRIMARY }} />
                <div>
                  <div className="text-[11px] font-semibold text-neutral-500">Guarantee</div>
                  <div className="text-sm font-extrabold">100% refund promise</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-[#0d7a5f] to-[#c9a84c] py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 text-center sm:grid-cols-3 sm:px-8">
          {[
            { value: 12_500_000, prefix: "$", suffix: "+", label: "Funds raised" },
            { value: 850_000, suffix: "+", label: "Donors worldwide" },
            { value: 24_000, suffix: "+", label: "Active fundraisers" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-5xl font-black tracking-tight sm:text-6xl">
                <StatCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-widest opacity-90">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a2942] via-[#0F1A2E] to-[#0F1A2E] p-10 text-white sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[#0d7a5f] opacity-30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-[#c9a84c] opacity-30 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-black sm:text-5xl">Start making a difference today.</h2>
            <p className="mt-4 text-base text-white/80 sm:text-lg">
              Launch your fundraiser in minutes. No setup fees. Real support every step of the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/start"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-90"
                style={{ background: PRIMARY }}
              >
                Start a Fundraiser
              </Link>
              <Link
                to="/about/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
