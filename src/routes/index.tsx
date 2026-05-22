import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart,
  Share2,
  Copy,
  Check,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  ShieldCheck,
  Lock,
  ChevronRight,
  MessageSquare,
  Flag,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Help Philip recover from surgery — givehope" },
      {
        name: "description",
        content:
          "Philip needs our help. Join the Hands & Hearts for Philip community to support his medical recovery.",
      },
      {
        property: "og:title",
        content: "Help Philip recover from surgery — givehope",
      },
      {
        property: "og:description",
        content:
          "Philip needs our help. Join the Hands & Hearts for Philip community to support his medical recovery.",
      },
    ],
  }),
  component: Landing,
});

const GOAL = 2_000_000;
const RAISED = 500;

const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

const RECENT_DONORS = [
  { name: "Sarah M.", amount: 50_000, time: "2 hours ago", avatar: "S" },
  { name: "John K.", amount: 25_000, time: "5 hours ago", avatar: "J" },
  { name: "Anonymous", amount: 10_000, time: "1 day ago", avatar: "?" },
  { name: "Maria L.", amount: 5_000, time: "2 days ago", avatar: "M" },
  { name: "David P.", amount: 100_000, time: "3 days ago", avatar: "D" },
];

function Landing() {
  const [copied, setCopied] = useState(false);
  const [showAllDonors, setShowAllDonors] = useState(false);

  const percent = Math.min(100, (RAISED / GOAL) * 100);
  const remaining = Math.max(0, GOAL - RAISED);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Help Philip recover from surgery",
          text: "Join me in supporting Philip's medical recovery.",
          url,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f1] text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="grid size-7 place-items-center rounded-full bg-[#02a95c]">
              <Heart className="size-3.5 fill-white text-white" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-neutral-900">
              givehope
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-[#02a95c]" /> Copied
                </>
              ) : (
                <>
                  <Share2 className="size-3.5" /> Share
                </>
              )}
            </button>
            <Link
              to="/donate"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#02a95c] px-4 py-1.5 text-sm font-extrabold text-white transition hover:bg-[#028f4e]"
            >
              <Heart className="size-3.5 fill-white" /> Donate
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Hero image */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10] bg-neutral-100">
                <img
                  src="/src/assets/philip-hero.jpg"
                  alt="Philip with family"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="flex h-full w-full items-center justify-center text-neutral-400 text-sm font-medium">Fundraiser image</div>`;
                    }
                  }}
                />
              </div>
              <div className="px-5 py-5 sm:px-8 sm:py-6">
                <h1 className="text-2xl font-extrabold leading-snug tracking-tight text-neutral-900 sm:text-3xl">
                  Help Philip recover from surgery and get back on his feet
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
                  <span className="inline-flex items-center gap-1">
                    <Users className="size-4" /> Hands &amp; Hearts for Philip (HHP)
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-4" /> Douala, Cameroon
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-4" /> Created 2 weeks ago
                  </span>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="px-5 py-6 sm:px-8">
                <h2 className="text-lg font-extrabold text-neutral-900">Story</h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-neutral-700">
                  <p>
                    Philip is a beloved member of our community who recently underwent
                    emergency surgery. He is currently recovering and needs ongoing medical
                    care, medication, and rehabilitation support.
                  </p>
                  <p>
                    The Hands &amp; Hearts for Philip (HHP) committee was formed by family,
                    friends, and community members who want to rally around Philip during this
                    difficult time. Every contribution, no matter how small, brings us closer
                    to covering his medical bills and supporting his family.
                  </p>
                  <p>
                    Your generosity means the world to us. Thank you for being part of Philip&apos;s
                    recovery journey.
                  </p>
                </di