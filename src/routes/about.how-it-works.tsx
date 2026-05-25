import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Share2, HandHeart, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const PRIMARY = "#0d7a5f";

export const Route = createFileRoute("/about/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — givehope" },
      { name: "description", content: "Learn how to start a successful fundraiser on givehope in three simple steps." },
      { property: "og:title", content: "How It Works — givehope" },
      { property: "og:description", content: "Three simple steps to launch a successful fundraiser." },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SiteHeader />

      <section className="bg-gradient-to-br from-[#f5f0e1] via-white to-[#f5f0e1]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-8 sm:py-28">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>How It Works</span>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">From idea to impact in minutes</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-600">
            Whether it's a personal cause or a community emergency, our platform makes it effortless to rally support and put donations to work.
          </p>
          <Link
            to="/start"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-90"
            style={{ background: ORANGE }}
          >
            Start your fundraiser <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            { n: "01", icon: Sparkles, title: "Create your fundraiser", body: "Pick a category, write your story, set a goal, and upload a photo. We'll guide you through every step." },
            { n: "02", icon: Share2, title: "Share with supporters", body: "Use our built-in tools to share via WhatsApp, Facebook, email, or a custom link. The more eyes, the more impact." },
            { n: "03", icon: HandHeart, title: "Receive donations safely", body: "Funds are deposited securely. Keep donors updated with posts so they see the difference they're making." },
          ].map((s) => (
            <div key={s.n} className="relative rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <span className="absolute right-6 top-6 text-6xl font-black text-neutral-100">{s.n}</span>
              <span className="grid size-14 place-items-center rounded-2xl" style={{ background: "#e8f5f0" }}>
                <s.icon className="size-7" style={{ color: ORANGE }} />
              </span>
              <h3 className="mt-5 text-xl font-extrabold">{s.title}</h3>
              <p className="mt-3 text-sm text-neutral-600">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FAFBFD]">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-8">
          <h2 className="text-3xl font-black sm:text-4xl">What's included with every fundraiser</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "0% platform fee — only standard payment processing applies",
              "Built-in social share tools for WhatsApp, Facebook, Twitter & email",
              "Donor management dashboard with real-time tracking",
              "Updates posts to keep supporters engaged",
              "Identity verification & fraud protection",
              "Mobile-friendly campaign pages that look great anywhere",
            ].map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-neutral-100">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0" style={{ color: ORANGE }} />
                <span className="text-sm text-neutral-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
