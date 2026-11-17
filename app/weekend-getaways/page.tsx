import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import PackageCard from "@/components/PackageCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { byCategory, weekendCities } from "@/lib/data";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Weekend Getaways",
  description: "Short 2–3 day weekend getaways near Bhubaneswar, Delhi, Mumbai, Bangalore, Kolkata and more.",
};

export default function WeekendPage() {
  return (
    <>
      <PageHero
        image={img("rishikesh", 2000)}
        crumbs={[{ label: "Weekend Getaways" }]}
        title={<>Weekend <span className="text-amber-400">Getaways</span></>}
        subtitle="Leave Friday night, back by Monday morning. Quick breaks near your city that still feel like a holiday."
      />

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="Top Weekend Breaks" highlight="Near Your City" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {weekendCities.map((c, i) => (
              <Reveal key={c.city} delay={(i % 4) * 80}>
                <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="zoom-img relative aspect-[4/3] overflow-hidden">
                    <Image src={img(c.image, 700)} alt={`Getaways from ${c.city}`} fill sizes="(max-width:640px) 100vw, 25vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <p className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wider text-amber-400">{c.count} getaways</p>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-ink">From {c.city}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {c.picks.map((p) => (
                        <li key={p} className="flex items-center gap-1 rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700">
                          <MapPin size={12} /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="Weekend" highlight="Packages" subtitle="Two to four day trips with stays and transfers included" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {byCategory("weekend").map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 80}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
