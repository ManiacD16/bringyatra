import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeIndianRupee,
  BedDouble,
  Bus,
  CalendarDays,
  ChevronDown,
  CreditCard,
  Headset,
  Hotel,
  MapPin,
  Plane,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Hero from "@/components/home/Hero";
import Counter from "@/components/home/Counter";
import { InterestTabs, RegionTabs } from "@/components/home/Tabs";
import Carousel from "@/components/Carousel";
import PackageCard from "@/components/PackageCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import EnquiryButton from "@/components/EnquiryButton";
import { blogs, byCategory, faqs, interests, packages, services, stats, testimonials, weekendCities, whyUs } from "@/lib/data";
import { img } from "@/lib/images";

const trust = [
  { Icon: ShieldCheck, title: "Trusted Travel Brand", sub: "25,000+ happy travellers" },
  { Icon: Headset, title: "24×7", sub: "Customer Support" },
  { Icon: BadgeIndianRupee, title: "Best Price", sub: "Guaranteed" },
  { Icon: CreditCard, title: "Secure & Easy", sub: "Payments" },
  { Icon: Plane, title: "Domestic & International", sub: "Travel" },
];

const whyIcons = { sparkles: Sparkles, hotel: Hotel, badge: BadgeIndianRupee, headset: Headset } as const;

export default function HomePage() {
  const trending = ["kashmir-getaway", "puri-bhubaneswar-konark", "shimla-manali-escape", "goa-holiday", "enchanting-kerala", "golden-triangle", "leh-ladakh-adventure", "andaman-island-escape"]
    .map((s) => packages.find((p) => p.slug === s)!)
    .filter(Boolean);
  const odisha = byCategory("odisha");

  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-b border-slate-100 bg-white">
        <div className="container grid grid-cols-2 gap-y-6 py-7 md:grid-cols-3 lg:grid-cols-5">
          {trust.map(({ Icon, title, sub }, i) => (
            <Reveal key={title} delay={i * 80} className={`flex items-center gap-3 lg:justify-center ${i > 0 ? "lg:border-l lg:border-slate-200" : ""}`}>
              <Icon size={34} strokeWidth={1.5} className="shrink-0 text-teal-600" />
              <p className="text-sm leading-tight">
                <span className="block font-semibold text-ink">{title}</span>
                <span className="text-slate-600">{sub}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trending packages */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="Trending" highlight="Tour Packages" subtitle="Handpicked holidays for every kind of traveller" link={{ href: "/tour-packages", label: "View All Packages" }} />
          <Reveal>
            <Carousel>
              {trending.map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* Intro + interests: "Let us plan you a perfect India Holiday" */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-50/70 to-white py-16 sm:py-20">
        <div className="container grid items-center gap-12 lg:grid-cols-[0.9fr_1.4fr]">
          <Reveal variant="left">
            <p className="eyebrow">Why travel with us</p>
            <h2 className="mt-3 text-4xl font-light leading-tight text-ink sm:text-5xl">
              Let us plan you a perfect <span className="font-bold text-saffron-500">India Holiday</span>
            </h2>
            <p className="mt-5 text-slate-600">
              BringYatra is a full-service travel company from Odisha. We craft tour packages around how you like to travel, from a two-day weekend break to a two-week Char Dham yatra. Our experts hand-pick every hotel, cab and experience, so all you pack is excitement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tour-packages" className="btn-navy">
                Explore Packages <ArrowRight size={18} />
              </Link>
              <EnquiryButton className="btn-outline">Talk to an Expert</EnquiryButton>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {interests.map((it, i) => (
              <Reveal key={it.slug} delay={i * 70} variant="zoom">
                <Link href={`/tour-packages?category=${it.slug}`} className="group block rounded-2xl bg-white p-3 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex items-start justify-between px-1 pb-2.5">
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink">{it.label}</h3>
                      <p className="text-xs text-slate-500">{it.count} Packages</p>
                    </div>
                    <ArrowRight size={16} className="mt-1 -rotate-45 text-saffron-500 transition group-hover:rotate-0" />
                  </div>
                  <div className="zoom-img relative aspect-[4/3.2] overflow-hidden rounded-xl">
                    <Image src={img(it.image, 500)} alt={it.label} fill sizes="(max-width:640px) 45vw, 18vw" className="object-cover" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer: the 8 services */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading center eyebrow="What we offer" title="Every Kind of Journey," highlight="One Trusted Partner" subtitle="From quick weekend breaks to once-in-a-lifetime pilgrimages, BringYatra plans it all." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 90}>
                <Link href={s.href} className="group relative block aspect-[3/3.6] overflow-hidden rounded-3xl">
                  <div className="zoom-img absolute inset-0">
                    <Image src={img(s.image, 700)} alt={s.title} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" className="object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/30 to-transparent transition-colors duration-500 group-hover:from-navy-900" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{s.count}</span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="text-xl font-semibold leading-snug">{s.title}</h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">{s.blurb}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400">
                      Explore <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by region */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="Explore Top Destinations" highlight="by Region" subtitle="From the snow peaks of the north to the temple coast of the east" />
          <Reveal>
            <RegionTabs />
          </Reveal>
        </div>
      </section>

      {/* Odisha special */}
      <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-24">
        <Image src={img("konark", 2000)} alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/95 to-navy-900/60" />
        <div className="container relative grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <Reveal variant="left" className="min-w-0">
            <p className="eyebrow text-amber-400">Odisha Special · Our home turf</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              Discover the Soul of <span className="text-saffron-400">Odisha</span>
            </h2>
            <p className="mt-5 text-white/80">
              Jagannath Dham in Puri, the Sun Temple of Konark, Asia&apos;s largest brackish-water lagoon at Chilika and the 700-temple city of Bhubaneswar. Our local experts know every lane, festival and hidden beach.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {["Rath Yatra specials", "Temple darshan help", "Chilika dolphin safari", "Tribal & craft villages"].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> {x}
                </li>
              ))}
            </ul>
            <Link href="/odisha-tours" className="btn-primary mt-8">
              View Odisha Packages <ArrowRight size={18} />
            </Link>
          </Reveal>
          <Reveal variant="right" className="min-w-0">
            <Carousel itemClassName="w-[82%] sm:w-[48%] xl:w-[48%]">
              {odisha.map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* Packages by interest */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="Packages" highlight="By Interest" subtitle="Pick a mood, and we'll show you the holidays that fit" link={{ href: "/holidays", label: "All Holiday Themes" }} />
          <Reveal>
            <InterestTabs />
          </Reveal>
        </div>
      </section>

      {/* Weekend getaways */}
      <section className="bg-gradient-to-b from-saffron-50/60 to-white py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="Top Weekend" highlight="Getaways" subtitle="Short breaks near your city: leave Friday night, back by Monday" link={{ href: "/weekend-getaways", label: "View All Getaways" }} />
          <Reveal>
            <Carousel itemClassName="w-[70%] sm:w-[40%] lg:w-[23.6%] xl:w-[18.8%]">
              {weekendCities.map((c) => (
                <Link key={c.city} href="/weekend-getaways" className="group block">
                  <div className="zoom-img relative aspect-[3/4] overflow-hidden rounded-2xl">
                    <Image src={img(c.image, 500)} alt={`Weekend getaways from ${c.city}`} fill sizes="(max-width:640px) 70vw, 20vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-4 right-4 text-xs text-white/85">{c.picks.join(" · ")}</p>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">{c.count} Getaways</p>
                  <h3 className="font-semibold text-ink group-hover:text-navy-600">
                    Weekend Getaways from <span className="font-bold">{c.city}</span>
                  </h3>
                </Link>
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* Bookings band */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading center eyebrow="One stop for travel" title="Flight, Bus &" highlight="Hotel Bookings" subtitle="Best fares and verified stays, with no hidden charges." />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Flights", text: "Domestic and international fares compared across airlines, with free date changes on select fares.", Icon: Plane, image: "flightWing" as const, href: "/flights" },
              { title: "Buses", text: "AC Volvo, sleeper and seater buses from trusted operators. Pick your seat and track live.", Icon: Bus, image: "bus" as const, href: "/buses" },
              { title: "Hotels", text: "From budget stays to beach resorts, every hotel is checked by our team. Pay at hotel on select stays.", Icon: BedDouble, image: "resort" as const, href: "/hotels" },
            ].map((b, i) => (
              <Reveal key={b.title} delay={i * 120}>
                <Link href={b.href} className="group block overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="zoom-img relative aspect-[16/9] overflow-hidden">
                    <Image src={img(b.image, 900)} alt={`${b.title} booking`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <div className="relative p-6 pt-10">
                    <span className="absolute -top-7 left-6 grid h-14 w-14 place-items-center rounded-2xl bg-saffron-500 text-white shadow-lg ring-4 ring-white">
                      <b.Icon size={26} />
                    </span>
                    <h3 className="text-xl font-semibold text-ink">Book {b.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{b.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 group-hover:text-saffron-500">
                      Book now <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Group tours CTA with parallax background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: `url(${img("group", 2000)})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-saffron-900/40" />
        <div className="container relative grid gap-10 py-20 text-white sm:py-28 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <Reveal variant="left">
            <p className="eyebrow text-amber-400">
              <Users size={16} /> Customized Group Tours
            </p>
            <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">Travelling with 10 or 500? We&apos;ve got your group covered.</h2>
            <p className="mt-5 max-w-xl text-white/85">
              Corporate offsites, school and college trips, family reunions, wedding guests and yatra groups. You get a dedicated tour manager, bulk flight and train blocks, custom meal plans and group discounts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/group-tours" className="btn-primary">
                Plan a Group Tour <ArrowRight size={18} />
              </Link>
              <EnquiryButton subject="Group tour enquiry" className="btn border border-white/40 text-white hover:bg-white hover:text-navy-900">
                Get a Group Quote
              </EnquiryButton>
            </div>
          </Reveal>
          <Reveal variant="right" className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <p className="font-display text-3xl font-bold text-amber-400 sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm text-white/80">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 sm:py-20">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal variant="left" className="relative">
            <div className="relative aspect-[4/4.2] overflow-hidden rounded-[2rem]">
              <Image src={img("coupleLake", 1100)} alt="Travellers enjoying a lake view" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-2 w-48 animate-floaty rounded-2xl bg-white p-4 shadow-lift sm:-right-6 sm:w-56">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>
              <p className="mt-1 font-display text-2xl font-bold text-ink">4.9/5</p>
              <p className="text-xs text-slate-500">from 8,400+ verified reviews</p>
            </div>
            <div className="absolute -left-2 top-8 hidden rounded-2xl bg-navy-800 px-5 py-4 text-white shadow-lift sm:block">
              <p className="font-display text-3xl font-bold text-amber-400">12+</p>
              <p className="text-xs text-white/80">Years crafting journeys</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Why BringYatra" title="We Bring Your" highlight="Journeys to Life" subtitle="Thousands of families, couples and pilgrims trust us every year. Here's why." />
            <div className="grid gap-5 sm:grid-cols-2">
              {whyUs.map((w, i) => {
                const Icon = whyIcons[w.icon];
                return (
                  <Reveal key={w.title} delay={i * 90} className="rounded-2xl border border-slate-100 p-5 transition hover:border-saffron-200 hover:shadow-card">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-navy-600 to-teal-500 text-white">
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-4 font-semibold text-ink">{w.title}</h3>
                    <p className="mt-1.5 text-sm text-slate-600">{w.text}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy-50/60 py-16 sm:py-20" id="reviews">
        <div className="container">
          <SectionHeading center eyebrow="Guest Satisfaction" title="What Our" highlight="Travellers Say" />
          <Reveal>
            <Carousel itemClassName="w-[88%] sm:w-[48%] lg:w-[32%]" autoplay={5000}>
              {testimonials.map((t) => (
                <figure key={t.name} className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-card">
                  <Quote size={36} className="text-saffron-200" />
                  <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-700">{t.text}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy-700 to-teal-500 font-display text-lg font-bold text-white">
                      {t.name[0]}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-ink">{t.name}</span>
                      <span className="block text-xs text-slate-500">
                        {t.city} · {t.trip}
                      </span>
                    </span>
                    <span className="ml-auto flex shrink-0 text-amber-500">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={14} className="fill-current" />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="Latest" highlight="Travel Stories" subtitle="Guides, festival calendars and tips from our travel experts" />
          <div className="grid gap-6 md:grid-cols-3">
            {blogs.map((b, i) => (
              <Reveal key={b.title} delay={i * 110}>
                <article className="group">
                  <div className="zoom-img relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <Image src={img(b.image, 800)} alt={b.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-700">{b.tag}</span>
                  </div>
                  <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarDays size={14} /> {b.date}
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold leading-snug text-ink transition group-hover:text-navy-600">{b.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{b.excerpt}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading title="Frequently Asked" highlight="Questions" />
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 60}>
                  <details className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-card" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <ChevronDown size={20} className="shrink-0 text-saffron-500 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal variant="right" className="relative overflow-hidden rounded-3xl bg-navy-800 p-8 text-white">
            <Image src={img("toyTrain", 900)} alt="" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover opacity-25" />
            <div className="relative">
              <p className="eyebrow text-amber-400">
                <MapPin size={16} /> Free trip planning
              </p>
              <h3 className="mt-3 text-3xl font-bold leading-tight">It&apos;s time for new experiences.</h3>
              <p className="mt-3 text-white/80">Tell us where you want to go. Our experts will design a day-by-day plan and a transparent quote, free of charge.</p>
              <EnquiryButton className="btn-primary mt-7 w-full">Plan My Trip</EnquiryButton>
              <p className="mt-4 text-center text-sm text-white/70">or call us 24×7 on <span className="font-semibold text-white">+91 91234 56789</span></p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
