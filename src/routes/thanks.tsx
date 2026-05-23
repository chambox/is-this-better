import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Copy, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCampaign } from "@/lib/campaigns";

type Search = {
  amount?: string;
  currency?: string;
  name?: string;
  method?: string;
  c?: string;
};

export const Route = createFileRoute("/thanks")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    amount: typeof s.amount === "string" ? s.amount : undefined,
    currency: typeof s.currency === "string" ? s.currency : undefined,
    name: typeof s.name === "string" ? s.name : undefined,
    method: typeof s.method === "string" ? s.method : undefined,
    c: typeof s.c === "string" ? s.c : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Thank you — givehope" },
      { name: "description", content: "Thank you for your donation." },
    ],
  }),
  component: Thanks,
});

function Thanks() {
  const { amount, currency, name, method, c } = useSearch({ from: "/thanks" });
  const campaign = useCampaign(c || "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    toast.success("Donation received", {
      description: "A receipt has been sent to your email.",
    });
  }, []);

  const shareUrl =
    typeof window !== "undefined"
      ? campaign
        ? `${window.location.origin}/c/${campaign.slug}`
        : window.location.origin + "/"
      : "";
  const shareText = campaign
    ? `I just supported "${campaign.title}" on givehope — join me 💚`
    : `I just donated on givehope — join me 💚`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f3f3f1] text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="grid size-7 place-items-center rounded-full bg-[#02a95c]">
              <Heart className="size-3.5 fill-white text-white" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">givehope</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="px-6 py-10 text-center sm:px-10">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#02a95c]/10">
              <Check className="size-8 text-[#02a95c]" strokeWidth={3} />
            </div>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Thank you{name ? `, ${name}` : ""}!
            </h1>
            <p className="mt-3 text-base text-neutral-600">
              Your donation {amount && currency ? <>of <span className="font-bold text-neutral-900">{amount} {currency}</span> </> : ""}
              {campaign ? <>is helping <span className="font-bold text-neutral-900">{campaign.title}</span>.</> : "makes a real difference."}
            </p>
            {method && <p className="mt-1 text-xs text-neutral-500">Paid via {method}</p>}

            <div className="mt-8 rounded-xl bg-neutral-50 px-5 py-4 text-left">
              <p className="text-sm font-bold text-neutral-900">What happens next</p>
              <ul className="mt-2 space-y-1.5 text-sm text-neutral-600">
                <li className="flex gap-2"><span className="text-[#02a95c]">✓</span> A receipt has been emailed to you.</li>
                <li className="flex gap-2"><span className="text-[#02a95c]">✓</span> Funds go directly to the verified organizer.</li>
                <li className="flex gap-2"><span className="text-[#02a95c]">✓</span> You&apos;ll get notified when the organizer posts updates.</li>
              </ul>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-bold text-neutral-900">Share this fundraiser</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#25d366] px-4 py-2 text-sm font-bold text-white hover:opacity-90">WhatsApp</a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#1877f2] px-4 py-2 text-sm font-bold text-white hover:opacity-90">Facebook</a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-sm font-bold text-white hover:opacity-90">X</a>
                <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-bold text-neutral-700 hover:bg-neutral-50">
                  {copied ? <><Check className="size-3.5 text-[#02a95c]" /> Copied</> : <><Copy className="size-3.5" /> Copy link</>}
                </button>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {campaign && (
                <Link to="/c/$slug" params={{ slug: campaign.slug }} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#02a95c] hover:underline">
                  Back to fundraiser <ArrowRight className="size-3.5" />
                </Link>
              )}
              <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-700 hover:underline">
                Discover more fundraisers <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
