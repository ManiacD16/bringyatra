"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Check, CheckCircle2, Loader2, MapPin, ShieldCheck, Star, X } from "lucide-react";
import { useAuth } from "./Auth";
import { discount, inr, packageImage, type Pkg } from "@/lib/data";

const PHONE_RE = /^(91)?[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Booking / enquiry popup for one specific tour package. */
export default function PackageEnquiryModal({ pkg, onClose }: { pkg: Pkg; onClose: () => void }) {
  const { user } = useAuth();
  const [f, setF] = useState({ name: "", phone: "", email: "", date: "", adults: "2", children: "0", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    if (user) setF((v) => ({ ...v, name: v.name || user.name, email: v.email || user.email, phone: v.phone || user.phone || "" }));
  }, [user]);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  const adults = Number(f.adults) || 1;
  const estimate = pkg.price * adults;
  const today = new Date().toISOString().slice(0, 10);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (f.name.trim().length < 2) errs.name = "Enter your name";
    if (!PHONE_RE.test(f.phone.replace(/\D/g, ""))) errs.phone = "Enter a valid 10-digit mobile number";
    if (f.email && !EMAIL_RE.test(f.email)) errs.email = "Enter a valid email";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 800));
    setBusy(false);
    setRef(`BY-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-rose-600">{errors[k]}</p>;
  const bad = (k: string) => (errors[k] ? "border-rose-400" : "");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-label={`Enquire about ${pkg.title}`}>
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative grid max-h-[94vh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-3xl bg-white shadow-2xl md:grid-cols-[1fr_1.15fr] md:overflow-hidden">
        {/* Package summary */}
        <div className="relative">
          <Image src={packageImage(pkg, 900)} alt={`${pkg.title}: ${pkg.places.join(", ")}`} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/55 to-navy-900/10" />
          {pkg.badge && <span className="absolute left-5 top-5 rounded-full bg-saffron-500 px-3 py-1 text-xs font-semibold text-white">{pkg.badge}</span>}
          <div className="relative p-5 pt-16 text-white sm:p-7 sm:pt-16 md:absolute md:inset-x-0 md:bottom-0">
            <p className="flex items-center gap-1 text-xs">
              <Star size={13} className="fill-amber-400 text-amber-400" /> {pkg.rating}
              <span className="text-white/70">({pkg.reviews.toLocaleString("en-IN")} reviews)</span>
            </p>
            <h3 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">{pkg.title}</h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/85">
              <MapPin size={14} /> {pkg.places.join(" • ")}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/85">
              <CalendarDays size={14} /> {pkg.days} Days / {pkg.nights} Nights
            </p>
            <ul className="mt-4 hidden space-y-1.5 text-sm text-white/90 md:block">
              {pkg.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-amber-400" />{h}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-end gap-2 border-t border-white/15 pt-4">
              <span className="font-display text-2xl font-bold sm:text-3xl">{inr(pkg.price)}</span>
              <span className="mb-1 text-sm text-white/60 line-through">{inr(pkg.oldPrice)}</span>
              <span className="mb-1 rounded-md bg-emerald-500/90 px-2 py-0.5 text-xs font-semibold">{discount(pkg)}% OFF</span>
              <span className="mb-1 w-full text-xs text-white/70">per person on twin sharing</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-5 sm:p-8 md:overflow-y-auto">
          <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-600 shadow hover:bg-slate-100 md:bg-slate-100 md:shadow-none">
            <X size={18} />
          </button>

          {ref ? (
            <div className="flex h-full flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 size={60} className="text-emerald-500" />
              <h3 className="mt-4 text-2xl font-bold text-ink">Booking request sent!</h3>
              <p className="mt-2 max-w-sm text-sm text-slate-600">
                Thanks, {f.name.split(" ")[0]}. Your reference for <span className="font-semibold text-ink">{pkg.title}</span> is{" "}
                <span className="font-semibold text-ink">{ref}</span>. Our travel expert will call you on <span className="font-semibold text-ink">{f.phone}</span> to confirm dates and price.
              </p>
              <p className="mt-1 text-xs text-slate-500">(Demo website: no data has been sent.)</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href={`/tour-packages/${pkg.slug}`} onClick={onClose} className="btn-navy">View Itinerary</Link>
                <button onClick={onClose} className="btn-outline">Close</button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="pr-10 text-2xl font-bold text-ink">Book this Package</h3>
              <p className="mb-5 mt-1 text-sm text-slate-600">Share your travel details and our expert will confirm availability and the final price.</p>

              <form onSubmit={onSubmit} noValidate className="grid gap-3">
                <div className="flex items-center justify-between gap-3 rounded-xl bg-navy-50 px-4 py-3 text-sm">
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-500">Package</span>
                    <span className="block truncate font-semibold text-navy-800">{pkg.title} · {pkg.days}D/{pkg.nights}N</span>
                  </span>
                  <Link href={`/tour-packages/${pkg.slug}`} onClick={onClose} className="flex shrink-0 items-center gap-1 text-xs font-semibold text-saffron-600 hover:text-saffron-700">
                    Itinerary <ArrowRight size={14} />
                  </Link>
                </div>

                <div>
                  <input className={`field ${bad("name")}`} placeholder="Full name *" aria-label="Full name" autoComplete="name" value={f.name} onChange={set("name")} />
                  {err("name")}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <input className={`field ${bad("phone")}`} type="tel" inputMode="numeric" placeholder="Mobile number *" aria-label="Mobile number" autoComplete="tel" value={f.phone} onChange={set("phone")} />
                    {err("phone")}
                  </div>
                  <div>
                    <input className={`field ${bad("email")}`} type="email" placeholder="Email address" aria-label="Email address" autoComplete="email" value={f.email} onChange={set("email")} />
                    {err("email")}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1.3fr_1fr_1fr]">
                  <label className="col-span-2 block sm:col-span-1">
                    <span className="mb-1 block text-xs font-medium text-slate-500">Travel date</span>
                    <input className="field" type="date" min={today} aria-label="Travel date" value={f.date} onChange={set("date")} />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-slate-500">Adults</span>
                    <select className="field" aria-label="Adults" value={f.adults} onChange={set("adults")}>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-slate-500">Children</span>
                    <select className="field" aria-label="Children" value={f.children} onChange={set("children")}>
                      {Array.from({ length: 7 }, (_, i) => i).map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </label>
                </div>
                <textarea className="field min-h-[76px]" placeholder="Special requests (hotel upgrade, extra night, flights from your city…)" aria-label="Message" value={f.message} onChange={set("message")} />

                <div className="flex items-center justify-between rounded-xl border border-dashed border-saffron-300 bg-saffron-50/60 px-4 py-2.5 text-sm">
                  <span className="text-slate-600">
                    Estimated for {adults} adult{adults > 1 ? "s" : ""}
                    {Number(f.children) > 0 && <span className="block text-xs text-slate-500">Child cost added on confirmation</span>}
                  </span>
                  <span className="font-display text-lg font-bold text-ink">{inr(estimate)}</span>
                </div>

                <button disabled={busy} className="btn-primary mt-1 w-full py-3.5 disabled:cursor-wait disabled:opacity-80">
                  {busy && <Loader2 size={18} className="animate-spin" />} Request Booking
                </button>
                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
                  <ShieldCheck size={14} className="text-teal-600" /> No payment now. Pay 25% only after we confirm.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
