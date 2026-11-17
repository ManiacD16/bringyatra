"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Carousel from "../Carousel";
import PackageCard from "../PackageCard";
import { byCategory, interests, regions, type CategorySlug, type Region } from "@/lib/data";
import { img } from "@/lib/images";

const pill = (active: boolean) =>
  `shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-all ${
    active ? "border-saffron-500 bg-saffron-500 text-white shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-saffron-300 hover:text-saffron-600"
  }`;

/** "Explore Top Destinations by Region": underline tabs + mosaic grid. */
export function RegionTabs() {
  const names = Object.keys(regions) as Region[];
  const [active, setActive] = useState<Region>(names[0]);
  const list = regions[active].slice(0, 5);

  return (
    <div>
      <div className="no-scrollbar mb-8 flex gap-6 overflow-x-auto border-b border-slate-200" role="tablist">
        {names.map((n) => (
          <button
            key={n}
            role="tab"
            aria-selected={n === active}
            onClick={() => setActive(n)}
            className={`relative shrink-0 pb-3 text-sm font-semibold transition sm:text-[15px] ${n === active ? "text-navy-700" : "text-slate-500 hover:text-ink"}`}
          >
            {n}
            <span className={`absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-saffron-500 transition-transform duration-300 ${n === active ? "scale-x-100" : "scale-x-0"}`} />
          </button>
        ))}
      </div>

      <div key={active} className="grid animate-[fadeIn_.6s_ease] grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
        {list.map((d, idx) => (
          <Link
            key={d.name}
            href={`/tour-packages?q=${encodeURIComponent(d.name)}`}
            className={`group zoom-img relative overflow-hidden rounded-2xl ${idx === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3.4]"}`}
          >
            <Image src={img(d.image, idx === 0 ? 1200 : 700)} alt={d.name} fill sizes={idx === 0 ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-0 p-4 text-white sm:p-5">
              <h3 className={`font-semibold ${idx === 0 ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"}`}>{d.name}</h3>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-amber-400">{d.count} Packages</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** "Packages by Interest": pill tabs + package carousel. */
export function InterestTabs() {
  const [active, setActive] = useState<CategorySlug>(interests[0].slug);
  const list = byCategory(active);

  return (
    <div>
      <div className="no-scrollbar mb-8 flex gap-2.5 overflow-x-auto pb-1" role="tablist">
        {interests.map((i) => (
          <button key={i.slug} role="tab" aria-selected={i.slug === active} className={pill(i.slug === active)} onClick={() => setActive(i.slug)}>
            {i.label}
          </button>
        ))}
      </div>
      <div key={active} className="animate-[fadeIn_.6s_ease]">
        <Carousel>
          {list.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
