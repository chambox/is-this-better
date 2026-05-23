import { useEffect, useState } from "react";
import { DEMO_USER, getCurrentUser } from "./auth";

export type CampaignUpdate = { date: string; title: string; body: string };
export type CampaignDonor = { name: string; amount: number; time: string; avatar: string };

export type Campaign = {
  slug: string;
  title: string;
  story: string;
  goal: number; // FCFA
  raised: number; // FCFA
  organizer: string;
  ownerId: string; // user id of the creator
  location: string;
  category: string;
  image: string; // URL (optional)
  createdAt: string; // ISO
  updates: CampaignUpdate[];
  donors: CampaignDonor[];
};

const STORAGE_KEY = "givehope:campaigns:v2";

const SEED: Campaign[] = [
  {
    slug: "philip-recovery",
    title: "Help Philip recover from surgery and get back on his feet",
    story:
      "Philip is a beloved member of our community who recently underwent emergency surgery. He is currently recovering and needs ongoing medical care, medication, and rehabilitation support.\n\nThe Hands & Hearts for Philip (HHP) committee was formed by family, friends, and community members who want to rally around Philip during this difficult time. Every contribution, no matter how small, brings us closer to covering his medical bills and supporting his family.\n\nYour generosity means the world to us. Thank you for being part of Philip's recovery journey.",
    goal: 2_000_000,
    raised: 500,
    organizer: "Hands & Hearts for Philip (HHP)",
    ownerId: DEMO_USER.id,
    location: "Douala, Cameroon",
    category: "Medical",
    image: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    updates: [
      { date: "3 days ago", title: "Philip is responding well to treatment", body: "The doctors are optimistic about his recovery timeline. Physical therapy starts next week. Thank you all for the incredible support!" },
      { date: "1 week ago", title: "Surgery successful — recovery begins", body: "Philip came out of surgery stable. The medical team is monitoring him closely as we begin the recovery process." },
      { date: "2 weeks ago", title: "Fundraiser launched by the HHP committee", body: "We've come together as family and friends to make sure Philip gets the care he needs. Every gift counts." },
    ],
    donors: [
      { name: "Sarah M.", amount: 50_000, time: "2 hours ago", avatar: "S" },
      { name: "John K.", amount: 25_000, time: "5 hours ago", avatar: "J" },
      { name: "Anonymous", amount: 10_000, time: "1 day ago", avatar: "?" },
      { name: "Maria L.", amount: 5_000, time: "2 days ago", avatar: "M" },
      { name: "David P.", amount: 100_000, time: "3 days ago", avatar: "D" },
    ],
  },
  {
    slug: "amina-school-fees",
    title: "Send Amina back to school this year",
    story:
      "Amina is a brilliant 14-year-old who lost both parents last year. Her aunt is doing everything she can, but school fees, uniforms, and books are out of reach. Help us keep her in the classroom.",
    goal: 450_000,
    raised: 187_000,
    organizer: "Friends of Amina",
    ownerId: DEMO_USER.id,
    location: "Yaoundé, Cameroon",
    category: "Education",
    image: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    updates: [
      { date: "2 days ago", title: "Uniforms and books paid for!", body: "Thanks to your gifts we covered uniforms and the full book list. Now working on the tuition balance." },
    ],
    donors: [
      { name: "Anonymous", amount: 20_000, time: "1 day ago", avatar: "?" },
      { name: "Grace T.", amount: 15_000, time: "3 days ago", avatar: "G" },
      { name: "Marc B.", amount: 50_000, time: "5 days ago", avatar: "M" },
    ],
  },
  {
    slug: "kribi-flood-relief",
    title: "Emergency relief for families displaced by Kribi floods",
    story:
      "Last week's floods displaced over 200 families along the coast. We're raising funds for shelter, clean water, and basic supplies for the most affected households.",
    goal: 5_000_000,
    raised: 1_240_000,
    organizer: "Coastal Community Network",
    ownerId: DEMO_USER.id,
    location: "Kribi, Cameroon",
    category: "Emergency",
    image: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updates: [
      { date: "1 day ago", title: "First 40 families received supplies", body: "Mattresses, blankets, and a 2-week food package distributed today. More to come." },
    ],
    donors: [
      { name: "Anonymous", amount: 100_000, time: "4 hours ago", avatar: "?" },
      { name: "Paul N.", amount: 250_000, time: "2 days ago", avatar: "P" },
    ],
  },
  {
    slug: "boys-football-tournament",
    title: "Send our boys' team to the regional football tournament",
    story:
      "Our under-15 team qualified for the regional finals in Bafoussam. We need help with transport, lodging, and kits for 22 players and coaches.",
    goal: 800_000,
    raised: 312_000,
    organizer: "FC Espoir Douala",
    ownerId: DEMO_USER.id,
    location: "Douala, Cameroon",
    category: "Sports",
    image: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updates: [],
    donors: [
      { name: "Anonymous", amount: 30_000, time: "1 day ago", avatar: "?" },
      { name: "Coach Eric", amount: 50_000, time: "2 days ago", avatar: "E" },
    ],
  },
];

export const CATEGORIES = ["Medical", "Education", "Emergency", "Sports", "Community", "Memorial", "Other"] as const;

let cache: Campaign[] | null = null;
const listeners = new Set<() => void>();

function load(): Campaign[] {
  if (cache) return cache;
  if (typeof window === "undefined") {
    cache = SEED;
    return cache;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Campaign[];
      // Merge in any new seeds the user doesn't have yet (by slug)
      const have = new Set(parsed.map((c) => c.slug));
      const merged = [...parsed, ...SEED.filter((s) => !have.has(s.slug))];
      cache = merged;
      return cache;
    }
  } catch {
    /* ignore */
  }
  cache = SEED;
  persist();
  return cache;
}

function persist() {
  if (typeof window === "undefined" || !cache) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    /* ignore */
  }
}

function emit() {
  listeners.forEach((l) => l());
}

export function listCampaigns(): Campaign[] {
  return load();
}

export function getCampaign(slug: string): Campaign | undefined {
  return load().find((c) => c.slug === slug);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || `campaign-${Date.now()}`;
}

export function createCampaign(input: {
  title: string;
  story: string;
  goal: number;
  organizer: string;
  location: string;
  category: string;
  image?: string;
}): Campaign {
  const all = load();
  let slug = slugify(input.title);
  let n = 2;
  while (all.some((c) => c.slug === slug)) {
    slug = `${slugify(input.title)}-${n++}`;
  }
  const c: Campaign = {
    slug,
    title: input.title.trim(),
    story: input.story.trim(),
    goal: input.goal,
    raised: 0,
    organizer: input.organizer.trim(),
    ownerId: getCurrentUser()?.id ?? "anon",
    location: input.location.trim(),
    category: input.category,
    image: input.image?.trim() || "",
    createdAt: new Date().toISOString(),
    updates: [],
    donors: [],
  };
  cache = [c, ...all];
  persist();
  emit();
  return c;
}

export function addDonation(slug: string, amountFCFA: number, donorName: string | undefined): void {
  const all = load();
  const idx = all.findIndex((c) => c.slug === slug);
  if (idx < 0) return;
  const updated: Campaign = {
    ...all[idx],
    raised: all[idx].raised + amountFCFA,
    donors: [
      {
        name: donorName?.trim() || "Anonymous",
        amount: amountFCFA,
        time: "just now",
        avatar: (donorName?.trim()?.[0] || "?").toUpperCase(),
      },
      ...all[idx].donors,
    ].slice(0, 50),
  };
  cache = [...all.slice(0, idx), updated, ...all.slice(idx + 1)];
  persist();
  emit();
}

export function useCampaigns(): Campaign[] {
  const [, setTick] = useState(0);
  useEffect(() => {
    const l = () => setTick((t) => t + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return load();
}

export function useCampaign(slug: string): Campaign | undefined {
  const all = useCampaigns();
  return all.find((c) => c.slug === slug);
}

export const fmtFCFA = (n: number) => new Intl.NumberFormat("fr-FR").format(n);
