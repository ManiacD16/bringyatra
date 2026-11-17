"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, Landmark, MapPinned, Phone, Plane, Send, TentTree } from "lucide-react";
import { useEnquiry } from "./Enquiry";
import { site } from "@/lib/data";

const quick = [
  { label: "India Tours", href: "/tour-packages", Icon: MapPinned },
  { label: "Odisha Special", href: "/odisha-tours", Icon: Landmark },
  { label: "Weekend Trips", href: "/weekend-getaways", Icon: TentTree },
  { label: "Book Flights", href: "/flights", Icon: Plane },
];

/** Fixed bottom quick-links bar with floating call / plan-trip buttons. */
export default function StickyBar() {
  const { open } = useEnquiry();
  const [showTop, setShowTop] = useState(false);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 900);
      setShowCta(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-[76px] right-4 z-40 flex flex-col items-end gap-2.5 transition-all duration-500 md:bottom-[84px] md:right-6 md:flex-row md:items-center ${
          showCta ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`grid h-11 w-11 place-items-center rounded-full bg-navy-800 text-white shadow-lg transition-all duration-500 hover:bg-navy-900 ${
            showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <ArrowUp size={18} />
        </button>
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="hidden items-center gap-2 rounded-full border border-saffron-500 bg-white px-4 py-2.5 text-sm font-semibold text-saffron-600 shadow-lg md:flex"
        >
          <Phone size={16} /> {site.phone}
        </a>
        <button onClick={() => open()} className="flex items-center gap-2 rounded-full bg-saffron-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_rgba(242,106,15,0.9)] transition hover:bg-saffron-600">
          <Send size={16} /> Plan Your Trip
        </button>
      </div>

      <nav
        aria-label="Quick links"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-8px_24px_-12px_rgba(1,53,100,0.25)] backdrop-blur"
      >
        <div className="container grid h-[64px] max-w-2xl grid-cols-4 md:h-[70px]">
          {quick.map(({ label, href, Icon }) => (
            <Link key={label} href={href} className="group flex flex-col items-center justify-center gap-1 text-[11px] font-medium text-slate-700 hover:text-navy-600 md:text-xs">
              <Icon size={22} className="text-saffron-500 transition-transform group-hover:-translate-y-0.5" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
