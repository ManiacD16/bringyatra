"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  ArrowLeftRight,
  BedDouble,
  Bus,
  CalendarDays,
  ChevronDown,
  MapPin,
  Mountain,
  Palmtree,
  Plane,
  Search,
  User,
} from "lucide-react";

export type SearchTab = "flights" | "hotels" | "buses" | "holidays" | "packages";

const tabs: { id: SearchTab; label: string; Icon: typeof Plane }[] = [
  { id: "flights", label: "Flights", Icon: Plane },
  { id: "hotels", label: "Hotels", Icon: BedDouble },
  { id: "buses", label: "Buses", Icon: Bus },
  { id: "holidays", label: "Holidays", Icon: Palmtree },
  { id: "packages", label: "Tour Packages", Icon: Mountain },
];

function Field({ icon, label, children, className = "" }: { icon: ReactNode; label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 transition focus-within:border-navy-500 focus-within:ring-4 focus-within:ring-navy-100 ${className}`}>
      <span className="shrink-0 text-slate-500">{icon}</span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs text-slate-500">{label}</span>
        {children}
      </span>
    </label>
  );
}

const inputCls = "w-full bg-transparent text-[15px] font-medium text-ink outline-none placeholder:font-normal placeholder:text-slate-500";

export default function SearchWidget({ initial = "flights", showTabs = true }: { initial?: SearchTab; showTabs?: boolean }) {
  const router = useRouter();
  const [tab, setTab] = useState<SearchTab>(initial);
  const [trip, setTrip] = useState("One Way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searched, setSearched] = useState(false);

  const cta: Record<SearchTab, string> = {
    flights: "Search Flights",
    hotels: "Search Hotels",
    buses: "Search Buses",
    holidays: "Find Holidays",
    packages: "Explore Packages",
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "packages" || tab === "holidays") {
      router.push(`/tour-packages${to ? `?q=${encodeURIComponent(to)}` : ""}`);
      return;
    }
    setSearched(true);
    setTimeout(() => setSearched(false), 3500);
  };

  return (
    <div className="relative">
      {showTabs && (
        <div className="no-scrollbar relative z-10 -mb-px flex max-w-full gap-1 overflow-x-auto rounded-t-2xl bg-white/90 p-1.5 pb-0 backdrop-blur sm:inline-flex">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-[15px] font-semibold transition-all sm:px-6 sm:py-3.5 ${
                tab === id ? "bg-navy-800 text-white shadow-lg" : "text-ink hover:bg-navy-50"
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className={`rounded-2xl bg-white p-4 shadow-[0_24px_60px_-20px_rgba(1,26,51,0.45)] sm:p-6 ${showTabs ? "rounded-tl-none" : ""}`}
      >
        {tab === "flights" && (
          <div className="mb-4 flex flex-wrap gap-5 text-sm font-medium">
            {["One Way", "Round Trip", "Multi City"].map((t) => (
              <label key={t} className="flex cursor-pointer items-center gap-2">
                <input type="radio" name="trip" checked={trip === t} onChange={() => setTrip(t)} className="h-4 w-4 accent-navy-600" />
                {t}
              </label>
            ))}
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.25fr_1.1fr_1fr_1.2fr_auto]">
          {tab === "flights" || tab === "buses" ? (
            <div className="relative grid gap-3 sm:grid-cols-2 md:col-span-2 xl:col-span-2">
              <Field icon={<MapPin size={20} />} label="From" className="sm:pr-8">
                <input className={inputCls} placeholder={tab === "flights" ? "Departure City" : "Boarding City"} value={from} onChange={(e) => setFrom(e.target.value)} />
              </Field>
              <button
                type="button"
                aria-label="Swap cities"
                onClick={() => {
                  setFrom(to);
                  setTo(from);
                }}
                className="absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-navy-700 shadow transition hover:rotate-180 sm:grid"
              >
                <ArrowLeftRight size={18} />
              </button>
              <Field icon={<MapPin size={20} />} label="To" className="sm:pl-8">
                <input className={inputCls} placeholder="Destination City" value={to} onChange={(e) => setTo(e.target.value)} />
              </Field>
            </div>
          ) : (
            <Field icon={<MapPin size={20} />} label={tab === "hotels" ? "City, Hotel or Area" : "Where do you want to go?"} className="md:col-span-2 xl:col-span-2">
              <input className={inputCls} placeholder={tab === "hotels" ? "e.g. Puri, Goa, Manali" : "e.g. Kashmir, Kerala, Odisha"} value={to} onChange={(e) => setTo(e.target.value)} />
            </Field>
          )}

          <Field icon={<CalendarDays size={20} />} label={tab === "hotels" ? "Check-in" : tab === "flights" || tab === "buses" ? "Departure Date" : "Month of Travel"}>
            <input type={tab === "packages" || tab === "holidays" ? "month" : "date"} className={inputCls} aria-label="Date" />
          </Field>

          <Field icon={<User size={20} />} label={tab === "hotels" ? "Rooms & Guests" : tab === "flights" ? "Travellers & Class" : "Travellers"}>
            <span className="relative flex items-center">
              <select className={`${inputCls} appearance-none pr-6`} aria-label="Travellers">
                {tab === "flights"
                  ? ["1 Traveller, Economy", "2 Travellers, Economy", "1 Traveller, Business", "Family, Economy"].map((o) => <option key={o}>{o}</option>)
                  : tab === "hotels"
                    ? ["1 Room, 2 Guests", "1 Room, 3 Guests", "2 Rooms, 4 Guests"].map((o) => <option key={o}>{o}</option>)
                    : ["1 Traveller", "2 Travellers", "Family (3-5)", "Group (10+)"].map((o) => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={18} className="pointer-events-none absolute right-0 text-slate-500" />
            </span>
          </Field>

          <button className="btn-primary h-full min-h-[58px] px-7 text-base md:col-span-2 xl:col-span-1">
            <Search size={20} /> {cta[tab]}
          </button>
        </div>

        {/* {searched && (
          <p className="mt-4 rounded-xl bg-navy-50 px-4 py-3 text-sm text-navy-800" role="status">
            This is a demo UI. Live {tab} inventory will appear here once the booking engine is connected.
          </p>
        )} */}
      </form>
    </div>
  );
}
