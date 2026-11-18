import type { Metadata } from "next";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { EnquiryForm } from "@/components/Enquiry";
import { site } from "@/lib/data";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact BringYatra: Customer Care ${site.phone}, ${site.email}. ${site.legalName}, ${site.address}.`,
};

const cards = [
  { Icon: Phone, title: "Customer Care", value: site.phone, sub: "Call us for bookings & support", href: `tel:${site.tel}` },
  { Icon: Mail, title: "Email", value: site.email, sub: "Write to us anytime", href: `mailto:${site.email}` },
  { Icon: Building2, title: "Legal Name", value: site.legalName, sub: "BringYatra is a brand of Billbring" },
];

// Spaze Itech Park, Sohna Road, Sector 49, Gurugram
const map = "https://www.openstreetmap.org/export/embed.html?bbox=77.0335%2C28.4050%2C77.0535%2C28.4190&layer=mapnik&marker=28.4120%2C77.0435";

export default function ContactPage() {
  return (
    <>
      <PageHero
        image={img("odishaBeach", 2000)}
        crumbs={[{ label: "Contact Us" }]}
        title={<>Let&apos;s Plan Your <span className="text-amber-400">Next Journey</span></>}
        subtitle="Questions, quotes or custom itineraries: our travel experts are a call away."
      />
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map(({ Icon, title, value, sub, href }, i) => {
              const body = (
                <>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-navy-700 to-teal-500 text-white">
                    <Icon size={22} />
                  </span>
                  <p className="mt-4 text-sm text-slate-500">{title}</p>
                  <p className="mt-0.5 break-words font-semibold text-ink">{value}</p>
                  <p className="mt-1 text-xs text-slate-500">{sub}</p>
                </>
              );
              return (
                <Reveal key={title} delay={i * 80}>
                  {href ? (
                    <a href={href} className="block h-full rounded-3xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-saffron-200">
                      {body}
                    </a>
                  ) : (
                    <div className="h-full rounded-3xl border border-slate-100 bg-white p-6 shadow-card">{body}</div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Reveal variant="left" className="rounded-3xl border border-slate-100 bg-white p-7 shadow-lift sm:p-9">
              <h2 className="text-2xl font-bold text-ink">Send us a message</h2>
              <p className="mb-6 mt-1 text-sm text-slate-600">Our travel expert will get back to you shortly.</p>
              <EnquiryForm />
            </Reveal>
            <Reveal variant="right" className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 shadow-card">
              <div className="relative min-h-[300px] flex-1 bg-navy-50">
                <iframe title="BringYatra office location" src={map} className="absolute inset-0 h-full w-full border-0" loading="lazy" />
              </div>
              <div className="flex items-start gap-3 bg-white p-6">
                <MapPin size={20} className="mt-0.5 shrink-0 text-saffron-500" />
                <div>
                  <p className="font-semibold text-ink">{site.legalName}</p>
                  <p className="mt-0.5 text-sm text-slate-600">{site.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Spaze Itech Park Tower B3, Sohna Road, Sector 49, Gurugram")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-navy-600 hover:text-saffron-500"
                  >
                    Get directions →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
