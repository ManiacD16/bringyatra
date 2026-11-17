import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Carousel from "@/components/Carousel";
import PackageCard from "@/components/PackageCard";
import { byCategory, interests, services } from "@/lib/data";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Holidays by Theme",
  description: "Family holidays, honeymoon packages, pilgrimage tours, hill stations, beaches, heritage and adventure trips across India.",
};

export default function HolidaysPage() {
  return (
    <>
      <PageHero
        image={img("tajGolden", 2000)}
        crumbs={[{ label: "Holidays" }]}
        title={<>Holidays for <span className="text-amber-400">Every Traveller</span></>}
        subtitle="Choose a theme, and we'll match you with itineraries built for how you love to travel."
      />

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading center eyebrow="Our services" title="What Would You Like to" highlight="Plan?" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 80}>
                <Link href={s.href} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="zoom-img relative aspect-[16/10] overflow-hidden">
                    <Image src={img(s.image, 700)} alt={s.title} fill sizes="(max-width:640px) 100vw, 25vw" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-slate-600">{s.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-500">
                      Explore <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {interests.slice(0, 4).map((it, idx) => (
        <section key={it.slug} className={`py-14 ${idx % 2 === 0 ? "bg-slate-50" : ""}`}>
          <div className="container">
            <SectionHeading title={it.label} highlight="Packages" link={{ href: `/tour-packages?category=${it.slug}`, label: "View all" }} />
            <Reveal>
              <Carousel>
                {byCategory(it.slug).map((p) => (
                  <PackageCard key={p.slug} pkg={p} />
                ))}
              </Carousel>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
