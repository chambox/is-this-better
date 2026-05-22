import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, CreditCard, Heart, Lock, ShieldCheck, Smartphone } from "lucide-react";

export const Route = createFileRoute("/donate")({
  component: Donate,
});

const GOAL = 2_000_000;
const RAISED = 500;

// FX: 1 USD ≈ 600 FCFA
const USD_RATE = 600;

const PRESETS_FCFA = [50_000, 25_000, 10_000, 5_000, 2_000, 1_000];
const PRESETS_USD = [100, 50, 25, 10, 5, 2];
const SUGGESTED_FCFA = 5_000;
const SUGGESTED_USD = 10;

const fmtFCFA = (n: number) => new Intl.NumberFormat("fr-FR").format(n);
const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 }).format(n);

function Donate() {
  const [method, setMethod] = useState<"mtn" | "orange" | "stripe" | "paypal">("stripe");
  const isMobileMoney = method === "mtn" || method === "orange";
  const isCard = method === "stripe";
  const isPayPal = method === "paypal";
  const isIntl = isCard || isPayPal;

  const currency = isIntl ? "USD" : "FCFA";
  const presets = isIntl ? PRESETS_USD : PRESETS_FCFA;
  const suggested = isIntl ? SUGGESTED_USD : SUGGESTED_FCFA;
  const fmt = (n: number) => (isIntl ? fmtUSD(n) : fmtFCFA(n));

  const [amount, setAmount] = useState<number>(SUGGESTED_FCFA);
  const [custom, setCustom] = useState<string>("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [name, setName] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [comment, setComment] = useState("");

  // Reset amount when switching between FCFA and USD methods
  const prevIntlRef = (Donate as any)._prevIntl;
  if (prevIntlRef !== isIntl) {
    (Donate as any)._prevIntl = isIntl;
  }

  const remaining = Math.max(0, GOAL - RAISED);
  const remainingDisplay = isIntl ? Math.ceil(remaining / USD_RATE) : remaining;
  const percent = useMemo(() => Math.min(100, (RAISED / GOAL) * 100), []);

  const R = 28;
  const C = 2 * Math.PI * R;
  const offset = C - (percent / 100) * C;

  const effective = custom ? Number(custom) || 0 : (presets.includes(amount) ? amount : suggested);

  const handleAmount = (v: number) => {
    setAmount(v);
    setCustom("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effective || effective <= 0) {
      alert("Please choose or enter a donation amount.");
      return;
    }
    if (!anonymous && !name.trim()) {
      alert("Please enter your name, or choose to donate anonymously.");
      return;
    }
    if (isMobileMoney) {
      if (!/^6\d{8}$/.test(phone.replace(/\s+/g, ""))) {
        alert("Please enter a valid 9-digit mobile number starting with 6.");
        return;
      }
      alert(
        `Thanks${anonymous ? "" : `, ${name}`}! You'll receive a ${method === "mtn" ? "MTN MoMo" : "Orange Money"} prompt on ${phone} for ${fmt(effective)} ${currency}.`,
      );
      return;
    }
    if (isPayPal) {
      if (!email.trim() || !email.includes("@")) {
        alert("Please enter a valid PayPal email.");
        return;
      }
      alert(
        `Thanks${anonymous ? "" : `, ${name}`}! You'll be redirected to PayPal to complete your donation of ${fmt(effective)} ${currency}.`,
      );
      return;
    }
    if (isCard) {
      if (cardNumber.replace(/\s/g, "").length < 13) {
        alert("Please enter a valid card number.");
        return;
      }
      if (cardExpiry.length < 5) {
        alert("Please enter a valid expiry date (MM/YY).");
        return;
      }
      if (cardCvc.length < 3) {
        alert("Please enter a valid CVC.");
        return;
      }
      alert(
        `Thanks${anonymous ? "" : `, ${name}`}! Your card donation of ${fmt(effective)} ${currency} has been processed.`,
      );
    }
  };

  const formatCard = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  return (
    <div className="min-h-screen bg-[#f3f3f1] text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-neutral-900">
            <ChevronLeft className="size-4" /> Fundraiser
          </Link>
          <Link to="/" className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            <span className="grid size-7 place-items-center rounded-full bg-[#02a95c]">
              <Heart className="size-3.5 fill-white text-white" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-neutral-900">
              givehope
            </span>
          </Link>
          <div className="ml-auto hidden text-sm text-neutral-700 sm:block">
            Already have an account?{" "}
            <button className="font-semibold text-[#02a95c] underline underline-offset-2 hover:text-[#028f4e]">
              Sign in
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
        >
          <div className="flex items-center gap-5 px-6 pt-8 sm:px-10">
            <div className="relative shrink-0">
              <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
                <circle cx="36" cy="36" r={R} stroke="#e5e7eb" strokeWidth="6" fill="none" />
                <circle
                  cx="36"
                  cy="36"
                  r={R}
                  stroke="#02a95c"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={C}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-[stroke-dashoffset] duration-700"
                />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-[11px] font-bold text-neutral-700">
                {percent < 1 ? "<1%" : `${Math.round(percent)}%`}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-[34px]">
                Just <span className="text-[#02a95c]">{fmt(remainingDisplay)} {currency}</span> to go!
              </h1>
              <p className="mt-1 text-lg font-bold text-neutral-900">Make an impact.</p>
              <p className="mt-1 text-sm text-neutral-600">
                Hands &amp; Hearts for Philip (HHP)
              </p>
            </div>
          </div>

          <div className="space-y-8 px-6 py-8 sm:px-10">
            <div className="flex rounded-full border border-neutral-200 bg-neutral-50 p-1 text-sm">
              {(["once", "monthly"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={`flex-1 rounded-full py-2 font-semibold transition ${
                    frequency === f
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {f === "once" ? "Give once" : "Monthly"}
                </button>
              ))}
            </div>

            <div>
              <h2 className="mb-3 text-base font-bold text-neutral-900">
                Enter your donation
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {presets.map((v: number) => {
                  const selected = !custom && amount === v;
                  const isSuggested = v === suggested;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => handleAmount(v)}
                      className={`relative rounded-xl border py-4 text-base font-bold transition ${
                        selected
                          ? "border-neutral-900 bg-white text-neutral-900 ring-2 ring-neutral-900"
                          : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400"
                      }`}
                    >
                      {fmt(v)}
                      {isSuggested && (
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#c2f17a] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-neutral-900">
                          ♥ Suggested
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-xl border-2 border-neutral-300 px-5 py-4 focus-within:border-neutral-900">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-neutral-900">{currency}</span>
                  <input
                    inputMode="numeric"
                    placeholder="0"
                    value={custom}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9]/g, "");
                      setCustom(v);
                    }}
                    className="w-full bg-transparent text-right text-4xl font-extrabold tracking-tight text-neutral-900 outline-none placeholder:text-neutral-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-base font-bold text-neutral-900">Payment method</h2>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { id: "stripe" as const, label: "Card", sub: "Visa · Mastercard", icon: CreditCard, accent: "bg-[#635bff]" },
                  { id: "paypal" as const, label: "PayPal", sub: "Balance or card", icon: null, accent: "bg-[#003087]" },
                  { id: "mtn" as const, label: "MTN MoMo", sub: "Mobile money", icon: Smartphone, accent: "bg-[#ffcc00]" },
                  { id: "orange" as const, label: "Orange Money", sub: "Mobile money", icon: Smartphone, accent: "bg-[#ff6600]" },
                ] as const).map((m) => {
                  const active = method === m.id;
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                        active
                          ? "border-neutral-900 bg-white ring-2 ring-neutral-900"
                          : "border-neutral-200 bg-white hover:border-neutral-400"
                      }`}
                    >
                      <span className={`grid h-9 w-10 shrink-0 place-items-center rounded-lg ${m.accent} text-[10px] font-extrabold text-white`}>
                        {m.id === "paypal" ? (
                          <span className="font-black tracking-tight" style={{ fontSize: 11 }}>Pay<span className="text-[#009cde]">Pal</span></span>
                        ) : Icon ? (
                          <Icon className="size-4 text-white" />
                        ) : null}
                      </span>
                      <div className="min-w-0">
                        <span className="block text-sm font-bold leading-tight">{m.label}</span>
                        <span className="block text-[11px] text-neutral-500 leading-tight">{m.sub}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {isMobileMoney && (
              <div>
                <label className="mb-2 block text-base font-bold text-neutral-900">
                  {method === "mtn" ? "MTN MoMo" : "Orange Money"} number
                </label>
                <div className="flex items-stretch overflow-hidden rounded-xl border border-neutral-200 focus-within:border-neutral-900 focus-within:ring-2 focus-within:ring-neutral-900">
                  <span className="grid place-items-center bg-neutral-50 px-4 text-sm font-bold text-neutral-700">
                    +237
                  </span>
                  <input
                    type="tel"
                    placeholder="6XX XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-white px-4 py-3 font-mono text-base tracking-wider outline-none placeholder:text-neutral-300"
                  />
                </div>
                <p className="mt-2 text-xs text-neutral-500">
                  You&apos;ll receive a payment prompt on this number.
                </p>
              </div>
            )}

            {isPayPal && (
              <div>
                <label className="mb-2 block text-base font-bold text-neutral-900">PayPal email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 placeholder:text-neutral-300"
                />
                <p className="mt-2 text-xs text-neutral-500">
                  You&apos;ll be redirected to PayPal to complete the payment securely.
                </p>
              </div>
            )}

            {isCard && (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-base font-bold text-neutral-900">Card number</label>
                  <div className="flex items-stretch overflow-hidden rounded-xl border border-neutral-200 focus-within:border-neutral-900 focus-within:ring-2 focus-within:ring-neutral-900">
                    <span className="grid place-items-center bg-neutral-50 px-4">
                      <CreditCard className="size-4 text-neutral-400" />
                    </span>
                    <input
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCard(e.target.value))}
                      className="flex-1 bg-white px-4 py-3 font-mono text-base tracking-wider outline-none placeholder:text-neutral-300"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-2 block text-base font-bold text-neutral-900">Expiry</label>
                    <input
                      inputMode="numeric"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 font-mono text-base tracking-wider outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 placeholder:text-neutral-300"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-base font-bold text-neutral-900">CVC</label>
                    <input
                      inputMode="numeric"
                      type="password"
                      placeholder="123"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 font-mono text-base tracking-wider outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 placeholder:text-neutral-300"
                    />
                  </div>
                </div>
                <p className="text-xs text-neutral-500">
                  Your card details are encrypted and never stored on our servers.
                </p>
              </div>
            )}

            <div>
              <h2 className="mb-3 text-base font-bold text-neutral-900">Your information</h2>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={anonymous}
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-400"
              />
              <label className="mt-3 flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="size-4 rounded border-neutral-300 text-[#02a95c] focus:ring-[#02a95c]"
                />
                Donate anonymously
              </label>

              <textarea
                placeholder="Leave a message of support (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                maxLength={240}
                className="mt-4 w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              />
              <p className="mt-1 text-right text-[11px] text-neutral-400">
                {comment.length}/240
              </p>
            </div>

            <div className="rounded-xl bg-neutral-50 px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-neutral-600">
                  Your donation
                </span>
                <span className="text-2xl font-extrabold tracking-tight text-neutral-900">
                  {fmt(effective)} <span className="text-sm font-bold text-neutral-500">{currency}</span>
                </span>
              </div>
              {isIntl && (
                <p className="mt-1 text-[11px] text-neutral-500">
                  ≈ {fmtFCFA(Math.round(effective * USD_RATE))} FCFA at today&apos;s rate
                </p>
              )}
              <p className="mt-1 text-xs text-neutral-500">
                {frequency === "monthly" ? "Billed monthly until cancelled." : "One-time donation."}
              </p>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#02a95c] py-4 text-base font-extrabold text-white shadow-sm transition hover:bg-[#028f4e] active:scale-[0.99]"
            >
              <Heart className="size-4 fill-white" />
              {isPayPal ? "Continue to PayPal" : isCard ? "Pay with card" : "Donate now"}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
              <Lock className="size-3" />
              Secure checkout · Powered by {isCard ? "Stripe" : isPayPal ? "PayPal" : "MTN MoMo & Orange Money"}
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#02a95c]" />
              <p className="text-xs leading-relaxed text-neutral-600">
                <span className="font-bold text-neutral-900">Donation protected.</span>{" "}
                Funds are released directly to the medical provider and care committee.
                If anything goes wrong, the HHP committee will refund your contribution.
              </p>
            </div>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} givehope · Hosted for the HHP community committee
        </p>
      </main>
    </div>
  );
}
