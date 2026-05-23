import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart, Share2, Copy, Check, TrendingUp, Users, Calendar, MapPin,
  ShieldCheck, Lock, ChevronRight, Flag, Play, Stethoscope,
  HeartHandshake, ClipboardList,
} from "lucide-react";
import { toast } from "sonner";
import { fmtFCFA, getCampaign, useCampaign } from "@/lib/campaigns";

export const Route = createFileRoute("/c/$slug")({
  loader: ({ params }) => {
    const c = getCampaign(params.slug);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — givehope` },
          { name: "description", content: loaderData.story.slice(0, 155) },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.story.slice(0, 155) },
        ]
      : [{ title: "Fundraiser — givehope" }],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-[#f3f3f1] px-4 text-center">
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-900">Fundraiser not found</h1>
        <p className="mt-2 text-sm text-neutral-600">It may have been removed or the link is wrong.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-1 rounded-full bg-[#02a95c] px-5 py-2.5 text-sm font-extrabold text-white">Browse fundraisers</Link>
      </div>
    </div>
  ),
  component: CampaignPage,
});

const TEAM = [
  { name: "Marie N.", role: "Committee chair", initial: "M", color: "bg-[#02a95c]" },
  { name: "Pastor Joseph K.", role: "Community liaison", initial: "J", color: "bg-[#1877f2]" },
  { name: "Dr. Aline T.", role: "Medical coordinator", initial: "A", color: "bg-[#ff6600]" },
  { name: "Eric M.", role: "Treasurer", initial: "E", color: "bg-[#635bff]" },
];

function CampaignPage() {
  const { slug } = useParams({ from: "/c/$slug" });
  const campaign = useCampaign(slug);
  const [copied, setCopied] = useState(false);
  const [showAllDonors, setShowAllDonors] = useState(false);

  if (!campaign) return null;

  const percent = Math.min(100, (campaign.raised / campaign.goal) * 100);
  const remaining = Math.max(0, campaign.goal - campaign.raised);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Help support: ${campaign.title} 💚`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: campaign.title, text: shareText, url: shareUrl });
      } catch { /* cancelled */ }
    } else {
      handleCopy();
    }
  };

  const createdDays = Math.max(1, Math.round((Date.now() - new Date(campaign.createdAt).getTime()) / (1000 * 60 * 60 * 24)));
  const createdLabel = createdDays < 7 ? `${createdDays} day${createdDays > 1 ? "s" : ""} ago` : `${Math.round(createdDays / 7)} week${Math.round(createdDays / 7) > 1 ? "s" : ""} ago`;

  return (
    <div className="min-h-screen bg-[#f3f3f1] text-neutral-900">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="grid size-7 place-items-center rounded-full bg-[#02a95c]">
              <Heart className="size-3.5 fill-white text-white" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">givehope</span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/start" className="hidden text-sm font-semibold text-neutral-700 hover:text-neutral-900 sm:inline">Start a fundraiser</Link>
            <button onClick={handleNativeShare} className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
              <Share2 className="size-3.5" /> Share
            </button>
            <Link to="/donate" search={{ c: campaign.slug }} className="inline-flex items-center gap-1.5 rounded-full bg-[#02a95c] px-4 py-1.5 text-sm font-extrabold text-white transition hover:bg-[#028f4e]">
              <Heart className="size-3.5 fill-white" /> Donate
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10] bg-neutral-900">
                {campaign.image ? (
                  <img src={campaign.image} alt={campaign.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#02a95c] to-[#016e3d] text-white">
                    <span className="text-6xl font-black opacity-30">{campaign.title.charAt(0)}</span>
                  </div>
                )}
                <button
                  onClick={() => toast("Video coming soon", { description: "The organizer is preparing a short message." })}
                  className="absolute inset-0 grid place-items-center bg-black/20 transition hover:bg-black/30"
                  aria-label="Play video message"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-white/95 shadow-xl">
                    <Play className="size-7 translate-x-0.5 fill-[#02a95c] text-[#02a95c]" />
                  </span>
                </button>
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-neutral-900">
                  {campaign.category}
                </span>
              </div>
              <div className="px-5 py-5 sm:px-8 sm:py-6">
                <h1 className="text-2xl font-extrabold leading-snug tracking-tight text-neutral-900 sm:text-3xl">
                  {campaign.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
                  <span className="inline-flex items-center gap-1"><Users className="size-4" /> {campaign.organizer}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="size-4" /> {campaign.location}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="size-4" /> Created {createdLabel}</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="px-5 py-6 sm:px-8">
                <h2 className="text-lg font-extrabold">Story</h2>
                <div className="mt-4 space-y-4 whitespace-pre-line text-[15px] leading-relaxed text-neutral-700">
                  {campaign.story}
                </div>
              </div>
            </div>

            {campaign.updates.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="px-5 py-6 sm:px-8">
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-lg font-extrabold">Updates</h2>
                    <span className="text-xs font-semibold text-neutral-500">{campaign.updates.length} posts</span>
                  </div>
                  <ol className="mt-5 space-y-6 border-l-2 border-neutral-100 pl-6">
                    {campaign.updates.map((u, i) => (
                      <li key={i} className="relative">
                        <span className="absolute -left-[31px] grid size-5 place-items-center rounded-full bg-white ring-2 ring-[#02a95c]">
                          <span className="size-2 rounded-full bg-[#02a95c]" />
                        </span>
                        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                          <TrendingUp className="size-3.5" /> {u.date}
                        </div>
                        <h3 className="mt-1 text-base font-bold">{u.title}</h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-700">{u.body}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="px-5 py-6 sm:px-8">
                <h2 className="text-lg font-extrabold">Organizing committee</h2>
                <p className="mt-1 text-sm text-neutral-600">Family, friends, and community members managing this fundraiser together.</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {TEAM.map((m) => (
                    <div key={m.name} className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3">
                      <div className={`grid size-11 shrink-0 place-items-center rounded-full ${m.color} text-base font-extrabold text-white`}>{m.initial}</div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{m.name}</p>
                        <p className="truncate text-xs text-neutral-500">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="flex items-start gap-2 rounded-xl bg-neutral-50 p-3">
                    <Stethoscope className="mt-0.5 size-4 shrink-0 text-[#02a95c]" />
                    <div><p className="text-xs font-bold">Verified organizer</p><p className="text-[11px] text-neutral-600">Identity confirmed.</p></div>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl bg-neutral-50 p-3">
                    <ClipboardList className="mt-0.5 size-4 shrink-0 text-[#02a95c]" />
                    <div><p className="text-xs font-bold">Receipts on file</p><p className="text-[11px] text-neutral-600">Every expense documented.</p></div>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl bg-neutral-50 p-3">
                    <HeartHandshake className="mt-0.5 size-4 shrink-0 text-[#02a95c]" />
                    <div><p className="text-xs font-bold">Community-run</p><p className="text-[11px] text-neutral-600">Volunteer committee.</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm lg:sticky lg:top-20">
              <div className="px-5 py-6 sm:px-8">
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold">{fmtFCFA(campaign.raised)}</span>
                  <span className="text-sm font-semibold text-neutral-500">FCFA raised of {fmtFCFA(campaign.goal)} goal</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full rounded-full bg-[#02a95c] transition-all" style={{ width: `${percent}%` }} />
                </div>
                <p className="mt-2 text-sm font-semibold text-neutral-600">{fmtFCFA(remaining)} FCFA still needed · {campaign.donors.length} donors</p>

                <Link to="/donate" search={{ c: campaign.slug }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#02a95c] py-3.5 text-base font-extrabold text-white shadow-sm transition hover:bg-[#028f4e] active:scale-[0.99]">
                  <Heart className="size-4 fill-white" /> Donate now
                </Link>

                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-neutral-500">Share this fundraiser</p>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center rounded-full bg-[#25d366] text-xs font-extrabold text-white hover:opacity-90">WhatsApp</a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center rounded-full bg-[#1877f2] text-xs font-extrabold text-white hover:opacity-90">Facebook</a>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center rounded-full bg-neutral-900 text-xs font-extrabold text-white hover:opacity-90">X</a>
                  <button onClick={handleCopy} className="flex h-10 items-center justify-center gap-1 rounded-full border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50">
                    {copied ? <Check className="size-3.5 text-[#02a95c]" /> : <Copy className="size-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-neutral-200 p-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#02a95c]" />
                  <p className="text-xs leading-relaxed text-neutral-600">
                    <span className="font-bold text-neutral-900">Donation protected.</span> Funds released directly to the verified organizer.
                  </p>
                </div>
              </div>
            </div>

            {campaign.donors.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="px-5 py-6 sm:px-8">
                  <h2 className="text-lg font-extrabold">Recent donations</h2>
                  <div className="mt-4 space-y-4">
                    {(showAllDonors ? campaign.donors : campaign.donors.slice(0, 3)).map((d, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-neutral-100 text-sm font-extrabold text-neutral-600">{d.avatar}</div>
                        <div className="min-w-1 flex-1">
                          <p className="text-sm font-bold">{d.name}</p>
                          <p className="text-xs text-neutral-500">{d.time}</p>
                        </div>
                        <span className="text-sm font-extrabold">{fmtFCFA(d.amount)} FCFA</span>
                      </div>
                    ))}
                  </div>
                  {campaign.donors.length > 3 && (
                    <button onClick={() => setShowAllDonors(!showAllDonors)} className="mt-4 flex items-center gap-1 text-sm font-bold text-[#02a95c] hover:underline">
                      {showAllDonors ? "Show less" : "See all donations"} <ChevronRight className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="px-5 py-6 sm:px-8">
                <h2 className="text-lg font-extrabold">Organized by</h2>
                <div className="mt-4 flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-[#02a95c] text-sm font-extrabold text-white">{campaign.organizer.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-bold">{campaign.organizer}</p>
                    <p className="text-xs text-neutral-500">{campaign.location}</p>
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

      <footer className="border-t border-neutral-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link to="/" className="flex items-center gap-1.5">
              <span className="grid size-6 place-items-center rounded-full bg-[#02a95c]"><Heart className="size-2.5 fill-white text-white" /></span>
              <span className="text-sm font-extrabold tracking-tight">givehope</span>
            </Link>
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <span>&copy; {new Date().getFullYear()} givehope</span>
              <button onClick={() => toast("Terms coming soon.")} className="hover:underline">Terms</button>
              <button onClick={() => toast("Privacy policy coming soon.")} className="hover:underline">Privacy</button>
              <button onClick={() => toast.success("Report submitted.")} className="inline-flex items-center gap-1 hover:underline"><Flag className="size-3" /> Report</button>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full rounded-full bg-[#02a95c]" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-1 truncate text-xs font-semibold text-neutral-600">{fmtFCFA(campaign.raised)} of {fmtFCFA(campaign.goal)} FCFA</p>
          </div>
          <Link to="/donate" search={{ c: campaign.slug }} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#02a95c] px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#028f4e]">
            <Heart className="size-4 fill-white" /> Donate
          </Link>
        </div>
      </div>
    </div>
  );
}
