import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Lock, BadgeCheck, RefreshCw, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const PRIMARY = "#0d7a5f";

export const Route = createFileRoute("/about/refund-guarantees")({
  head: () => ({
    meta: [
      { title: "Refund Guarantee — givehope" },
      { name: "description", content: "Our donor protection policy: if a fundraiser is misused, we refund your donation. Learn how it works." },
      { property: "og:title", content: "Refund Guarantee — givehope" },
      { property: "og:description", content: "Donate with confidence — our refund guarantee protects every contribution." },
    ],
  }),
  component: Refund,
});

function Refund() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SiteHeader />

      <section className="bg-gradient-to-br from-[#f5f0e1] via-white to-[#f5f0e1]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-8 sm:py-28">
          <span className="grid mx-auto size-16 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-[#f0ebd8]">
            <ShieldCheck className="size-8" style={{ color: PRIMARY }} />
          </span>
          <h1 className="mt-6 text-4xl font-black sm:text-6xl">The givehope Guarantee</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-600">
            We back every donation with our protection promise. If something isn't right, we make it right.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "100% donation protection", body: "If your donation goes to the wrong place, we refund it — every cent." },
            { icon: BadgeCheck, title: "Identity verified", body: "Every organizer's identity is verified before they can withdraw funds." },
            { icon: Lock, title: "Secure transactions", body: "Bank-grade encryption protects your payment information end-to-end." },
          ].map((g) => (
            <div key={g.title} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100">
              <span className="grid size-12 place-items-center rounded-2xl" style={{ background: "#e8f5f0" }}>
                <g.icon className="size-6" style={{ color: PRIMARY }} />
              </span>
              <h3 className="mt-5 text-lg font-extrabold">{g.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{g.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FAFBFD]">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-8">
          <h2 className="text-3xl font-black sm:text-4xl">How a refund request works</h2>
          <div className="mt-8 space-y-4">
            {[
              { step: "1", title: "Contact our trust team", body: "Reach out within 1 year of your donation. We respond to every report within 24 hours." },
              { step: "2", title: "We investigate the campaign", body: "Our team reviews donor reports, organizer activity, and how funds were used." },
              { step: "3", title: "If misuse is confirmed, you're refunded", body: "Eligible donors receive a full refund — directly back to the original payment method." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-5 rounded-2xl bg-white p-6 ring-1 ring-neutral-100">
                <span className="grid size-12 shrink-0 place-items-center rounded-full text-lg font-black text-white" style={{ background: PRIMARY }}>
                  {s.step}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold">{s.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-4 rounded-3xl border border-[#e8f5f0] bg-[#f5f0e1] p-6">
            <AlertCircle className="mt-0.5 size-5 shrink-0" style={{ color: PRIMARY }} />
            <div>
              <h4 className="text-sm font-extrabold">Need to report a fundraiser?</h4>
              <p className="mt-1 text-sm text-neutral-700">
                If you suspect misuse, please{" "}
                <Link to="/contact" className="font-bold underline" style={{ color: PRIMARY }}>
                  contact us
                </Link>{" "}
                immediately. Our team will investigate within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-8">
        <RefreshCw className="mx-auto size-8" style={{ color: PRIMARY }} />
        <h2 className="mt-4 text-2xl font-black">Donate with full peace of mind</h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Over 99.9% of fundraisers run exactly as promised. For the rare exception, our guarantee has your back.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
