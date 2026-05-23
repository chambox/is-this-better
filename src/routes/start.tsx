import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES, createCampaign } from "@/lib/campaigns";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start a fundraiser — givehope" },
      { name: "description", content: "Launch your fundraiser in minutes. Tell your story, set a goal, and start receiving support." },
    ],
  }),
  component: StartPage,
});

type Errors = Partial<Record<"title" | "story" | "goal" | "organizer" | "location" | "category", string>>;

function StartPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [goal, setGoal] = useState<string>("");
  const [organizer, setOrganizer] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<string>("Medical");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (title.trim().length < 8) next.title = "Give it a clear title (at least 8 characters).";
    if (story.trim().length < 40) next.story = "Tell donors more about who and why (at least 40 characters).";
    const goalNum = Number(goal.replace(/[^0-9]/g, ""));
    if (!goalNum || goalNum < 10_000) next.goal = "Set a goal of at least 10,000 FCFA.";
    if (!organizer.trim()) next.organizer = "Who is organizing this?";
    if (!location.trim()) next.location = "Add a city or region.";
    if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) next.category = "Pick a category.";

    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    const c = createCampaign({
      title: title.trim(),
      story: story.trim(),
      goal: goalNum,
      organizer: organizer.trim(),
      location: location.trim(),
      category,
      image: image.trim() || undefined,
    });
    toast.success("Fundraiser created!");
    setTimeout(() => navigate({ to: "/c/$slug", params: { slug: c.slug } }), 300);
  };

  const errClass = (has: boolean) =>
    has ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-neutral-200 focus:border-neutral-900 focus:ring-neutral-900";

  return (
    <div className="min-h-screen bg-[#f3f3f1] text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-neutral-900">
            <ChevronLeft className="size-4" /> Browse
          </Link>
          <Link to="/" className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            <span className="grid size-7 place-items-center rounded-full bg-[#02a95c]">
              <Heart className="size-3.5 fill-white text-white" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">givehope</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-[#c2f17a]">
            <Sparkles className="size-5 text-neutral-900" />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Start a fundraiser</h1>
            <p className="text-sm text-neutral-600">Takes about 2 minutes. You can edit anything later.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <label className="mb-2 block text-base font-bold">Title</label>
            <input
              type="text"
              maxLength={120}
              value={title}
              onChange={(e) => { setTitle(e.target.value); if (errors.title) setErrors((er) => ({ ...er, title: undefined })); }}
              placeholder="e.g. Help Amina go back to school"
              className={`w-full rounded-xl border bg-white px-4 py-3 text-base outline-none transition focus:ring-2 ${errClass(!!errors.title)}`}
            />
            {errors.title && <p className="mt-2 text-xs font-semibold text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="mb-2 block text-base font-bold">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                      active ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-base font-bold">Your story</label>
            <textarea
              rows={6}
              value={story}
              maxLength={3000}
              onChange={(e) => { setStory(e.target.value); if (errors.story) setErrors((er) => ({ ...er, story: undefined })); }}
              placeholder="Who is this for? What happened? How will the funds be used?"
              className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${errClass(!!errors.story)}`}
            />
            <div className="mt-1 flex items-center justify-between">
              {errors.story ? <p className="text-xs font-semibold text-red-600">{errors.story}</p> : <span />}
              <p className="text-[11px] text-neutral-400">{story.length}/3000</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-base font-bold">Goal (FCFA)</label>
              <div className={`flex items-stretch overflow-hidden rounded-xl border transition focus-within:ring-2 ${errClass(!!errors.goal)}`}>
                <span className="grid place-items-center bg-neutral-50 px-3 text-sm font-bold text-neutral-700">FCFA</span>
                <input
                  inputMode="numeric"
                  value={goal}
                  onChange={(e) => { setGoal(e.target.value.replace(/[^0-9]/g, "")); if (errors.goal) setErrors((er) => ({ ...er, goal: undefined })); }}
                  placeholder="500000"
                  className="flex-1 bg-white px-3 py-3 text-base outline-none placeholder:text-neutral-300"
                />
              </div>
              {errors.goal && <p className="mt-2 text-xs font-semibold text-red-600">{errors.goal}</p>}
            </div>
            <div>
              <label className="mb-2 block text-base font-bold">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => { setLocation(e.target.value); if (errors.location) setErrors((er) => ({ ...er, location: undefined })); }}
                placeholder="Douala, Cameroon"
                className={`w-full rounded-xl border bg-white px-4 py-3 text-base outline-none transition focus:ring-2 ${errClass(!!errors.location)}`}
              />
              {errors.location && <p className="mt-2 text-xs font-semibold text-red-600">{errors.location}</p>}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-base font-bold">Organizer name</label>
            <input
              type="text"
              value={organizer}
              onChange={(e) => { setOrganizer(e.target.value); if (errors.organizer) setErrors((er) => ({ ...er, organizer: undefined })); }}
              placeholder="Your name, family, or committee"
              className={`w-full rounded-xl border bg-white px-4 py-3 text-base outline-none transition focus:ring-2 ${errClass(!!errors.organizer)}`}
            />
            {errors.organizer && <p className="mt-2 text-xs font-semibold text-red-600">{errors.organizer}</p>}
          </div>

          <div>
            <label className="mb-2 block text-base font-bold">
              Cover image URL <span className="text-xs font-normal text-neutral-500">(optional)</span>
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://…"
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
            />
            <p className="mt-1 text-xs text-neutral-500">A face or a place makes a fundraiser feel real. You can add this later.</p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#02a95c] py-4 text-base font-extrabold text-white shadow-sm transition hover:bg-[#028f4e] active:scale-[0.99] disabled:opacity-60"
          >
            <Heart className="size-4 fill-white" /> {submitting ? "Creating…" : "Publish fundraiser"}
          </button>

          <p className="text-center text-xs text-neutral-500">
            This is a demo platform — fundraisers are stored locally in your browser.
          </p>
        </form>
      </main>
    </div>
  );
}
