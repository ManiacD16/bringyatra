import Image from "next/image";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import SearchWidget, { type SearchTab } from "./SearchWidget";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { inr } from "@/lib/data";
import { img, type ImageKey } from "@/lib/images";

export type Route = { from: string; to: string; price: number; meta: string };
export type Stay = { name: string; city: string; price: number; rating: number; image: ImageKey };

type Props = {
  tab: SearchTab;
  title: string;
  highlight: string;
  subtitle: string;
  image: ImageKey;
  perks: string[];
  routesTitle?: string;
  routes?: Route[];
  stays?: Stay[];
};

export default function BookingPage({ tab, title, highlight, subtitle, image, perks, routesTitle, routes, stays }: Props) {
  return (
    <>
      <section className="relative pb-6">
        <div className="absolute inset-0 bottom-[120px] overflow-hidden bg-navy-900">
          <Image src={img(image, 2000)} alt="" fill priority sizes="100vw" className="animate-kenburns object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/60 to-navy-900/20" />
        </div>
        <div className="container relative pt-16 sm:pt-24">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-6xl">
            {title} <span className="text-amber-400">{highlight}</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/85 sm:text-lg">{subtitle}</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-amber-400" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <SearchWidget initial={tab} showTabs={false} />
          </div>
        </div>
      </section>

      {routes && (
        <section className="py-14 sm:py-16">
          <div className="container">
            <SectionHeading title={routesTitle ?? "Popular"} highlight="Routes" subtitle="Lowest fares found by travellers in the last 24 hours" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((r, i) => (
                <Reveal key={r.from + r.to} delay={(i % 3) * 70}>
                  <div className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-saffron-200">
                    <div>
                      <p className="flex items-center gap-2 font-semibold text-ink">
                        {r.from} <ArrowRight size={16} className="text-saffron-500" /> {r.to}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{r.meta}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">from</p>
                      <p className="font-display text-lg font-bold text-navy-700">{inr(r.price)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {stays && (
        <section className="bg-slate-50 py-14 sm:py-16">
          <div className="container">
            <SectionHeading title="Handpicked" highlight="Stays" subtitle="Verified by our team for cleanliness, safety and service" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stays.map((s, i) => (
                <Reveal key={s.name} delay={(i % 4) * 80}>
                  <article className="group overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-lift">
                    <div className="zoom-img relative aspect-[4/3] overflow-hidden">
                      <Image src={img(s.image, 700)} alt={s.name} fill sizes="(max-width:640px) 100vw, 25vw" className="object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">{s.city}</p>
                        <p className="flex items-center gap-1 text-xs font-semibold text-ink">
                          <Star size={13} className="fill-amber-500 text-amber-500" /> {s.rating}
                        </p>
                      </div>
                      <h3 className="mt-1 font-semibold text-ink">{s.name}</h3>
                      <p className="mt-3 text-sm text-slate-600">
                        <span className="font-display text-lg font-bold text-ink">{inr(s.price)}</span> / night
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
