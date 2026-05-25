import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, ShieldCheck, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const ORANGE = "#FF8C42";
const BLUE = "#3FA7E0";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — givehope" },
      { name: "description", content: "Get in touch with the givehope team. We respond to every message within a few hours." },
      { property: "og:title", content: "Contact givehope" },
      { property: "og:description", content: "Email, phone, and contact form to reach our support team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent! We'll get back to you within a few hours.");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SiteHeader />

      <section className="bg-gradient-to-br from-[#EFF8FF] via-white to-[#FFF7F0]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-8 sm:py-24">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>Get In Touch</span>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">We're here to help</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-600">
            Whether you have a question, need support with a fundraiser, or want to report something — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact info */}
          <div className="space-y-4 lg:col-span-1">
            {[
              { icon: Mail, label: "Email us", value: "support@givehope.com", sub: "We reply within a few hours", tint: "#FFF1E5", color: ORANGE },
              { icon: Phone, label: "Call us", value: "+237 6 90 12 34 56", sub: "Mon–Fri, 8am–6pm WAT", tint: "#DCEEFF", color: BLUE },
              { icon: MapPin, label: "Visit us", value: "Akwa, Douala, Cameroon", sub: "Bonanjo District, 5th floor", tint: "#FFF1E5", color: ORANGE },
            ].map((c) => (
              <div key={c.label} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-100">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl" style={{ background: c.tint }}>
                  <c.icon className="size-6" style={{ color: c.color }} />
                </span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-neutral-500">{c.label}</div>
                  <div className="mt-0.5 text-base font-extrabold">{c.value}</div>
                  <div className="mt-0.5 text-xs text-neutral-500">{c.sub}</div>
                </div>
              </div>
            ))}

            {/* Quick links */}
            <div className="rounded-2xl bg-gradient-to-br from-[#FFF7F0] to-[#EFF8FF] p-5">
              <div className="flex items-center gap-2 text-sm font-extrabold">
                <MessageCircle className="size-4" style={{ color: ORANGE }} />
                Quick answers
              </div>
              <div className="mt-3 space-y-1.5">
                {[
                  { label: "How It Works", to: "/about/how-it-works" },
                  { label: "Refund Guarantee", to: "/about/refund-guarantees" },
                  { label: "Full FAQ", to: "/about/faq" },
                ].map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm font-semibold text-neutral-700 hover:text-[#FF8C42]"
                  >
                    {l.label} <ChevronRight className="size-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Form + map */}
          <div className="lg:col-span-2">
            <form onSubmit={submit} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100 sm:p-10">
              <h2 className="text-2xl font-black">Send us a message</h2>
              <p className="mt-1 text-sm text-neutral-600">Fill out the form and our team will get back to you shortly.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full name"
                  type="text"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder="Jane Doe"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="jane@example.com"
                />
              </div>
              <div className="mt-4">
                <Field
                  label="Subject"
                  type="text"
                  value={form.subject}
                  onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
                  placeholder="How can we help?"
                />
              </div>
              <div className="mt-4">
                <label className="text-sm font-bold text-neutral-800">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us a bit more…"
                  rows={6}
                  className="mt-1.5 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FFE2CB]"
                />
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <ShieldCheck className="size-4" style={{ color: BLUE }} />
                  Your data is safe with us
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
                  style={{ background: ORANGE }}
                >
                  {sending ? "Sending…" : (<>Send message <Send className="size-4" /></>)}
                </button>
              </div>
            </form>

            {/* Map placeholder */}
            <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-neutral-100">
              <iframe
                title="Office location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=9.6800%2C4.0400%2C9.7400%2C4.0700&layer=mapnik&marker=4.0511%2C9.7679"
                className="h-64 w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label, type, value, onChange, placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-bold text-neutral-800">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FFE2CB]"
      />
    </div>
  );
}
