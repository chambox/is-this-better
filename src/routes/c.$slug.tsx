import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart, Share2, Copy, Check, Calendar, MapPin,
  ShieldCheck, Flag, Users, TrendingUp, Gift,
} from "lucide-react";
import { toast } from "sonner";
import { fmtFCFA, getCampaign, useCampaign } from "@/lib/campaigns";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
          ...(loaderData.image ? [
            { property: "og:image", content: loaderData.image },
            { name: "twitter:image", content: loaderData.image },
          ] : []),
        ]
      : [{ title: "Fundraiser — givehope" }],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-white px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Fundraiser not found</h1>
        <p className="mt-2 text-sm text-neutral-600">It may have been removed or the link is wrong.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-1 rounded-full bg-[var(--primary,#0d7a5f)] px-5 py-2.5 text-sm font-semibold text-white">
          Browse fundraisers
        </Link>
      </div>
    </div>
  ),
  component: CampaignPage,
});

function CampaignPage() {
  const { slug } = useParams({ from: "/c/$slug" });
  const campaign = useCampaign(slug);
  const [copied, setCopied] = useState(false);
  const [showAllDonors, setShowAllDonors] = useState(false);

  if (!campaign) return null;

  const percent = Math.min(100, (campaign.raised / campaign.goal) * 100);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Help support: ${campaign.title}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const createdDays = Math.max(1, Math.round((Date.now() - new Date(campaign.createdAt).getTime()) / (1000 * 60 * 60 * 24)));
  const createdLabel = createdDays < 7
    ? `${createdDays} day${createdDays > 1 ? "s" : ""} ago`
    : `${Math.round(createdDays / 7)} week${Math.round(createdDays / 7) > 1 ? "s" : ""} ago`;

  const fallbackImg = "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?auto=format&fit=crop&w=1600&q=80";
  const heroImage = campaign.image || fallbackImg;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 lg:pt-10">
        {/* Title (mobile shows above image; desktop hidden — shown again below image on left col) */}
        <h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl lg:hidden">
          {campaign.title}
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* LEFT COLUMN */}
          <div>
            {/* Hero image */}
            <div className="overflow-hidden rounded-2xl">
              <img src={heroImage} alt={campaign.title} className="aspect-[16/10] w-full object-cover" />
            </div>

            {/* Title (desktop) */}
            <h1 className="mt-6 hidden text-3xl font-bold leading-tight sm:text-4xl lg:block">
              {campaign.title}
            </h1>

            {/* Meta row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-600">
              <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" /> {campaign.location}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="size-4" /> Created {createdLabel}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-700">
                {campaign.category}
              </span>
            </div>

            {/* Organizer card */}
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-neutral-200 p-4">
              <div className="grid size-10 place-items-center rounded-full bg-[var(--primary,#0d7a5f)] text-sm font-bold text-white">
                {campaign.organizer.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-neutral-900">{campaign.organizer}</p>
                <p className="truncate text-xs text-neutral-500">is organizing this fundraiser</p>
              </div>
            </div>

            {/* Story */}
            <section className="mt-8">
              <div className="space-y-4 text-[15px] leading-relaxed text-neutral-800">
                {campaign.story.split(/\n\n+/).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* Action buttons (mobile inline) */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:hidden">
              <Link
                to="/donate"
                search={{ c: campaign.slug }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary,#0d7a5f)] py-3 text-sm font-bold text-white shadow-sm hover:opacity-95"
              >
                <Heart className="size-4 fill-white" /> Donate now
              </Link>
              <button
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white py-3 text-sm font-bold text-neutral-900 hover:bg-neutral-50"
              >
                <Share2 className="size-4" /> Share
              </button>
            </div>

            {/* Updates */}
            {campaign.updates.length > 0 && (
              <section className="mt-10 rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-5 text-[var(--primary,#0d7a5f)]" />
                  <h2 className="text-lg font-bold">Updates ({campaign.updates.length})</h2>
                </div>
                <div className="mt-5 space-y-6">
                  {campaign.updates.map((u, i) => (
                    <div key={i} className="border-l-2 border-[var(--primary,#0d7a5f)] pl-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{u.date}</p>
                      <h3 className="mt-1 text-base font-bold text-neutral-900">{u.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">{u.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Report */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => toast.success("Report submitted.")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900"
              >
                <Flag className="size-3.5" /> Report fundraiser
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN — Donation card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-2xl font-bold text-neutral-900">
                {fmtFCFA(campaign.raised)} <span className="text-base font-normal text-neutral-500">FCFA raised</span>
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                of {fmtFCFA(campaign.goal)} FCFA goal · <span className="font-semibold text-neutral-900">{campaign.donors.length} donations</span>
              </p>

              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                <div className="h-full rounded-full bg-[var(--primary,#0d7a5f)] transition-all" style={{ width: `${percent}%` }} />
              </div>

              <div className="mt-5 grid gap-3">
                <Link
                  to="/donate"
                  search={{ c: campaign.slug }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary,#0d7a5f)] py-3.5 text-base font-bold text-white shadow-sm hover:opacity-95"
                >
                  <Heart className="size-5 fill-white" /> Donate now
                </Link>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--primary,#0d7a5f)] py-3 text-base font-bold text-[var(--primary,#0d7a5f)] hover:bg-[var(--primary,#0d7a5f)]/5"
                >
                  {copied ? <Check className="size-4" /> : <Share2 className="size-4" />} {copied ? "Link copied" : "Share"}
                </button>
              </div>

              {/* Quick share row */}
              <div className="mt-5 flex items-center justify-between gap-2 border-t border-neutral-100 pt-5">
                <a
                  className="flex flex-1 items-center justify-center rounded-full bg-neutral-100 py-2 text-xs font-semibold hover:bg-neutral-200"
                  target="_blank" rel="noopener noreferrer"
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                >WhatsApp</a>
                <a
                  className="flex flex-1 items-center justify-center rounded-full bg-neutral-100 py-2 text-xs font-semibold hover:bg-neutral-200"
                  target="_blank" rel="noopener noreferrer"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                >Facebook</a>
                <a
                  className="flex flex-1 items-center justify-center rounded-full bg-neutral-100 py-2 text-xs font-semibold hover:bg-neutral-200"
                  target="_blank" rel="noopener noreferrer"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                >X</a>
                <button
                  onClick={handleCopy}
                  className="flex flex-1 items-center justify-center gap-1 rounded-full bg-neutral-100 py-2 text-xs font-semibold hover:bg-neutral-200"
                >
                  {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                </button>
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[var(--primary,#0d7a5f)]" />
                <span>Donation protected. Funds released directly to the verified organizer.</span>
              </div>
            </div>

            {/* Donors card */}
            {campaign.donors.length > 0 && (
              <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-[var(--primary,#0d7a5f)]" />
                  <h2 className="text-base font-bold">Recent donations</h2>
                </div>
                <ul className="mt-4 space-y-4">
                  {(showAllDonors ? campaign.donors : campaign.donors.slice(0, 5)).map((d, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="grid size-9 place-items-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-700">
                        {d.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-neutral-900">{d.name}</p>
                        <p className="text-xs text-neutral-500">{d.time}</p>
                      </div>
                      <span className="text-sm font-bold tabular-nums text-neutral-900">{fmtFCFA(d.amount)}</span>
                    </li>
                  ))}
                </ul>
                {campaign.donors.length > 5 && (
                  <button
                    onClick={() => setShowAllDonors(!showAllDonors)}
                    className="mt-4 w-full rounded-full border border-neutral-300 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    {showAllDonors ? "Show less" : `See all ${campaign.donors.length}`}
                  </button>
                )}
                <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                  <Gift className="size-3.5" /> Be a part of this story
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      <SiteFooter />

      {/* Mobile donate dock */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-neutral-900">
              {fmtFCFA(campaign.raised)} <span className="font-normal text-neutral-500">of {fmtFCFA(campaign.goal)}</span>
            </p>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
              <div className="h-full rounded-full bg-[var(--primary,#0d7a5f)]" style={{ width: `${percent}%` }} />
            </div>
          </div>
          <Link
            to="/donate"
            search={{ c: campaign.slug }}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--primary,#0d7a5f)] px-5 py-2.5 text-sm font-bold text-white"
          >
            <Heart className="size-4 fill-white" /> Donate
          </Link>
        </div>
      </div>
    </div>
  );
}
