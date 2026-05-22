import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart,
  Share2,
  Copy,
  Check,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  ShieldCheck,
  Lock,
  ChevronRight,
  MessageSquare,
  Flag,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Help Philip recover from surgery — givehope" },
      { name: "description", content: "Philip needs our help. Join the Hands & Hearts for Philip community to support his medical recovery." },
      { property: "og:title", content: "Help Philip recover from surgery — givehope" },
      { property: "og:description", content: "Philip needs our help. Join the Hands & Hearts for Philip community to support his medical recovery." },
    ],
  }),
  component: Landing,
});

const GOAL = 2_000_000;
const RAISED = 500;

const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

const RECENT_DONORS = [
  { name: "Sarah M.", amount: 50_000, time: "2 hours ago", avatar: "S" },
  { name: "John K.", amount: 25_000, time: "5 hours ago", avatar: "J" },
  { name: "Anonymous", amount: 10_000, time: "1 day ago", avatar: "?" },
  { name: "Maria L.", amount: 5_000, time: "2 days ago", avatar: "M" },
  { name: "David P.", amount: 100_000, time: "3 days ago", avatar: "D" },
];

function Landing() {
  const [copied, setCopied] = useState(false);
  const [showAllDonors, setShowAllDonors] = useState(false);

  const percent = Math.min(100, (RAISED / GOAL) * 100);
  const remaining = Math.max(0, GOAL - RAISED);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Help Philip recover from surgery", text: "Join me in supporting Philip's medical recovery.", url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f1] text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="grid size-7 place-items-center rounded-full bg-[#02a95c]">
              <Heart className="size-3.5 fill-white text-white" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-neutral-900">givehope</span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={handleShare} className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
              {copied ? <><Check className="size-3.5 text-[#02a95c]" /> Copied</> : <><Share2 className="size-3.5" /> Share</>}
            </button>
            <Link to="/donate" className="inline-flex items-center gap-1.5 rounded-full bg-[#02a95c] px-4 py-1.5 text-sm font-extrabold text-white transition hover:bg-[#028f4e]">
              <Heart className="size-3.5 fill-white" /> Donate
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Hero image */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10] bg-neutral-100">
                <img src="/src/assets/philip-hero.jpg" alt="Philip with family" className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className="px-5 py-5 sm:px-8 sm:py-6">
                <h1 className="text-2xl font-extrabold leading-snug tracking-tight text-neutral-900 sm:text-3xl">
                  Help Philip recover from surgery and get back on his feet
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
                  <span className="inline-flex items-center gap-1"><Users className="size-4" /> Hands &amp; Hearts for Philip (HHP)</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="size-4" /> Douala, Cameroon</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="size-4" /> Created 2 weeks ago</span>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="px-5 py-6 sm:px-8">
                <h2 className="text-lg font-extrabold text-neutral-900">Story</h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-neutral-700">
                  <p>Philip is a beloved member of our community who recently underwent emergency surgery. He is currently recovering and needs ongoing medical care, medication, and rehabilitation support.</p>
                  <p>The Hands &amp; Hearts for Philip (HHP) committee was formed by family, friends, and community members who want to rally around Philip during this difficult time. Every contribution, no matter how small, brings us closer to covering his medical bills and supporting his family.</p>
                  <p>Your generosity means the world to us. Thank you for being part of Philip&apos;s recovery journey.</p>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="px-5 py-6 sm:px-8">
                <h2 className="text-lg font-extrabold text-neutral-900">Updates</h2>
                <div className="mt-4 rounded-xl bg-neutral-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                    <TrendingUp className="size-3.5" /> Latest update — 3 days ago
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">
                    Philip is responding well to treatment. The doctors are optimistic about his recovery timeline. We will share more updates as they come. Thank you all for the incredible support!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Donation card */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm lg:sticky lg:top-20">
              <div className="px-5 py-6 sm:px-8">
                {/* Progress */}
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-neutral-900">{fmt(RAISED)}</span>
                  <span className="text-sm font-semibold text-neutral-500">FCFA raised of {fmt(GOAL)} FCFA goal</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full rounded-full bg-[#02a95c] transition-all" style={{ width: `${percent}%` }} />
                </div>
                <p className="mt-2 text-sm font-semibold text-neutral-600">{fmt(remaining)} FCFA still needed</p>

                {/* Donate button */}
                <Link to="/donate" className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#02a95c] py-3.5 text-base font-extrabold text-white shadow-sm transition hover:bg-[#028f4e] active:scale-[0.99]">
                  <Heart className="size-4 fill-white" /> Donate now
                </Link>

                {/* Share */}
                <div className="mt-3 flex gap-2">
                  <button onClick={handleShare} className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
                    <Share2 className="size-3.5" /> Share
                  </button>
                  <button onClick={async () => { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
                    {copied ? <><Check className="size-3.5 text-[#02a95c]" /> Copied</> : <><Copy className="size-3.5" /> Copy link</>}
                  </button>
                </div>

                {/* Protection note */}
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-neutral-200 p-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#02a95c]" />
                  <p className="text-xs leading-relaxed text-neutral-600">
                    <span className="font-bold text-neutral-900">Donation protected.</span> Funds released directly to the medical provider.
                  </p>
                </div>
              </div>
            </div>

            {/* Recent donors */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="px-5 py-6 sm:px-8">
                <h2 className="text-lg font-extrabold text-neutral-900">Recent donations</h2>
                <div className="mt-4 space-y-4">
                  {(showAllDonors ? RECENT_DONORS : RECENT_DONORS.slice( 0, 3)).map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-neutral-100 text-sm font-extrabold text-neutral-600">
                        {d.avatar}
                      </div>
                      <div className="flex-1 min-w-1">
                        <p className="text-sm font-bold text-neutral-900">{d.name}</p>
                        <p className="text-xs text-neutral-500">{d.time}</p>
                      </div>
                      <span className="text-sm font-extrabold text-neutral-900">{fmt(d.amount)} FCFA</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowAllDonors(!showAllDonors)} className="mt-4 flex items-center gap-1 text-sm font-bold text-[#02a95c] hover:underline">
                  {showAllDonors ? "Show less" : "See all donations"} <ChevronRight className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Organizers */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="px-5 py-6 sm:px-8">
                <h2 className="text-lg font-extrabold text-neutral-900">Organized by</h2>
                <div className="mt-4 flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-[#02a95c] text-sm font-extrabold text-white">H</div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">Hands &amp; Hearts for Philip</p>
                    <p className="text-xs text-neutral-500">Douala, Cameroon</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500">
                  <Lock className="size-3" /> Verified organizer
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-1.5">
              <span className="grid size-6 place-items-center rounded-full bg-[#02a95c]">
                <Heart className="size-2.5 fill-white text-white" />
              </span>
              <span className="text-sm font-extrabold tracking-tight text-neutral-900">givehope</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <span>&copy; {new Date().getFullYear()} givehope</span>
              <button onClick={() => alert("Terms coming soon.")} className="hover:underline">Terms</button>
              <button onClick={() => alert("Privacy policy coming soon.")} className="hover:underline">Privacy</button>
              <button onClick={() => alert("Report submitted.")} className="inline-flex items-center gap-1 hover:underline"><Flag className="size-3" /> Report</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
