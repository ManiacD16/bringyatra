"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SearchWidget from "../SearchWidget";
import { img, type ImageKey } from "@/lib/images";

const slides: { image: ImageKey; caption: string }[] = [
  { image: "coupleMountain", caption: "Himalayan Escapes" },
  { image: "kashmir", caption: "Kashmir · Paradise on Earth" },
  { image: "konarkWheel", caption: "Konark Sun Temple · Odisha" },
  { image: "keralaHouseboat", caption: "Kerala Backwaters" },
];

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative">
      {/* Background slideshow with Ken Burns zoom */}
      <div className="absolute inset-0 overflow-hidden bg-navy-900 md:bottom-[150px] xl:bottom-[110px]">
        {slides.map((s, idx) => (
          <div key={s.image} className={`absolute inset-0 transition-opacity duration-[1600ms] ${idx === i ? "opacity-100" : "opacity-0"}`}>
            <Image
              src={img(s.image, 2000)}
              alt={s.caption}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover ${idx === i ? "animate-kenburns" : ""}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-900/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-navy-950/20" />
      </div>

      <div className="container relative pb-10 pt-14 sm:pt-20 lg:pt-24">
        <div className="max-w-4xl text-white">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur animate-floaty">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" /> {slides[i].caption}
          </p>
          <h1 className="text-[2.6rem] font-bold leading-[1.08] tracking-tight drop-shadow-lg sm:text-6xl lg:text-7xl">
            Explore India <span className="bg-gradient-to-r from-amber-400 to-saffron-400 bg-clip-text pe-[0.15em] italic text-transparent [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">&amp; Beyond</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/90 sm:text-xl">
            Discover handpicked destinations, amazing deals and unforgettable experiences.
          </p>
          <span className="mt-6 block h-1 w-16 rounded-full bg-amber-500" />
        </div>

        <div className="mt-6 flex gap-2" aria-label="Slides">
          {slides.map((s, idx) => (
            <button
              key={s.image}
              aria-label={`Show ${s.caption}`}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === i ? "w-10 bg-amber-400" : "w-4 bg-white/50 hover:bg-white"}`}
            />
          ))}
        </div>

        <div className="mt-10 sm:mt-14">
          <SearchWidget />
        </div>
      </div>
    </section>
  );
}
