import type { Metadata } from "next";
import Image from "next/image";
import { Briefcase, Church, GraduationCap, Heart, PartyPopper, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import { EnquiryForm } from "@/components/Enquiry";
import { byCategory } from "@/lib/data";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Customized Group Tours",
  description: "Corporate offsites, school and college trips, family reunions and pilgrimage groups, fully customised by BringYatra.",
};

const types = [
  { Icon: Briefcase, title: "Corporate & MICE", text: "Offsites, incentive trips, conferences and team-building with full event management." },
  { Icon: GraduationCap, title: "School & College", text: "Educational tours with safety-first planning, chaperones and student-friendly budgets." },
  { Icon: Church, title: "Yatra & Pilgrimage Groups", text: "Char Dham, Jagannath Puri, Kashi and Tirupati, with darshan help and satvik meals." },
  { Icon: Users, title: "Family Reunions", text: "Multi-generation trips with villas, private coaches and activities for every age." },
  { Icon: Heart, title: "Wedding Guests", text: "Guest travel, hotel blocks and local sightseeing for destination weddings." },
  { Icon: PartyPopper, title: "Friends & Clubs", text: "Bachelor trips, cycling clubs and senior-citizen groups. You name it, we plan it." },
];

const steps = [
  { n: "01", title: "Share your plan", text: "Tell us your group size, dates, budget and must-dos." },
  { n: "02", title: "Get a custom itinerary", text: "Receive a day-wise plan and a transparent per-head quote within 24 hours." },
  { n: "03", title: "Fine-tune & confirm", text: "Tweak hotels, meals and activities, then confirm with a small advance." },
  { n: "04", title: "Travel stress-free", text: "A dedicated tour manager travels with your group, available 24×7." },
];

export default function GroupToursPage() {
  return (
    <>
      <PageHero
        tall
        image={img("group", 2000)}
        crumbs={[{ label: "Customized Group Tours" }]}
        title={<>Customized <span className="text-amber-400">Group Tours</span></>}
        subtitle="From 10 to 500+ travellers: one plan, one point of contact and better group prices."
      />

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading center eyebrow="Who we plan for" title="Group Tours for" highlight="Every Occasion" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {types.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 3) * 90} className="group rounded-3xl border border-slate-100 bg-white p-7 shadow-card transition hover:-translate-y-1.5 hover:shadow-lift">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-navy-700 to-teal-500 text-white transition group-hover:from-saffron-500 group-hover:to-amber-500">
                  <Icon size={26} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container">
          <SectionHeading center light eyebrow="How it works" title="Plan Your Group Tour in" highlight="4 Easy Steps" />
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 110} className="relative rounded-3xl border border-white/10 bg-white/5 p-6">
                <span className="font-display text-5xl font-bold text-saffron-500/80">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" id="enquire">
        <div className="container grid gap-10 lg:grid-cols-2">
          <Reveal variant="left" className="relative min-h-[360px] overflow-hidden rounded-[2rem]">
            <Image src={img("friends", 1200)} alt="A group of friends smiling together" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
            <div className="absolute bottom-0 p-8 text-white">
              <p className="font-display text-4xl font-bold text-amber-400">500+</p>
              <p className="text-white/85">groups travelled with BringYatra last year</p>
            </div>
          </Reveal>
          <Reveal variant="right" className="rounded-3xl border border-slate-100 bg-white p-7 shadow-lift sm:p-9">
            <h2 className="text-2xl font-bold text-ink">Request a Group Quote</h2>
            <p className="mb-6 mt-1 text-sm text-slate-600">Our group desk will reply within 24 hours.</p>
            <EnquiryForm subject="Group tour" />
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container">
          <SectionHeading title="Popular" highlight="Group Itineraries" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {byCategory("group").map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
