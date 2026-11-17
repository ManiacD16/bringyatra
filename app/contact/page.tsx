import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { EnquiryForm } from "@/components/Enquiry";
import { site } from "@/lib/data";
import { img } from "@/lib/images";

export const metadata: Metadata = { title: "Contact Us", description: "Call, WhatsApp or visit BringYatra in Bhubaneswar. We reply within 30 minutes." };

const cards = [
  { Icon: Phone, title: "Call us", value: site.phone, sub: "24×7 travel helpline" },
  { Icon: MessageCircle, title: "WhatsApp", value: site.whatsapp, sub: "Quick replies on chat" },
  { Icon: Mail, title: "Email", value: site.email, sub: "Reply within 2 hours" },
  { Icon: Clock, title: "Office hours", value: site.hours, sub: "Visit us for a chai" },
];

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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ Icon, title, value, sub }, i) => (
              <Reveal key={title} delay={i * 80} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-navy-700 to-teal-500 text-white"><Icon size={22} /></span>
                <p className="mt-4 text-sm text-slate-500">{title}</p>
                <p className="mt-0.5 break-words font-semibold text-ink">{value}</p>
                <p className="mt-1 text-xs text-slate-500">{sub}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Reveal variant="left" className="rounded-3xl border border-slate-100 bg-white p-7 shadow-lift sm:p-9">
              <h2 className="text-2xl font-bold text-ink">Send us a message</h2>
              <p className="mb-6 mt-1 text-sm text-slate-600">We usually reply within 30 minutes during office hours.</p>
              <EnquiryForm />
            </Reveal>
            <Reveal variant="right" className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 shadow-card">
              <div className="relative min-h-[300px] flex-1 bg-navy-50">
                <iframe
                  title="BringYatra office location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=85.828%2C20.282%2C85.860%2C20.302&layer=mapnik&marker=20.292%2C85.844"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start gap-3 bg-white p-6">
                <MapPin size={20} className="mt-0.5 shrink-0 text-saffron-500" />
                <div>
                  <p className="font-semibold text-ink">BringYatra Head Office</p>
                  <p className="text-sm text-slate-600">{site.address}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
