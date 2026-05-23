import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Heart, Plus, TrendingUp, Users, ExternalLink, MegaphoneIcon,
  Trash2, LogOut, ChevronDown, Calendar, MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { deleteCampaign, fmtFCFA, postUpdate, useMyCampaigns } from "@/lib/campaigns";
import { signOut, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — givehope" },
      { name: "description", content: "Manage your fundraisers, donations, and updates." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const user = useAuth();
  const navigate = useNavigate();
  const myCampaigns = useMyCampaigns(user?.id);

  // Redirect after mount if not logged in (avoid SSR mismatch)
  useEffect(() => {
    if (user === null) navigate({ to: "/login" });
  }, [user, navigate]);

  const stats = useMemo(() => {
    const totalRaised = myCampaigns.reduce((s, c) => s + c.raised, 0);
    const totalGoal = myCampaigns.reduce((s, c) => s + c.goal, 0);
    const totalDonors = myCampaigns.reduce((s, c) => s + c.donors.length, 0);
    return { totalRaised, totalGoal, totalDonors, count: myCampaigns.length };
  }, [myCampaigns]);

  const recentDonations = useMemo(() => {
    return myCampaigns
      .flatMap((c) => c.donors.map((d) => ({ ...d, campaign: c.title, slug: c.slug })))
      .slice(0, 10);
  }, [myCampaigns]);

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f3f3f1] px-4">
        <p className="text-sm text-neutral-500">Redirecting to sign in…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f1] text-neutral-900">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="grid size-7 place-items-center rounded-full bg-[#02a95c]">
              <Heart className="size-3.5 fill-white text-white" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">givehope</span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/start"
              className="hidden items-center gap-1.5 rounded-full bg-[#02a95c] px-4 py-1.5 text-sm font-extrabold text-white transition hover:bg-[#028f4e] sm:inline-flex"
            >
              <Plus className="size-3.5" /> New fundraiser
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#02a95c]">Dashboard</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Hi {user.name.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-neutral-600">Here's how your fundraisers are doing.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Fundraisers" value={String(stats.count)} />
          <StatCard label="Raised" value={`${fmtFCFA(stats.totalRaised)} FCFA`} />
          <StatCard label="Goal" value={`${fmtFCFA(stats.totalGoal)} FCFA`} />
          <StatCard label="Donors" value={String(stats.totalDonors)} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Campaigns list */}
          <section className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-extrabold">Your fundraisers</h2>
              <Link to="/start" className="inline-flex items-center gap-1 text-sm font-bold text-[#02a95c] hover:underline sm:hidden">
                <Plus className="size-3.5" /> New
              </Link>
            </div>

            {myCampaigns.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
                <p className="text-base font-bold">You don't have any fundraisers yet</p>
                <p className="mt-1 text-sm text-neutral-600">Launch one in under 2 minutes.</p>
                <Link
                  to="/start"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#02a95c] px-5 py-2.5 text-sm font-extrabold text-white"
                >
                  <Plus className="size-4" /> Start a fundraiser
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myCampaigns.map((c) => (
                  <CampaignRow key={c.slug} campaign={c} />
                ))}
              </div>
            )}
          </section>

          {/* Recent donations */}
          <aside className="lg:col-span-1">
            <h2 className="mb-4 text-xl font-extrabold">Recent donations</h2>
            {recentDonations.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center text-sm text-neutral-500">
                No donations yet.
              </div>
            ) : (
              <ul className="divide-y divide-neutral-100 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                {recentDonations.map((d, i) => (
                  <li key={i} className="flex items-center gap-3 px-4 py-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#c2f17a] text-sm font-extrabold text-neutral-900">
                      {d.avatar}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{d.name}</p>
                      <p className="truncate text-[11px] text-neutral-500">{d.campaign}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-[#02a95c]">{fmtFCFA(d.amount)}</p>
                      <p className="text-[10px] text-neutral-400">{d.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-1 truncate text-xl font-extrabold sm:text-2xl">{value}</p>
    </div>
  );
}

function CampaignRow({ campaign }: { campaign: ReturnType<typeof useMyCampaigns>[number] }) {
  const [open, setOpen] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");
  const percent = Math.min(100, (campaign.raised / campaign.goal) * 100);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateTitle.trim().length < 3 || updateBody.trim().length < 10) {
      toast.error("Add a short title and a few details.");
      return;
    }
    postUpdate(campaign.slug, updateTitle, updateBody);
    setUpdateTitle("");
    setUpdateBody("");
    toast.success("Update posted!");
  };

  const handleDelete = () => {
    if (!confirm(`Delete "${campaign.title}"? This can't be undone.`)) return;
    deleteCampaign(campaign.slug);
    toast.success("Fundraiser deleted.");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-start gap-4 p-4 sm:p-5">
        <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#02a95c] to-[#016e3d] text-2xl font-black text-white/40">
          {campaign.title.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-neutral-700">
                {campaign.category}
              </span>
              <h3 className="mt-1 line-clamp-1 text-base font-extrabold">{campaign.title}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-neutral-500">
                <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {campaign.location}</span>
                <span className="inline-flex items-center gap-1"><Users className="size-3" /> {campaign.donors.length} donors</span>
                <span className="inline-flex items-center gap-1"><Calendar className="size-3" /> {campaign.updates.length} updates</span>
              </div>
            </div>
            <Link
              to="/c/$slug"
              params={{ slug: campaign.slug }}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-700 transition hover:bg-neutral-50"
            >
              View <ExternalLink className="size-3" />
            </Link>
          </div>

          <div className="mt-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full rounded-full bg-[#02a95c]" style={{ width: `${percent}%` }} />
            </div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <span className="text-sm font-extrabold">{fmtFCFA(campaign.raised)} FCFA</span>
              <span className="text-[11px] font-semibold text-neutral-500">
                {Math.round(percent)}% of {fmtFCFA(campaign.goal)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-100 bg-neutral-50/60 px-4 py-2 sm:px-5">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-2 py-2 text-xs font-bold text-neutral-700 hover:text-neutral-900"
        >
          <span className="inline-flex items-center gap-1.5">
            <MegaphoneIcon className="size-3.5" /> Post an update · Manage
          </span>
          <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="space-y-4 pb-4">
            <form onSubmit={handlePost} className="space-y-2 rounded-xl border border-neutral-200 bg-white p-3">
              <input
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
                placeholder="Update title"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-900"
                maxLength={80}
              />
              <textarea
                value={updateBody}
                onChange={(e) => setUpdateBody(e.target.value)}
                placeholder="Share progress with your donors…"
                rows={3}
                maxLength={500}
                className="w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-900"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-400">{updateBody.length}/500</span>
                <button
                  type="submit"
                  className="rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-extrabold text-white hover:bg-neutral-700"
                >
                  Post update
                </button>
              </div>
            </form>

            {campaign.updates.length > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-500">Recent updates</p>
                {campaign.updates.slice(0, 3).map((u, i) => (
                  <div key={i} className="rounded-lg border border-neutral-200 bg-white px-3 py-2">
                    <p className="text-xs font-extrabold">{u.title}</p>
                    <p className="text-[11px] text-neutral-500">{u.date}</p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
            >
              <Trash2 className="size-3.5" /> Delete fundraiser
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function UserMenu() {
  const user = useAuth();
  const navigate = useNavigate();
  if (!user) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-right sm:block">
        <span className="block text-xs font-bold leading-tight">{user.name}</span>
        <span className="block text-[10px] text-neutral-500 leading-tight">{user.email}</span>
      </span>
      <span className="grid size-9 place-items-center rounded-full bg-[#02a95c] text-sm font-extrabold text-white">
        {user.avatar}
      </span>
      <button
        onClick={() => { signOut(); toast.success("Signed out"); navigate({ to: "/" }); }}
        className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-2.5 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
        title="Sign out"
      >
        <LogOut className="size-3.5" />
      </button>
    </div>
  );
}
