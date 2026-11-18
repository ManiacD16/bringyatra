"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { CheckCircle2, X } from "lucide-react";
import { img } from "@/lib/images";
import { getPackage } from "@/lib/data";
import PackageEnquiryModal from "./PackageEnquiry";

type Ctx = {
  /** General "plan my trip" popup, optionally pre-filled with a subject. */
  open: (subject?: string) => void;
  /** Booking popup for one specific tour package. */
  openPackage: (slug: string) => void;
};
const EnquiryContext = createContext<Ctx>({ open: () => {}, openPackage: () => {} });

export const useEnquiry = () => useContext(EnquiryContext);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [subject, setSubject] = useState<string | null>(null);
  const [pkgSlug, setPkgSlug] = useState<string | null>(null);
  const open = useCallback((s?: string) => setSubject(s ?? "Plan my trip"), []);
  const openPackage = useCallback((slug: string) => setPkgSlug(slug), []);
  const closeSubject = useCallback(() => setSubject(null), []);
  const closePackage = useCallback(() => setPkgSlug(null), []);
  const pkg = pkgSlug ? getPackage(pkgSlug) : undefined;

  return (
    <EnquiryContext.Provider value={{ open, openPackage }}>
      {children}
      {subject !== null && <EnquiryModal subject={subject} onClose={closeSubject} />}
      {pkg && <PackageEnquiryModal key={pkg.slug} pkg={pkg} onClose={closePackage} />}
    </EnquiryContext.Provider>
  );
}

export function EnquiryForm({ subject, compact }: { subject?: string; compact?: boolean }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <CheckCircle2 size={56} className="text-emerald-500" />
        <h3 className="mt-4 text-xl font-semibold text-ink">Thank you!</h3>
        <p className="mt-2 max-w-xs text-sm text-slate-600">
          Our travel expert will call you back within 30 minutes with a personalised plan.
        </p>
        <button className="btn-outline mt-6" onClick={() => setSent(false)}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input className="field" required placeholder="Full name" aria-label="Full name" />
      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <input className="field" required type="tel" placeholder="Mobile number" aria-label="Mobile number" />
        <input className="field" type="email" placeholder="Email address" aria-label="Email" />
      </div>
      <input className="field" defaultValue={subject && subject !== "Plan my trip" ? subject : ""} placeholder="Destination / package" aria-label="Destination" />
      <div className={`grid gap-3 ${compact ? "grid-cols-2" : "sm:grid-cols-2"}`}>
        <input className="field" type="date" aria-label="Travel date" />
        <select className="field" aria-label="Travellers" defaultValue="2 Adults">
          {["1 Adult", "2 Adults", "2 Adults, 1 Child", "Family (4-6)", "Group (10+)"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      {!compact && <textarea className="field min-h-[88px]" placeholder="Anything we should know? (budget, hotel category, special requests)" aria-label="Message" />}
      <button className="btn-primary mt-1 w-full py-3.5">Get Free Quote</button>
      <p className="text-center text-xs text-slate-500">No spam. A real travel expert will contact you.</p>
    </form>
  );
}

function EnquiryModal({ subject, onClose }: { subject: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Plan your trip">
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative grid max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[1fr_1.2fr]">
        <div className="relative hidden md:block">
          <Image src={img("coupleMountain", 900)} alt="Travellers looking at a mountain view" fill sizes="400px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/30 to-transparent" />
          <div className="absolute bottom-0 p-8 text-white">
            <p className="eyebrow text-amber-400">Plan your trip</p>
            <h3 className="mt-2 text-2xl font-bold leading-tight">Tell us your dream trip. We&apos;ll plan the rest.</h3>
            <ul className="mt-4 space-y-1.5 text-sm text-white/85">
              <li>✓ Personalised itinerary in 30 mins</li>
              <li>✓ Best price guaranteed</li>
              <li>✓ 24×7 on-trip support</li>
            </ul>
          </div>
        </div>
        <div className="overflow-y-auto p-6 sm:p-8">
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
            <X size={18} />
          </button>
          <h3 className="text-2xl font-bold text-ink">Request a Free Quote</h3>
          <p className="mb-5 mt-1 text-sm text-slate-600">Share a few details and our expert will call you back.</p>
          <EnquiryForm subject={subject} />
        </div>
      </div>
    </div>
  );
}
