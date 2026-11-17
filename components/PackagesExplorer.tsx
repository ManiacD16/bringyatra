"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import PackageCard from "./PackageCard";
import { packages, type CategorySlug, type Pkg } from "@/lib/data";

const categories: { slug: CategorySlug | "all"; label: string }[] = [
  { slug: "all", label: "All Packages" },
  { slug: "odisha", label: "Odisha Special" },
  { slug: "weekend", label: "Weekend Getaways" },
  { slug: "family", label: "Family" },
  { slug: "honeymoon", label: "Honeymoon" },
  { slug: "pilgrimage", label: "Pilgrimage" },
  { slug: "group", label: "Group Tours" },
  { slug: "hill-station", label: "Hill Stations" },
  { slug: "beach", label: "Beach" },
  { slug: "heritage", label: "Heritage" },
  { slug: "adventure", label: "Adventure" },
];

const regions = ["All", "North", "South", "East", "West"] as const;
const durations = [
  { id: "any", label: "Any duration", test: () => true },
  { id: "short", label: "Up to 4 days", test: (p: Pkg) => p.days <= 4 },
  { id: "mid", label: "5 – 7 days", test: (p: Pkg) => p.days >= 5 && p.days <= 7 },
  { id: "long", label: "8+ days", test: (p: Pkg) => p.days >= 8 },
];
const sorts = { popular: "Most Popular", low: "Price: Low to High", high: "Price: High to Low", rating: "Top Rated" } as const;

export default function PackagesExplorer({ lockCategory }: { lockCategory?: CategorySlug }) {
  const router = useRouter();
  const params = useSearchParams();

  const category = (lockCategory ?? params.get("category") ?? "all") as CategorySlug | "all";
  const region = params.get("region") ?? "All";
  const duration = params.get("duration") ?? "any";
  const sort = (params.get("sort") ?? "popular") as keyof typeof sorts;
  const q = params.get("q") ?? "";

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === "" || value === "all" || value === "All" || value === "any") next.delete(key);
    else next.set(key, value);
    router.replace(`?${next.toString()}`, { scroll: false });
  };

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const durTest = durations.find((d) => d.id === duration)?.test ?? (() => true);
    const out = packages.filter(
      (p) =>
        (category === "all" || p.categories.includes(category)) &&
        (region === "All" || p.region === region) &&
        durTest(p) &&
        (!needle || [p.title, p.subtitle, ...p.places].join(" ").toLowerCase().includes(needle)),
    );
    if (sort === "low") out.sort((a, b) => a.price - b.price);
    if (sort === "high") out.sort((a, b) => b.price - a.price);
    if (sort === "rating") out.sort((a, b) => b.rating - a.rating);
    if (sort === "popular") out.sort((a, b) => b.reviews - a.reviews);
    return out;
  }, [category, region, duration, sort, q]);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
      active ? "border-navy-700 bg-navy-700 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-navy-300"
    }`;

  return (
    <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
      <aside className="h-fit space-y-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-card lg:sticky lg:top-28">
        <p className="flex items-center gap-2 font-semibold text-ink">
          <SlidersHorizontal size={18} className="text-saffron-500" /> Filters
        </p>
        <label className="relative block">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="field pl-10"
            placeholder="Search destination"
            defaultValue={q}
            key={q}
            onKeyDown={(e) => e.key === "Enter" && set("q", (e.target as HTMLInputElement).value)}
            onBlur={(e) => e.target.value !== q && set("q", e.target.value)}
            aria-label="Search destination"
          />
        </label>
        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Region</p>
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button key={r} className={chip(region === r)} onClick={() => set("region", r)}>
                {r === "All" ? "All India" : `${r}`}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Duration</p>
          <div className="space-y-2">
            {durations.map((d) => (
              <label key={d.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
                <input type="radio" name="duration" className="h-4 w-4 accent-saffron-500" checked={duration === d.id} onChange={() => set("duration", d.id)} />
                {d.label}
              </label>
            ))}
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        {!lockCategory && (
          <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button key={c.slug} className={chip(category === c.slug)} onClick={() => set("category", c.slug)}>
                {c.label}
              </button>
            ))}
          </div>
        )}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-ink">{list.length}</span> packages
            {q && (
              <button onClick={() => set("q", null)} className="ml-2 inline-flex items-center gap-1 rounded-full bg-saffron-50 px-2.5 py-1 text-xs font-medium text-saffron-700">
                “{q}” <X size={12} />
              </button>
            )}
          </p>
          <select className="field w-auto py-2" value={sort} onChange={(e) => set("sort", e.target.value === "popular" ? null : e.target.value)} aria-label="Sort by">
            {Object.entries(sorts).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        {list.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p, i) => (
              <div key={p.slug} className="animate-[fadeIn_.6s_ease_both]" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
                <PackageCard pkg={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <p className="text-lg font-semibold text-ink">No packages match these filters</p>
            <p className="mt-1 text-sm text-slate-600">Try another region or duration, or ask us for a custom itinerary.</p>
            <button className="btn-outline mt-5" onClick={() => router.replace("?", { scroll: false })}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
