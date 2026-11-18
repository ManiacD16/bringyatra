import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Eye, HeartHandshake, Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/home/Counter";
import { site, stats, testimonials } from "@/lib/data";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description: "BringYatra, a brand of Billbring Payment Solution Pvt Ltd: Bringing Journeys to Life.",
};

const values = [
  { Icon: Compass, title: "Our Mission", text: "Make travel across India simple, safe and good value for every family, couple and pilgrim." },
  { Icon: Eye, title: "Our Vision", text: "To be eastern India's most-loved travel brand, known for honesty and personal care." },
  { Icon: HeartHandshake, title: "Our Promise", text: "Transparent pricing, verified stays and a real person on call throughout your trip." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image={img("himalayaVillage", 2000)}
        crumbs={[{ label: "About Us" }]}
        title={<>Bringing Journeys <span className="text-amber-400">to Life</span></>}
        subtitle="Meet BringYatra, the travel brand of Billbring Payment Solution Pvt Ltd, trusted by 25,000+ travellers."
      />

      <section className="py-16 sm:py-20">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal variant="left" className="relative">
            <div className="relative aspect-[4/3.6] overflow-hidden rounded-[2rem]">
              <Image src={img("lingaraj", 1200)} alt="Ancient temple architecture in Bhubaneswar" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 right-4 hidden w-40 rounded-2xl bg-white p-3 shadow-lift sm:block">
              <Image src="/images/icon.png" alt="BringYatra icon" width={458} height={512} className="mx-auto h-auto w-20" />
              <p className="mt-1 text-center text-xs font-semibold text-navy-800">by BillBring</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Who we are" title="Travel, Made" highlight="Simple & Joyful" />
            <Reveal className="space-y-4 text-slate-600">
              <p>
                BringYatra is the travel brand of {site.legalName}, built on one belief: every journey should be as joyful as the destination. We are a full-service travel company covering 120+ destinations across India.
              </p>
              <p>
                Today our team of 60+ travel experts plans domestic tour packages, weekend getaways, family and honeymoon holidays, religious and pilgrimage tours, and customized group tours, along with flight, bus and hotel bookings. Odisha is our speciality, and our Odisha special packages are designed with local experts on the ground.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-14 text-white">
        <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label} className="text-center">
              <p className="font-display text-4xl font-bold text-amber-400 sm:text-5xl"><Counter value={s.value} suffix={s.suffix} /></p>
              <p className="mt-1 text-sm text-white/75">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container grid gap-6 md:grid-cols-3">
          {values.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100} className="rounded-3xl border border-slate-100 p-8 shadow-card">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-saffron-50 text-saffron-500"><Icon size={26} /></span>
              <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="reviews" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <div className="container">
          <SectionHeading center eyebrow="Reviews" title="Loved by" highlight="Travellers" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 90} className="rounded-3xl bg-white p-6 shadow-card">
                <div className="flex text-amber-500">
                  {Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={15} className="fill-current" />)}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{t.text}</p>
                <p className="mt-4 font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-slate-500">{t.trip}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
