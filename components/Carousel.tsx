"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Tailwind width classes for each slide. */
  itemClassName?: string;
  autoplay?: number;
  arrows?: "bottom" | "side";
};

/** Slick-style slider: smooth slide-by-one with arrows, swipe and snap. */
export default function Carousel({
  children,
  itemClassName = "w-[82%] sm:w-[46%] lg:w-[31.5%] xl:w-[23.6%]",
  autoplay,
  arrows = "bottom",
}: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [paused, setPaused] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const w = first ? first.offsetWidth + gap : el.clientWidth;
    if (dir === 1 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * w, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  useEffect(() => {
    if (!autoplay || paused) return;
    const t = setInterval(() => step(1), autoplay);
    return () => clearInterval(t);
  }, [autoplay, paused, step]);

  const btn =
    "grid h-11 w-11 place-items-center rounded-full border border-saffron-200 bg-white text-saffron-500 shadow-sm transition hover:bg-saffron-500 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-saffron-500";

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-6 pt-2 sm:mx-0 sm:px-0"
      >
        {Children.map(children, (child) => (
          <div className={`shrink-0 snap-start ${itemClassName}`}>{child}</div>
        ))}
      </div>

      {arrows === "bottom" ? (
        <div className="mt-2 flex justify-center gap-3">
          <button aria-label="Previous" className={btn} onClick={() => step(-1)} disabled={atStart}>
            <ArrowLeft size={18} />
          </button>
          <button aria-label="Next" className={btn} onClick={() => step(1)}>
            <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <>
          <button
            aria-label="Previous"
            className={`${btn} absolute -left-5 top-[40%] hidden -translate-y-1/2 md:grid`}
            onClick={() => step(-1)}
            disabled={atStart}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            aria-label="Next"
            className={`${btn} absolute -right-5 top-[40%] hidden -translate-y-1/2 md:grid`}
            onClick={() => step(1)}
          >
            <ArrowRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}
