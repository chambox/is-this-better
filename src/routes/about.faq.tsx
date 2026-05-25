import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const ORANGE = "#FF8C42";

const FAQS: { q: string; a: string }[] = [
  { q: "How much does it cost to start a fundraiser?", a: "It's completely free to launch a fundraiser. Standard payment processing fees apply to each donation (typically 2.9% + 30 FCFA), and there's no platform fee." },
  { q: "How long does it take to get my funds?", a: "Once your bank account is connected and verified, donations typically arrive within 2–5 business days of being made." },
  { q: "What can I raise money for?", a: "Almost anything — medical bills, education, emergencies, memorials, community projects, sports teams, nonprofits, creative projects, and more." },
  { q: "Is my donation tax-deductible?", a: "Donations to verified registered nonprofits are tax-deductible. Personal fundraisers generally are not. Always consult a tax professional for your specific situation." },
  { q: "Can I donate anonymously?", a: "Yes. When donating, simply check the 'Make my donation anonymous' option and your name won't appear on the campaign page." },
  { q: "What if I want to cancel a donation?", a: "Donations can be refunded within 90 days under our refund guarantee. Reach out to our support team via the Contact page." },
  { q: "How do you keep fundraisers safe?", a: "Every organizer is identity-verified. Our trust team monitors campaigns 24/7 using both automated systems and human review." },
  { q: "Can I fundraise on behalf of someone else?", a: "Absolutely. When creating, just specify that you're fundraising for a friend, family member, or organization, and we'll guide you through transferring funds to them safely." },
];

export const Route = createFileRoute("/about/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — givehope" },
      { name: "description", content: "Answers to common questions about starting a fundraiser, donating, fees, refunds, and trust." },
      { property: "og:title", content: "Frequently Asked Questions — givehope" },
      { property: "og:description", content: "Everything you need to know about fundraising and donating on givehope." },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SiteHeader />

      <section className="bg-gradient-to-br from-[#FFF7F0] via-white to-[#EFF8FF]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-8 sm:py-24">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>FAQ</span>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">Frequently asked questions</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-600">
            Quick answers to the things people ask us most. Can't find what you need? We're here to help.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-extrabold">{f.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                    style={{ color: ORANGE }}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-neutral-600 animate-fade-in">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#FFF7F0] to-[#EFF8FF] p-8 text-center sm:p-10">
          <MessageCircle className="mx-auto size-8" style={{ color: ORANGE }} />
          <h2 className="mt-3 text-2xl font-black">Still have questions?</h2>
          <p className="mt-2 text-sm text-neutral-600">Our support team usually replies within a few hours.</p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-90"
            style={{ background: ORANGE }}
          >
            Contact support
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
