import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { signIn, signInAsDemo, signUp } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — givehope" },
      { name: "description", content: "Sign in to manage your fundraisers." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(undefined);
    const res = mode === "signin" ? signIn(email) : signUp(name, email);
    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    toast.success(`Welcome${mode === "signup" ? "" : " back"}, ${res.user.name.split(" ")[0]}!`);
    navigate({ to: "/dashboard" });
  };

  const handleDemo = () => {
    signInAsDemo();
    toast.success("Signed in as demo organizer");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#f3f3f1] text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="grid size-7 place-items-center rounded-full bg-[#02a95c]">
              <Heart className="size-3.5 fill-white text-white" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">givehope</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-md gap-6 px-4 py-12 sm:px-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            {mode === "signin"
              ? "Sign in to manage your fundraisers."
              : "Start a fundraiser and track your impact."}
          </p>
        </div>

        <button
          onClick={handleDemo}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#02a95c] bg-[#eaf9ef] px-4 py-3 text-sm font-bold text-[#02a95c] transition hover:bg-[#dff4e7]"
        >
          <Sparkles className="size-4" /> Try the demo account
        </button>
        <p className="-mt-3 text-center text-[11px] text-neutral-500">
          Comes pre‑loaded with 4 active fundraisers so you can explore the dashboard.
        </p>

        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
          <span className="h-px flex-1 bg-neutral-200" /> or <span className="h-px flex-1 bg-neutral-200" />
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          {mode === "signup" && (
            <div>
              <label className="mb-1.5 block text-sm font-bold">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Marie Ngono"
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-bold">Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
            />
          </div>
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-[#02a95c] py-3 text-sm font-extrabold text-white transition hover:bg-[#028f4e] disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <p className="text-center text-xs text-neutral-500">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(undefined); }}
              className="font-bold text-[#02a95c] hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </form>

        <p className="text-center text-[11px] text-neutral-400">
          Demo only — no real password required. Data is stored in your browser.
        </p>
      </main>
    </div>
  );
}
