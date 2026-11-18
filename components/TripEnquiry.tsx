"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, Loader2, Mail, Phone, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import { useAuth } from "./Auth";
import { site } from "@/lib/data";
import { img, type ImageKey } from "@/lib/images";

export type EnquiryVariant = "domestic" | "holiday" | "odisha" | "group";

type Config = {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  image: ImageKey;
  points: string[];
  submit: string;
};

const configs: Record<EnquiryVariant, Config> = {
  domestic: {
    eyebrow: "Domestic Tour Enquiry",
    title: "Plan Your",
    highlight: "India Tour",
    subtitle: "Tell us where and when. We'll send a day-wise itinerary and a transparent quote.",
    image: "himalayaValley",
    points: ["Custom itinerary within 30 minutes", "Verified hotels & private cabs", "No hidden charges"],
    submit: "Get My Tour Quote",
  },
  holiday: {
    eyebrow: "Holiday Package Enquiry",
    title: "Find Your",
    highlight: "Perfect Holiday",
    subtitle: "Family trip, honeymoon, pilgrimage or a quick weekend break. Tell us the mood and we'll plan the rest.",
    image: "honeymoon",
    points: ["Honeymoon & family special inclusions", "Flexible dates · pay 25% to confirm", "24×7 on-trip support"],
    submit: "Get Holiday Options",
  },
  odisha: {
    eyebrow: "Odisha Special Enquiry",
    title: "Plan Your",
    highlight: "Odisha Trip",
    subtitle: "Pick the places you'd love to see, and our local Odisha experts will build the route around them.",
    image: "puri",
    points: ["Jagannath darshan assistance", "Local guides at Konark & Bhubaneswar", "Chilika boat safari arranged"],
    submit: "Plan My Odisha Tour",
  },
  group: {
    eyebrow: "Group Tour Enquiry",
    title: "Request a",
    highlight: "Group Quote",
    subtitle: "Corporate, school, yatra or family groups of 10 to 500+. Our group desk replies within 24 hours.",
    image: "friends",
    points: ["Dedicated tour manager", "Bulk flight, train & bus blocks", "Special group pricing"],
    submit: "Get Group Quote",
  },
};

const domesticDestinations = [
  "Kashmir", "Himachal (Shimla / Manali)", "Uttarakhand / Char Dham", "Leh Ladakh", "Rajasthan", "Golden Triangle (Delhi-Agra-Jaipur)",
  "Kerala", "Goa", "Andaman", "Darjeeling & Sikkim", "Meghalaya", "Odisha", "Varanasi / Kashi", "Not sure yet: suggest me",
];
const holidayTypes = ["Family", "Honeymoon", "Pilgrimage", "Weekend Getaway", "Hill Station", "Beach", "Heritage", "Adventure"];
const odishaPlaces = ["Puri", "Konark", "Bhubaneswar", "Chilika Lake", "Gopalpur", "Raghurajpur & Pipili", "Simlipal", "Daringbadi"];
const groupTypes = ["Corporate / MICE", "School / College", "Pilgrimage / Yatra group", "Family reunion", "Wedding guests", "Friends / Club"];
const durations = ["2 – 3 days", "4 – 5 days", "6 – 8 days", "9+ days", "Flexible"];
const budgets = ["Under ₹10,000", "₹10,000 – ₹20,000", "₹20,000 – ₹35,000", "₹35,000 – ₹50,000", "Above ₹50,000"];
const hotels = ["Budget / 2★", "Standard / 3★", "Deluxe / 4★", "Luxury / 5★"];

function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <span className="mb-1.5 block text-xs font-semibold text-slate-600">
      {children} {required && <span className="text-rose-500">*</span>}
    </span>
  );
}

function Chips({ options, value, onToggle, multi }: { options: string[]; value: string[]; onToggle: (v: string) => void; multi?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2" role={multi ? "group" : "radiogroup"}>
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            type="button"
            key={o}
            role={multi ? "checkbox" : "radio"}
            aria-checked={on}
            onClick={() => onToggle(o)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
              on ? "border-saffron-500 bg-saffron-500 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-saffron-300"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function TripEnquiryForm({ variant, defaultType }: { variant: EnquiryVariant; defaultType?: string }) {
  const cfg = configs[variant];
  const { user } = useAuth();
  const [f, setF] = useState({
    name: "", phone: "", email: "", city: "", date: "", duration: "", adults: "2", children: "0",
    budget: "", hotel: "Standard / 3★", destination: "", groupType: "", groupSize: "", message: "",
  });
  const [chips, setChips] = useState<string[]>(defaultType ? [defaultType] : []);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  // Pre-fill from the (demo) logged-in user
  useEffect(() => {
    if (user) setF((v) => ({ ...v, name: v.name || user.name, email: v.email || user.email, phone: v.phone || user.phone || "" }));
  }, [user]);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  const toggle = (multi: boolean) => (o: string) =>
    setChips((c) => (multi ? (c.includes(o) ? c.filter((x) => x !== o) : [...c, o]) : c[0] === o ? [] : [o]));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (f.name.trim().length < 2) errs.name = "Enter your name";
    if (!/^(91)?[6-9]\d{9}$/.test(f.phone.replace(/\D/g, ""))) errs.phone = "Enter a valid 10-digit mobile number";
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) errs.email = "Enter a valid email";
    if (variant === "domestic" && !f.destination) errs.destination = "Choose a destination";
    if (variant === "holiday" && !chips.length) errs.chips = "Pick a holiday type";
    if (variant === "odisha" && !chips.length) errs.chips = "Pick at least one place";
    if (variant === "group") {
      if (!f.groupType) errs.groupType = "Choose a group type";
      if (!(Number(f.groupSize) >= 10)) errs.groupSize = "Group tours start at 10 travellers";
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 800));
    setBusy(false);
    setRef(`BY-${variant.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  if (ref) {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <CheckCircle2 size={60} className="text-emerald-500" />
        <h3 className="mt-4 text-2xl font-bold text-ink">Enquiry received!</h3>
        <p className="mt-2 max-w-md text-sm text-slate-600">
          Thank you, {f.name.split(" ")[0]}. Your reference number is <span className="font-semibold text-ink">{ref}</span>. Our travel expert will call you on{" "}
          <span className="font-semibold text-ink">{f.phone}</span> shortly.
        </p>
        <p className="mt-1 text-xs text-slate-500">(Demo website: no data has been sent.)</p>
        <button
          className="btn-outline mt-6"
          onClick={() => {
            setRef(null);
            setChips(defaultType ? [defaultType] : []);
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-rose-600">{errors[k]}</p>;
  const bad = (k: string) => (errors[k] ? "border-rose-400" : "");

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Variant-specific questions */}
      {variant === "domestic" && (
        <label className="block">
          <Label required>Where do you want to go?</Label>
          <select className={`field ${bad("destination")}`} value={f.destination} onChange={set("destination")}>
            <option value="">Select a destination</option>
            {domesticDestinations.map((d) => <option key={d}>{d}</option>)}
          </select>
          {err("destination")}
        </label>
      )}
      {variant === "holiday" && (
        <div>
          <Label required>What kind of holiday?</Label>
          <Chips options={holidayTypes} value={chips} onToggle={toggle(false)} />
          {err("chips")}
          <label className="mt-4 block">
            <Label>Preferred destination (optional)</Label>
            <input className="field" placeholder="e.g. Kashmir, Kerala, Goa" value={f.destination} onChange={set("destination")} />
          </label>
        </div>
      )}
      {variant === "odisha" && (
        <div>
          <Label required>Places you&apos;d like to visit</Label>
          <Chips options={odishaPlaces} value={chips} onToggle={toggle(true)} multi />
          {err("chips")}
        </div>
      )}
      {variant === "group" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <Label required>Group type</Label>
            <select className={`field ${bad("groupType")}`} value={f.groupType} onChange={set("groupType")}>
              <option value="">Select group type</option>
              {groupTypes.map((g) => <option key={g}>{g}</option>)}
            </select>
            {err("groupType")}
          </label>
          <label className="block">
            <Label required>Number of travellers</Label>
            <input className={`field ${bad("groupSize")}`} type="number" min={10} inputMode="numeric" placeholder="10 or more" value={f.groupSize} onChange={set("groupSize")} />
            {err("groupSize")}
          </label>
          <label className="block sm:col-span-2">
            <Label>Destination(s)</Label>
            <input className="field" placeholder="e.g. Goa, Char Dham, Puri-Konark" value={f.destination} onChange={set("destination")} />
          </label>
        </div>
      )}

      {/* Trip details */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block">
          <Label>Travel date</Label>
          <input className="field" type="date" value={f.date} onChange={set("date")} />
        </label>
        <label className="block">
          <Label>Duration</Label>
          <select className="field" value={f.duration} onChange={set("duration")}>
            <option value="">Select</option>
            {durations.map((d) => <option key={d}>{d}</option>)}
          </select>
        </label>
        <label className="block">
          <Label>Departure city</Label>
          <input className="field" placeholder="e.g. Delhi" value={f.city} onChange={set("city")} />
        </label>
        {variant !== "group" && (
          <>
            <label className="block">
              <Label>Adults</Label>
              <input className="field" type="number" min={1} value={f.adults} onChange={set("adults")} />
            </label>
            <label className="block">
              <Label>Children (below 12)</Label>
              <input className="field" type="number" min={0} value={f.children} onChange={set("children")} />
            </label>
          </>
        )}
        <label className="block">
          <Label>Budget per person</Label>
          <select className="field" value={f.budget} onChange={set("budget")}>
            <option value="">Select</option>
            {budgets.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
        <label className={`block ${variant === "group" ? "sm:col-span-2 lg:col-span-2" : ""}`}>
          <Label>Hotel category</Label>
          <select className="field" value={f.hotel} onChange={set("hotel")}>
            {hotels.map((h) => <option key={h}>{h}</option>)}
          </select>
        </label>
      </div>

      {/* Contact */}
      <div className="grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
        <label className="block">
          <Label required>Full name</Label>
          <input className={`field ${bad("name")}`} autoComplete="name" value={f.name} onChange={set("name")} />
          {err("name")}
        </label>
        <label className="block">
          <Label required>Mobile number</Label>
          <input className={`field ${bad("phone")}`} type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile" value={f.phone} onChange={set("phone")} />
          {err("phone")}
        </label>
        <label className="block">
          <Label>Email</Label>
          <input className={`field ${bad("email")}`} type="email" autoComplete="email" value={f.email} onChange={set("email")} />
          {err("email")}
        </label>
      </div>
      <label className="block">
        <Label>Anything else?</Label>
        <textarea className="field min-h-[84px]" placeholder="Special requests, meal preferences, senior citizens travelling, etc." value={f.message} onChange={set("message")} />
      </label>

      <button disabled={busy} className="btn-primary w-full py-3.5 text-base disabled:cursor-wait disabled:opacity-80">
        {busy && <Loader2 size={18} className="animate-spin" />} {cfg.submit}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
        <ShieldCheck size={14} className="text-teal-600" /> Your details are safe with us. No spam, ever.
      </p>
    </form>
  );
}

/** Full-width enquiry section: photo + highlights on the left, the form on the right. */
export default function TripEnquirySection({ variant, defaultType }: { variant: EnquiryVariant; defaultType?: string }) {
  const cfg = configs[variant];
  return (
    <section id="enquire" className="scroll-mt-24 py-16 sm:py-20">
      <div className="container">
        <div className="grid overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-lift lg:grid-cols-[0.8fr_1.4fr]">
          <Reveal variant="left" className="relative min-h-[280px]">
            <Image src={img(cfg.image, 1000)} alt="" fill sizes="(max-width:1024px) 100vw, 35vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/60 to-navy-900/20" />
            <div className="relative flex h-full flex-col justify-end p-7 text-white sm:p-9">
              <p className="eyebrow text-amber-400">{cfg.eyebrow}</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
                {cfg.title} <span className="text-amber-400">{cfg.highlight}</span>
              </h2>
              <p className="mt-3 text-sm text-white/85">{cfg.subtitle}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {cfg.points.map((p) => (
                  <li key={p} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400" /> {p}</li>
                ))}
              </ul>
              <div className="mt-6 space-y-1.5 border-t border-white/15 pt-5 text-sm text-white/85">
                <a href={`tel:${site.tel}`} className="flex items-center gap-2 hover:text-white"><Phone size={15} /> {site.phone}</a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white"><Mail size={15} /> {site.email}</a>
              </div>
            </div>
          </Reveal>
          <div className="p-6 sm:p-9">
            <TripEnquiryForm variant={variant} defaultType={defaultType} />
          </div>
        </div>
      </div>
    </section>
  );
}
