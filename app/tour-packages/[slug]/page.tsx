import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BedDouble, Bus, CalendarDays, Camera, Check, ChevronDown, Coffee, MapPin, ShieldCheck, Star, UserCheck, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import PackageCard from "@/components/PackageCard";
import Reveal from "@/components/Reveal";
import { EnquiryForm } from "@/components/Enquiry";
import EnquiryButton from "@/components/EnquiryButton";
import { discount, getPackage, inr, packages } from "@/lib/data";
import { img } from "@/lib/images";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getPackage((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} | ${p.days}D/${p.nights}N from ${inr(p.price)}`,
    description: `${p.title}: ${p.places.join(", ")}. ${p.highlights.join(". ")}.`,
  };
}

const inclusions = [
  { Icon: BedDouble, label: "Handpicked hotels" },
  { Icon: Coffee, label: "Daily breakfast" },
  { Icon: Bus, label: "Private AC cab" },
  { Icon: Camera, label: "Sightseeing" },
  { Icon: UserCheck, label: "Tour assistance" },
];

export default async function PackageDetail({ params }: Params) {
  const p = getPackage((await params).slug);
  if (!p) notFound();

  const related = packages.filter((x) => x.slug !== p.slug && x.categories.some((c) => p.categories.includes(c) && c !== "domestic")).slice(0, 4);

  const dayText = (title: string, i: number) => {
    if (i === 0) return `Arrive and meet your BringYatra representative, who will help you check in. ${title.split("·")[1]?.trim() ?? "Spend the evening at leisure"}, then return to the hotel for dinner and overnight stay.`;
    if (i === p.itinerary.length - 1) return "After breakfast, check out and enjoy some last-minute shopping. You'll be dropped at the airport or railway station for your onward journey, with memories to keep.";
    return `After breakfast, set out for today's highlights: ${title.replace("·", "and")}. Your driver-guide will share local stories along the way. Evening at leisure, then overnight stay at the hotel.`;
  };

  return (
    <>
      <PageHero
        tall
        image={img(p.image, 2000)}
        crumbs={[{ label: "Tour Packages", href: "/tour-packages" }, { label: p.title }]}
        title={p.title}
        subtitle={p.subtitle}
      >
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 backdrop-blur"><CalendarDays size={16} /> {p.days} Days / {p.nights} Nights</span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 backdrop-blur"><MapPin size={16} /> {p.places.join(" • ")}</span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 backdrop-blur"><Star size={16} className="fill-amber-400 text-amber-400" /> {p.rating} ({p.reviews.toLocaleString("en-IN")} reviews)</span>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <div className="container grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0 space-y-12">
            {/* Gallery */}
            <Reveal className="grid h-[260px] grid-cols-4 grid-rows-2 gap-3 sm:h-[440px]">
              {p.gallery.map((g, i) => (
                <div key={g + i} className={`group zoom-img relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-4 row-span-2 sm:col-span-2" : i === 1 ? "col-span-2 hidden sm:block" : "hidden sm:block"}`}>
                  <Image src={img(g, i === 0 ? 1200 : 700)} alt={`${p.title} photo ${i + 1}`} fill sizes="(max-width:768px) 100vw, 40vw" className="object-cover" />
                </div>
              ))}
            </Reveal>

            {/* Overview */}
            <Reveal>
              <h2 className="text-2xl font-bold text-ink">Tour Overview</h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                {p.title} is a {p.days}-day journey through {p.places.slice(0, -1).join(", ")}
                {p.places.length > 1 ? ` and ${p.places[p.places.length - 1]}` : p.places[0]}. We handle every hotel, transfer and sightseeing stop, so you just enjoy the trip. The itinerary is fully customisable: add a night, upgrade your stay or include flights from your city.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.highlights.map((h) => (
                  <p key={h} className="flex items-start gap-3 rounded-xl bg-navy-50/70 p-4 text-sm font-medium text-ink">
                    <Check size={18} className="mt-0.5 shrink-0 text-teal-600" /> {h}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* Inclusions strip */}
            <Reveal className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 p-5 sm:grid-cols-5">
              {inclusions.map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center text-xs font-medium text-slate-700">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-saffron-50 text-saffron-500"><Icon size={22} /></span>
                  {label}
                </div>
              ))}
            </Reveal>

            {/* Itinerary */}
            <Reveal>
              <h2 className="text-2xl font-bold text-ink">Day-wise Itinerary</h2>
              <ol className="relative mt-6 space-y-4 border-l-2 border-dashed border-navy-200 pl-8">
                {p.itinerary.map((d, i) => (
                  <li key={d} className="relative">
                    <span className="absolute -left-[45px] top-3 grid h-7 w-7 place-items-center rounded-full bg-saffron-500 text-xs font-bold text-white ring-4 ring-white">{i + 1}</span>
                    <details className="group rounded-2xl border border-slate-200 bg-white p-4 open:shadow-card" open={i === 0}>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                        <span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-saffron-500">Day {i + 1}</span>
                          <span className="block font-semibold text-ink">{d}</span>
                        </span>
                        <ChevronDown size={20} className="shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{dayText(d, i)}</p>
                    </details>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Inclusions / exclusions */}
            <Reveal className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
                <h3 className="font-semibold text-ink">What&apos;s Included</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {[`${p.nights} nights in handpicked hotels`, "Daily breakfast (MAP on request)", "Private AC vehicle for all transfers", "Sightseeing as per itinerary", "Toll, parking & driver allowances", "24×7 BringYatra on-trip support"].map((x) => (
                    <li key={x} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />{x}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-6">
                <h3 className="font-semibold text-ink">Not Included</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {["Flights / train tickets (can be added)", "Monument entry & camera fees", "Lunch and dinner unless mentioned", "Personal expenses & tips", "Travel insurance", "GST (5%)"].map((x) => (
                    <li key={x} className="flex gap-2"><X size={16} className="mt-0.5 shrink-0 text-rose-500" />{x}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Booking sidebar */}
          <aside className="h-fit space-y-5 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lift">
              <p className="text-sm text-slate-500">Starting from</p>
              <div className="mt-1 flex items-end gap-2">
                <span className="font-display text-4xl font-bold text-ink">{inr(p.price)}</span>
                <span className="mb-1.5 text-sm text-slate-400 line-through">{inr(p.oldPrice)}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">per person on twin sharing</p>
              <span className="mt-3 inline-block rounded-lg bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">You save {discount(p)}% · {inr(p.oldPrice - p.price)}</span>
              <EnquiryButton subject={p.title} className="btn-primary mt-5 w-full py-3.5 text-base">Book Now</EnquiryButton>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500"><ShieldCheck size={14} className="text-teal-600" /> Pay just 25% to confirm · Free cancellation*</p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
              <h3 className="mb-4 text-lg font-semibold text-ink">Customise this trip</h3>
              <EnquiryForm subject={p.title} compact />
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-slate-50 py-14">
          <div className="container">
            <h2 className="mb-8 text-3xl font-bold text-ink">You may also <span className="text-navy-600">like</span></h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <PackageCard key={r.slug} pkg={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
