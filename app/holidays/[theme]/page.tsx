import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import PackageCard from "@/components/PackageCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TripEnquirySection from "@/components/TripEnquiry";
import { byCategory } from "@/lib/data";
import { img } from "@/lib/images";
import { getTheme, holidayThemes } from "@/lib/themes";

type Params = { params: Promise<{ theme: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return holidayThemes.map((t) => ({ theme: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const t = getTheme((await params).theme);
  return t ? { title: t.label, description: `${t.tagline} ${t.intro.slice(0, 120)}…` } : {};
}

export default async function HolidayThemePage({ params }: Params) {
  const t = getTheme((await params).theme);
  if (!t) notFound();
  const list = byCategory(t.category);
  const others = holidayThemes.filter((x) => x.slug !== t.slug);

  return (
    <>
      <PageHero
        tall
        image={img(t.image, 2000)}
        crumbs={[{ label: "Holiday Packages", href: "/holidays" }, { label: t.label }]}
        title={
          <>
            {t.title} <span className="text-amber-400">{t.highlight}</span>
          </>
        }
        subtitle={t.tagline}
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#packages" className="btn-primary">View {list.length} Packages</a>
          <a href="#enquire" className="btn border border-white/40 text-white hover:bg-white hover:text-navy-900">Customise My Trip</a>
        </div>
      </PageHero>

      {/* Intro + perks */}
      <section className="py-16 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal variant="left">
            <p className="eyebrow">{t.label}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Why book {t.label.toLowerCase()} <span className="text-navy-600">with BringYatra?</span>
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">{t.intro}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
                <CheckCircle2 size={24} className="text-saffron-500" />
                <h3 className="mt-3 font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Top destinations */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="Most-loved" highlight={`${t.formType} Destinations`} />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {t.destinations.map((d, i) => (
              <Reveal key={d.name} delay={i * 80}>
                <Link href={`/tour-packages?q=${encodeURIComponent(d.name.split(" ")[0])}`} className="group zoom-img relative block aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image src={img(d.image, 600)} alt={d.name} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 p-4 text-white sm:p-5">
                    <h3 className="text-lg font-semibold sm:text-xl">{d.name}</h3>
                    <p className="text-xs text-white/85 sm:text-sm">{d.note}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            title="Handpicked"
            highlight={t.label}
            subtitle={`${list.length} handpicked itineraries. Click the arrow on any package to book it.`}
            link={{ href: `/tour-packages?category=${t.category}`, label: "Filter & compare" }}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-slate-50/70">
        <TripEnquirySection variant="holiday" defaultType={t.formType} />
      </div>

      {/* Other themes */}
      <section className="py-14">
        <div className="container">
          <h2 className="mb-6 text-2xl font-bold text-ink">
            Explore other <span className="text-navy-600">holiday themes</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/holidays/${o.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:border-saffron-400 hover:text-saffron-600"
              >
                {o.label} <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
            <Link href="/weekend-getaways" className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:border-saffron-400 hover:text-saffron-600">
              Weekend Getaways <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
