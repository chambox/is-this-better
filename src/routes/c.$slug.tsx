import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart, Share2, Copy, Check, Calendar, MapPin,
  ShieldCheck, Flag, ChevronRight,
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
    <div className="grid min-h-screen place-items-center bg-[#f5f1e8] px-4 text-center">
      <div>
        <h1 className="font-serif text-4xl text-neutral-900" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Fundraiser not found
        </h1>
        <p className="mt-2 text-sm text-neutral-600">It may have been removed or the link is wrong.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-1 border-b border-neutral-900 pb-0.5 text-sm font-semibold text-neutral-900">
          Browse fundraisers
        </Link>
      </div>
    </div>
  ),
  component: CampaignPage,
});

const TEAM = [
  { name: "Marie N.", role: "Committee chair" },
  { name: "Pastor Joseph K.", role: "Community liaison" },
  { name: "Dr. Aline T.", role: "Medical coordinator" },
  { name: "Eric M.", role: "Treasurer" },
];

const serif = { fontFamily: "'Instrument Serif', 'Iowan Old Style', Georgia, serif" } as const;

function CampaignPage() {
  const { slug } = useParams({ from: "/c/$slug" });
  const campaign = useCampaign(slug);
  const [copied, setCopied] = useState(false);
  const [showAllDonors, setShowAllDonors] = useState(false);

  if (!campaign) return null;

  const percent = Math.min(100, (campaign.raised / campaign.goal) * 100);
  const remaining = Math.max(0, campaign.goal - campaign.raised);

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

  const [firstPara, ...restParas] = campaign.story.split(/\n\n+/);

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-neutral-900">
      <SiteHeader />

      <article className="mx-auto max-w-[1100px] px-5 pt-10 sm:px-8 sm:pt-16">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
          <span className="text-[var(--primary,#0d7a5f)]" style={{ color: "var(--primary, #0d7a5f)" }}>
            {campaign.category}
          </span>
          <span aria-hidden>·</span>
          <span>Fundraiser</span>
        </div>

        {/* Headline */}
        <h1
          className="mt-5 max-w-4xl text-[44px] leading-[1.05] tracking-tight text-neutral-900 sm:text-[68px] sm:leading-[1.02]"
          style={serif}
        >
          {campaign.title}
        </h1>

        {/* Byline */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-neutral-600">
          <span className="inline-flex items-center gap-1.5">
            By <span className="font-semibold text-neutral-900">{campaign.organizer}</span>
          </span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" /> {campaign.location}</span>
          <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" /> {createdLabel}</span>
        </div>

        {/* Hero image, full-bleed */}
        {campaign.image && (
          <figure className="mt-10">
            <div className="aspect-[16/9] w-full overflow-hidden">
              <img src={campaign.image} alt={campaign.title} className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-3 text-[12px] italic text-neutral-500" style={serif}>
              {campaign.location} — photograph courtesy of the organizing committee.
            </figcaption>
          </figure>
        )}

        <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_320px]">
          {/* Story column */}
          <div className="max-w-[64ch]">
            <p className="text-[19px] leading-[1.7] text-neutral-800">
              <span
                className="float-left mr-3 mt-1 text-[68px] leading-[0.85] text-[var(--primary,#0d7a5f)]"
                style={{ ...serif, color: "var(--primary, #0d7a5f)" }}
              >
                {firstPara?.charAt(0)}
              </span>
              {firstPara?.slice(1)}
            </p>
            {restParas.map((p, i) => (
              <p key={i} className="mt-6 text-[17px] leading-[1.75] text-neutral-800">{p}</p>
            ))}

            {/* Updates */}
            {campaign.updates.length > 0 && (
              <section className="mt-16 border-t border-neutral-300/70 pt-10">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Updates from the organizer
                </h2>
                <div className="mt-8 space-y-10">
                  {campaign.updates.map((u, i) => (
                    <div key={i} className="grid gap-2 sm:grid-cols-[120px_1fr] sm:gap-8">
                      <div className="text-[13px] uppercase tracking-wider text-neutral-500" style={serif}>
                        {u.date}
                      </div>
                      <div>
                        <h3 className="text-[24px] leading-tight text-neutral-900" style={serif}>{u.title}</h3>
                        <p className="mt-2 text-[16px] leading-[1.75] text-neutral-700">{u.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Committee */}
            <section className="mt-16 border-t border-neutral-300/70 pt-10">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Organizing committee
              </h2>
              <ul className="mt-6 divide-y divide-neutral-200">
                {TEAM.map((m) => (
                  <li key={m.name} className="flex items-baseline justify-between py-3">
                    <span className="text-[20px] text-neutral-900" style={serif}>{m.name}</span>
                    <span className="text-[12px] uppercase tracking-wider text-neutral-500">{m.role}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar — minimal, no card chrome */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border-t-2 border-neutral-900 pt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Raised so far</p>
              <p className="mt-3 text-[44px] leading-none text-neutral-900" style={serif}>
                {fmtFCFA(campaign.raised)} <span className="text-[16px] text-neutral-500">FCFA</span>
              </p>
              <p className="mt-2 text-[13px] text-neutral-600">
                of {fmtFCFA(campaign.goal)} FCFA goal · {campaign.donors.length} donors
              </p>

              <div className="mt-5 h-[3px] w-full bg-neutral-200">
                <div className="h-full bg-[var(--primary,#0d7a5f)]" style={{ width: `${percent}%`, background: "var(--primary, #0d7a5f)" }} />
              </div>
              <p className="mt-2 text-[12px] text-neutral-500">{fmtFCFA(remaining)} FCFA still needed</p>

              <Link
                to="/donate"
                search={{ c: campaign.slug }}
                className="mt-6 flex w-full items-center justify-center gap-2 bg-neutral-900 py-3.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-neutral-800"
              >
                <Heart className="size-3.5 fill-white" /> Donate
              </Link>

              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Share</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
                  <a className="border-b border-neutral-300 pb-0.5 hover:border-neutral-900" target="_blank" rel="noopener noreferrer"
                     href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}>WhatsApp</a>
                  <a className="border-b border-neutral-300 pb-0.5 hover:border-neutral-900" target="_blank" rel="noopener noreferrer"
                     href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}>Facebook</a>
                  <a className="border-b border-neutral-300 pb-0.5 hover:border-neutral-900" target="_blank" rel="noopener noreferrer"
                     href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}>X / Twitter</a>
                  <button onClick={handleCopy} className="inline-flex items-center gap-1 border-b border-neutral-300 pb-0.5 hover:border-neutral-900">
                    {copied ? <Check className="size-3" /> : <Copy className="size-3" />} {copied ? "Copied" : "Copy link"}
                  </button>
                </div>
              </div>

              <p className="mt-8 flex items-start gap-2 text-[12px] leading-relaxed text-neutral-600">
                <ShieldCheck className="mt-0.5 size-3.5 shrink-0" />
                Donation protected. Funds released directly to the verified organizer.
              </p>
            </div>

            {/* Recent donors */}
            {campaign.donors.length > 0 && (
              <div className="mt-10 border-t border-neutral-300/70 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Recent donations</p>
                <ul className="mt-4 divide-y divide-neutral-200">
                  {(showAllDonors ? campaign.donors : campaign.donors.slice(0, 4)).map((d, i) => (
                    <li key={i} className="flex items-baseline justify-between py-2.5">
                      <div className="min-w-0">
                        <p className="truncate text-[14px] text-neutral-900" style={serif}>{d.name}</p>
                        <p className="text-[11px] text-neutral-500">{d.time}</p>
                      </div>
                      <span className="text-[13px] font-semibold tabular-nums text-neutral-900">{fmtFCFA(d.amount)}</span>
                    </li>
                  ))}
                </ul>
                {campaign.donors.length > 4 && (
                  <button onClick={() => setShowAllDonors(!showAllDonors)} className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wider text-neutral-700 hover:text-neutral-900">
                    {showAllDonors ? "Show less" : "See all"} <ChevronRight className="size-3" />
                  </button>
                )}
              </div>
            )}
          </aside>
        </div>

        {/* Closing report bar */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-300/70 py-6 text-[12px] text-neutral-500">
          <button onClick={() => toast.success("Report submitted.")} className="inline-flex items-center gap-1.5 hover:text-neutral-900">
            <Flag className="size-3" /> Report this fundraiser
          </button>
          <button onClick={handleCopy} className="inline-flex items-center gap-1.5 hover:text-neutral-900">
            <Share2 className="size-3" /> Share with friends
          </button>
        </div>
      </article>

      <SiteFooter />

      {/* Mobile donate dock — slimmer */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-[#f5f1e8]/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] text-neutral-900" style={serif}>
              {fmtFCFA(campaign.raised)} <span className="text-neutral-500">of {fmtFCFA(campaign.goal)} FCFA</span>
            </p>
            <div className="mt-1 h-[2px] w-full bg-neutral-200">
              <div className="h-full" style={{ width: `${percent}%`, background: "var(--primary, #0d7a5f)" }} />
            </div>
          </div>
          <Link to="/donate" search={{ c: campaign.slug }} className="inline-flex shrink-0 items-center gap-1.5 bg-neutral-900 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white">
            <Heart className="size-3.5 fill-white" /> Donate
          </Link>
        </div>
      </div>
    </div>
  );
}
