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
  Flag,
  Play,
  Stethoscope,
  HeartHandshake,
  ClipboardList,
} from "lucide-react";
import { toast } from "sonner";

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

const UPDATES = [
  {
    date: "3 days ago",
    title: "Philip is responding well to treatment",
    body: "The doctors are optimistic about his recovery timeline. Physical therapy starts next week. Thank you all for the incredible support!",
  },
  {
    date: "1 week ago",
    title: "Surgery successful — recovery begins",
    body: "Philip came out of surgery stable. The medical team is monitoring him closely as we begin the recovery process.",
  },
  {
    date: "2 weeks ago",
    title: "Fundraiser launched by the HHP committee",
    body: "We've come together as family and friends to make sure Philip gets the care he needs. Every gift counts.",
  },
];

const TEAM = [
  { name: "Marie N.", role: "Committee chair · Philip's sister", initial: "M", color: "bg-[#02a95c]" },
  { name: "Pastor Joseph K.", role: "Community liaison", initial: "J", color: "bg-[#1877f2]" },
  { name: "Dr. Aline T.", role: "Medical coordinator", initial: "A", color: "bg-[#ff6600]" },
  { name: "Eric M.", role: "Treasurer · Family friend", initial: "E", color: "bg-[#635bff]" },
];

function Landing() {
  const [copied, setCopied] = useState(false);
  const [showAllDonors, setShowAllDonors] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const percent = Math.min(100, (RAISED / GOAL) * 100);
  const remaining = Math.max(0, GOAL - RAISED);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = "Help Philip recover from surgery — every gift counts 💚";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Help Philip recover from surgery", text: shareText, url: shareUrl });
      } catch {
        /* user cancelled */
      }
    } else {
      handleCopy();
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
            <button onClick={handleNativeShare} className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
              <Share2 className="size-3.5" /> Share
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
            {/* Hero image / video */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10] bg-neutral-900">
                {videoPlaying ? (
                  <video
                    src=""
                    controls
                    autoPlay
                    className="h-full w-full object-cover"
                    poster="/src/assets/philip-hero.jpg"
                  />
                ) : (
                  <>
                    <img
                      src="/src/assets/philip-hero.jpg"
                      alt="Philip with family"
                      className="h-full w-full object-cover opacity-90"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <button
                      onClick={() => {
                        toast("Video coming soon", { description: "The family is preparing a short message." });
                      }}
                      className="absolute inset-0 grid place-items-center bg-black/30 transition hover:bg-black/40"
                      aria-label="Play video message"
                    >
                      <span className="grid size-16 place-items-center rounded-full bg-white/95 shadow-xl transition group-hover:scale-105">
                        <Play className="size-7 translate-x-0.5 fill-[#02a95c] text-[#02a95c]" />
                      </span>
                      <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                        Watch · 60 seconds from the family
                      </span>
                    </button>
                  </>
                )}
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

            {/* Updates timeline */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="px-5 py-6 sm:px-8">
                <div className="flex items-baseline justify-between">
                  <h2 className="text-lg font-extrabold text-neutral-900">Updates</h2>
                  <span className="text-xs font-semibold text-neutral-500">{UPDATES.length} posts</span>
                </div>
                <ol className="mt-5 space-y-6 border-l-2 border-neutral-100 pl-6">
                  {UPDATES.map((u, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[31px] grid size-5 place-items-center rounded-full bg-white ring-2 ring-[#02a95c]">
                        <span className="size-2 rounded-full bg-[#02a95c]" />
                      </span>
                      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                        <TrendingUp className="size-3.5" /> {u.date}
                      </div>
                      <h3 className="mt-1 text-base font-bold text-neutral-900">{u.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-700">{u.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Team / committee */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="px-5 py-6 sm:px-8">
                <h2 className="text-lg font-extrabold text-neutral-900">The HHP committee</h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Family, friends, and community members managing this fundraiser together.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {TEAM.map((m) => (
                    <div key={m.name} className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3">
                      <div className={`grid size-11 shrink-0 place-items-center rounded-full ${m.color} text-base font-extrabold text-white`}>
                        {m.initial}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-neutral-900">{m.name}</p>
                        <p className="truncate text-xs text-neutral-500">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="flex items-start gap-2 rounded-xl bg-neutral-50 p-3">
                    <Stethoscope className="mt-0.5 size-4 shrink-0 text-[#02a95c]" />
                    <div>
                      <p className="text-xs font-bold text-neutral-900">Medical oversight</p>
                      <p className="text-[11px] text-neutral-600">Funds released to providers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl bg-neutral-50 p-3">
                    <ClipboardList className="mt-0.5 size-4 shrink-0 text-[#02a95c]" />
                    <div>
                      <p className="text-xs font-bold text-neutral-900">Receipts on file</p>
                      <p className="text-[11px] text-neutral-600">Every expense documented.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl bg-neutral-50 p-3">
                    <HeartHandshake className="mt-0.5 size-4 shrink-0 text-[#02a95c]" />
                    <div>
                      <p className="text-xs font-bold text-neutral-900">Community-run</p>
                      <p className="text-[11px] text-neutral-600">Volunteer committee.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Donation card */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm lg:sticky lg:top-20">
              <div className="px-5 py-6 sm:px-8">
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-neutral-900">{fmt(RAISED)}</span>
                  <span className="text-sm font-semibold text-neutral-500">FCFA raised of {fmt(GOAL)} FCFA goal</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full rounded-full bg-[#02a95c] transition-all" style={{ width: `${percent}%` }} />
                </div>
                <p className="mt-2 text-sm font-semibold text-neutral-600">{fmt(remaining)} FCFA still needed</p>

                <Link to="/donate" className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#02a95c] py-3.5 text-base font-extrabold text-white shadow-sm transition hover:bg-[#028f4e] active:scale-[0.99]">
                  <Heart className="size-4 fill-white" /> Donate now
                </Link>

                {/* Share buttons */}
                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-neutral-500">Share Philip&apos;s story</p>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                    className="flex h-10 items-center justify-center rounded-full bg-[#25d366] text-xs font-extrabold text-white transition hover:opacity-90"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="flex h-10 items-center justify-center rounded-full bg-[#1877f2] text-xs font-extrabold text-white transition hover:opacity-90"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    aria-label="Share on X"
                    className="flex h-10 items-center justify-center rounded-full bg-neutral-900 text-xs font-extrabold text-white transition hover:opacity-90"
                  >
                    X
                  </a>
                  <button
                    onClick={handleCopy}
                    aria-label="Copy link"
                    className="flex h-10 items-center justify-center gap-1 rounded-full border border-neutral-200 bg-white text-xs font-bold text-neutral-700 transition hover:bg-neutral-50"
                  >
                    {copied ? <Check className="size-3.5 text-[#02a95c]" /> : <Copy className="size-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

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
                  {(showAllDonors ? RECENT_DONORS : RECENT_DONORS.slice(0, 3)).map((d, i) => (
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
              <button onClick={() => toast("Terms coming soon.")} className="hover:underline">Terms</button>
              <button onClick={() => toast("Privacy policy coming soon.")} className="hover:underline">Privacy</button>
              <button onClick={() => toast.success("Report submitted.")} className="inline-flex items-center gap-1 hover:underline"><Flag className="size-3" /> Report</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky donate bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full rounded-full bg-[#02a95c]" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-1 truncate text-xs font-semibold text-neutral-600">
              {fmt(RAISED)} of {fmt(GOAL)} FCFA
            </p>
          </div>
          <Link to="/donate" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#02a95c] px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#028f4e]">
            <Heart className="size-4 fill-white" /> Donate
          </Link>
        </div>
      </div>
    </div>
  );
}
