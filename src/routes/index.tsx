import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Heart,
  Share2,
  Flag,
  ShieldCheck,
  Users,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import philipHero from "@/assets/philip-hero.jpg";

export const Route = createFileRoute("/")({
  component: Campaign,
});

const GOAL = 2_000_000;
const RAISED = 500;

const recentDonors = [
  { name: "Anonymous", amount: 500, when: "2 hours ago", note: "Sending love and prayers to Philip 🙏" },
];

const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

function Campaign() {
  const [amount, setAmount] = useState<number | "">(5000);
  const [storyOpen, setStoryOpen] = useState(false);
  const progress = useMemo(() => Math.min(100, (RAISED / GOAL) * 100), []);

  const presets = [2000, 5000, 10000, 25000, 50000];

  const scrollToDonate = () => {
    document.getElementById("donate")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleShare = async () => {
    const shareData = {
      title: "Hands & Hearts for Philip (HHP)",
      text: "Help Philip recover — every contribution counts.",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard");
      }
    } catch {
      /* user cancelled */
    }
  };

  const handleDonate = () => {
    const value = typeof amount === "number" && amount > 0 ? amount : 0;
    alert(
      value > 0
        ? `Thanks! You'll be redirected to MTN Mobile Money to complete a ${fmt(value)} FCFA donation.`
        : "Please choose or enter an amount first.",
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-neutral-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-7 place-items-center rounded-full bg-[#02a95c] text-white">
              <Heart className="size-3.5 fill-white" />
            </span>
            <span>givehope</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-neutral-600 md:flex">
            <button onClick={scrollToDonate} className="hover:text-neutral-900">Donate</button>
            <button onClick={handleShare} className="hover:text-neutral-900">Share</button>
          </nav>
          <button
            onClick={scrollToDonate}
            className="rounded-full bg-[#02a95c] px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#028f4e]"
          >
            Donate
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Title (mobile) */}
        <h1 className="mb-5 text-2xl font-bold tracking-tight text-neutral-900 lg:hidden">
          Hands &amp; Hearts for Philip (HHP)
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
          {/* Left column */}
          <section>
            {/* Hero image */}
            <div className="overflow-hidden rounded-2xl bg-neutral-200 shadow-sm ring-1 ring-black/5">
              <img
                src={philipHero}
                alt="Philip, the beneficiary of this fundraiser"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            {/* Title (desktop) */}
            <h1 className="mt-6 hidden text-3xl font-bold leading-tight tracking-tight text-neutral-900 lg:block lg:text-4xl">
              Hands &amp; Hearts for Philip (HHP)
            </h1>

            {/* Organizer */}
            <div className="mt-5 flex items-center gap-3 border-y border-neutral-200 py-4">
              <div className="grid size-10 place-items-center rounded-full bg-[#e8f7ef] text-[#02a95c] font-semibold">
                M
              </div>
              <div className="text-sm leading-tight">
                <p className="font-medium text-neutral-900">Marie K. is organizing this fundraiser</p>
                <p className="text-neutral-500">on behalf of Philip · Donation protected</p>
              </div>
            </div>

            {/* Story */}
            <article className="mt-6 space-y-4 text-[15px] leading-relaxed text-neutral-800">
              <p>
                Our neighbor Philip has lived on our street for over twenty years. He&apos;s the
                first person to lend a hand, the one who checks in on the elders, and the quiet
                heart of our small community in Yaoundé.
              </p>
              <p>
                A few weeks ago, Philip suffered a serious leg injury that has left him unable
                to walk without assistance. The treatment he needs — medication, physiotherapy,
                and a basic mobility aid — is beyond what his small income can cover.
              </p>

              {storyOpen && (
                <>
                  <p>
                    We&apos;ve started this fundraiser to cover his clinic visits over the next
                    three months and a follow-up procedure recommended by his doctor. Every
                    contribution, no matter how small, brings him closer to walking on his own
                    again.
                  </p>
                  <p>
                    Funds are received directly through MTN Mobile Money and managed by a small
                    committee of neighbors. We&apos;ll post weekly updates here with receipts and
                    photos so every donor can see exactly how their gift is helping Philip.
                  </p>
                  <p className="italic text-neutral-600">
                    Thank you for reading Philip&apos;s story. Whatever you can give — or simply
                    sharing this page — means the world to him.
                  </p>
                </>
              )}

              <button
                onClick={() => setStoryOpen((s) => !s)}
                className="inline-flex items-center gap-1 pt-1 text-sm font-semibold text-[#02a95c] hover:underline"
              >
                {storyOpen ? "Read less" : "Read more"}
                {storyOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </button>
            </article>

            {/* Action buttons (mobile) */}
            <div className="mt-6 flex gap-3 lg:hidden">
              <button onClick={handleShare} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white py-3 text-sm font-semibold hover:bg-neutral-50">
                <Share2 className="size-4" /> Share
              </button>
              <button onClick={scrollToDonate} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#02a95c] py-3 text-sm font-semibold text-white hover:bg-[#028f4e]">
                <Heart className="size-4 fill-white" /> Donate
              </button>
            </div>

            {/* Organizer + report */}
            <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-[#02a95c]" />
                <p className="text-sm font-semibold">Donation protected</p>
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                Mobile payments are collected securely via MTN Mobile Money. Funds are released
                directly to the medical provider and care committee.
              </p>
            </div>

            <button
              onClick={() => alert("Thanks for flagging — our team will review this fundraiser.")}
              className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700"
            >
              <Flag className="size-4" /> Report fundraiser
            </button>
          </section>

          {/* Right column - donate card */}
          <aside id="donate" className="lg:sticky lg:top-20 lg:self-start scroll-mt-20">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <p className="text-2xl font-bold text-neutral-900">
                  {fmt(RAISED)} <span className="text-base font-medium text-neutral-500">FCFA raised</span>
                </p>
                <p className="text-sm text-neutral-500">
                  of {fmt(GOAL)} FCFA goal · {recentDonors.length} donation
                </p>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-[#02a95c] transition-[width] duration-500"
                  style={{ width: `${Math.max(progress, 1.5)}%` }}
                />
              </div>

              <div className="mt-5 space-y-2">
                <button onClick={handleShare} className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white py-3 text-sm font-semibold hover:bg-neutral-50">
                  <Share2 className="size-4" /> Share
                </button>
                <button onClick={handleDonate} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#02a95c] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#028f4e]">
                  <Heart className="size-4 fill-white" /> Donate now
                </button>
              </div>

              {/* Amount picker */}
              <div className="mt-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Choose an amount (FCFA)
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {presets.map((p) => (
                    <button
                      key={p}
                      onClick={() => setAmount(p)}
                      className={`rounded-lg border py-2 text-sm font-medium transition ${
                        amount === p
                          ? "border-[#02a95c] bg-[#e8f7ef] text-[#026a3a]"
                          : "border-neutral-200 bg-white hover:border-neutral-400"
                      }`}
                    >
                      {fmt(p)}
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Other"
                    value={typeof amount === "number" && !presets.includes(amount) ? amount : ""}
                    onChange={(e) =>
                      setAmount(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    className="col-span-1 rounded-lg border border-neutral-200 bg-white px-2 py-2 text-sm placeholder:text-neutral-400 focus:border-[#02a95c] focus:outline-none"
                  />
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-neutral-500">
                  Mobile payments are collected securely via MTN Mobile Money.
                </p>
              </div>

              {/* Recent activity */}
              <div className="mt-6 border-t border-neutral-200 pt-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold">Recent activity</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                    <Users className="size-3" /> {recentDonors.length}
                  </span>
                </div>
                <ul className="space-y-4">
                  {recentDonors.map((d, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-600">
                        <Heart className="size-4" />
                      </div>
                      <div className="text-sm leading-tight">
                        <p>
                          <span className="font-semibold">{d.name}</span>{" "}
                          <span className="text-neutral-500">donated {fmt(d.amount)} FCFA</span>
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500">{d.when}</p>
                        {d.note && (
                          <p className="mt-1 rounded-lg bg-neutral-50 px-3 py-2 text-[13px] text-neutral-700">
                            “{d.note}”
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => alert("Full donor list coming soon.")}
                  className="mt-4 w-full rounded-full border border-neutral-300 bg-white py-2 text-sm font-semibold hover:bg-neutral-50"
                >
                  See all
                </button>
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-[#fff8e6] p-3 text-[12px] text-amber-900">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-amber-600" />
                <p>
                  Be the next donor to help Philip reach his goal. Even a small gift helps.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Sticky mobile CTA */}
      <div className="sticky bottom-0 z-30 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <button onClick={handleDonate} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#02a95c] py-3 text-sm font-semibold text-white shadow-sm">
          <Heart className="size-4 fill-white" /> Donate now
        </button>
      </div>

      <footer className="border-t border-neutral-200 py-8 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} givehope · Fundraiser hosted for the HHP community committee
      </footer>
    </div>
  );
}
