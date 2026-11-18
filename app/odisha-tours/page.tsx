import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import PackageCard from "@/components/PackageCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TripEnquirySection from "@/components/TripEnquiry";
import { byCategory } from "@/lib/data";
import { img, type ImageKey } from "@/lib/images";

export const metadata: Metadata = {
  title: "Odisha Special Tour Packages",
  description: "Puri, Konark, Bhubaneswar, Chilika, Gopalpur and Simlipal tour packages by BringYatra's local Odisha experts.",
};

const places: { name: string; tag: string; text: string; image: ImageKey }[] = [
  { name: "Puri", tag: "Jagannath Dham", text: "One of the Char Dhams, home to Lord Jagannath and the Rath Yatra, plus the long Golden Beach.", image: "puri" },
  { name: "Konark", tag: "UNESCO World Heritage", text: "The 13th-century Sun Temple, built as a colossal stone chariot with 24 carved wheels.", image: "konarkWheel" },
  { name: "Bhubaneswar", tag: "Temple City of India", text: "Lingaraj, Mukteswar and Rajarani temples, the Udayagiri caves and the Dhauli peace pagoda.", image: "lingaraj" },
  { name: "Chilika Lake", tag: "Asia's largest lagoon", text: "Irrawaddy dolphins at Satapada, migratory birds at Nalabana, and the Kalijai island temple.", image: "chilika" },
  { name: "Gopalpur-on-Sea", tag: "Quiet coastal town", text: "A colonial-era port town with golden sands and quiet beach resorts, ideal for a weekend.", image: "odishaBeach" },
  { name: "Raghurajpur & Pipili", tag: "Craft villages", text: "Pattachitra painters, palm-leaf etching and the bright applique work of Pipili.", image: "konark" },
];

const festivals = [
  { name: "Rath Yatra", when: "June – July", text: "The chariot festival of Lord Jagannath in Puri, drawing millions of devotees." },
  { name: "Konark Dance Festival", when: "December", text: "Classical dance performed against the backdrop of the Sun Temple." },
  { name: "Durga Puja & Dussehra", when: "October", text: "Silver filigree pandals in Cuttack and celebrations across the state." },
  { name: "Chilika Bird Festival", when: "January", text: "More than a million migratory birds gather at Nalabana and Mangalajodi." },
];

export default function OdishaPage() {
  const list = byCategory("odisha");

  return (
    <>
      <PageHero
        tall
        image={img("konarkWheel", 2000)}
        crumbs={[{ label: "Odisha Special" }]}
        title={<>Odisha Special <span className="text-amber-400">Tour Packages</span></>}
        subtitle="Temples, tides, tribes and timeless crafts, planned with local experts who know Odisha inside out."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#packages" className="btn-primary">View Packages</a>
          <a href="#enquire" className="btn border border-white/40 text-white hover:bg-white hover:text-navy-900">Customise an Odisha Trip</a>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading center eyebrow="Explore Odisha" title="Places You" highlight="Can't Miss" subtitle="Our local experts have been guiding travellers here for over a decade." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((pl, i) => (
              <Reveal key={pl.name} delay={(i % 3) * 100}>
                <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="zoom-img relative aspect-[16/10] overflow-hidden">
                    <Image src={img(pl.image, 800)} alt={pl.name} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-saffron-500 px-3 py-1 text-xs font-semibold text-white">{pl.tag}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-ink">{pl.name}</h3>
                    <p className="mt-2 text-sm text-slate-600">{pl.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="Odisha" highlight="Tour Packages" subtitle="Pilgrimage, heritage and coastal escapes, all with local guides" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal variant="left" className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem]">
            <Image src={img("puri", 1200)} alt="Jagannath Temple, Puri decorated for a festival" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Festival calendar" title="Time Your Trip with" highlight="Odisha's Festivals" />
            <div className="space-y-4">
              {festivals.map((f, i) => (
                <Reveal key={f.name} delay={i * 80} className="flex gap-4 rounded-2xl border border-slate-100 p-5 transition hover:shadow-card">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-saffron-50 text-saffron-500"><Sparkles size={22} /></span>
                  <div>
                    <h3 className="font-semibold text-ink">{f.name}</h3>
                    <p className="flex items-center gap-1.5 text-xs font-medium text-navy-600"><CalendarDays size={13} /> {f.when}</p>
                    <p className="mt-1 text-sm text-slate-600">{f.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TripEnquirySection variant="odisha" />
    </>
  );
}
