"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CalendarDays, Heart, MapPin, Star } from "lucide-react";
import { discount, inr, packageImage, type Pkg } from "@/lib/data";

export default function PackageCard({ pkg }: { pkg: Pkg }) {
  const [liked, setLiked] = useState(false);
  const href = `/tour-packages/${pkg.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="zoom-img relative aspect-[16/10.5] overflow-hidden">
        <Image
          src={packageImage(pkg)}
          alt={`${pkg.title}: ${pkg.places.join(", ")}`}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 25vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        {pkg.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-saffron-500 px-3 py-1 text-xs font-semibold text-white shadow">
            {pkg.badge}
          </span>
        )}
        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setLiked((v) => !v)}
          className={`absolute z-10 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/40 ${pkg.badge ? "left-3 top-3" : "right-3 top-3"}`}
        >
          <Heart size={18} className={liked ? "fill-saffron-500 text-saffron-500" : ""} />
        </button>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink">
          <Star size={13} className="fill-amber-500 text-amber-500" /> {pkg.rating}
          <span className="font-normal text-slate-500">({pkg.reviews.toLocaleString("en-IN")})</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold leading-snug text-ink">
          <Link href={href} className="after:absolute after:inset-0 hover:text-navy-600">
            {pkg.title}
          </Link>
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-slate-600">
          <MapPin size={14} className="shrink-0 text-navy-500" />
          <span className="truncate">{pkg.places.join(" • ")}</span>
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-slate-600">
          <CalendarDays size={14} className="shrink-0 text-navy-500" />
          {pkg.days} Days / {pkg.nights} Nights
        </p>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <span className="font-display text-xl font-bold text-ink">{inr(pkg.price)}</span>
          <span className="text-xs text-slate-400 line-through">{inr(pkg.oldPrice)}</span>
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            {discount(pkg)}% OFF
          </span>
          <span className="relative ml-auto grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-navy-700 transition group-hover:border-saffron-500 group-hover:bg-saffron-500 group-hover:text-white">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}
