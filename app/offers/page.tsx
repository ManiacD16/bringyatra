"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Copy, Check, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { img, type ImageKey } from "@/lib/images";

const offers: { title: string; text: string; code: string; tag: string; valid: string; image: ImageKey; href: string }[] = [
  { title: "Winter Sale: up to 25% OFF", text: "On Kashmir, Kerala and Odisha tour packages booked before 31 Dec.", code: "WINTER25", tag: "Holidays", valid: "Valid till 31 Dec 2026", image: "kashmir", href: "/tour-packages" },
  { title: "Flat ₹1,500 OFF on Flights", text: "On domestic round-trip flights booked via BringYatra.", code: "FLYBY1500", tag: "Flights", valid: "Valid till 15 Jan 2027", image: "flightWing", href: "/flights" },
  { title: "Honeymoon Special", text: "Free candlelight dinner and room upgrade on honeymoon packages.", code: "FOREVER", tag: "Honeymoon", valid: "Valid till 28 Feb 2027", image: "honeymoon", href: "/holidays/honeymoon" },
  { title: "Rath Yatra Early Bird", text: "Pre-book Puri stays for Rath Yatra 2027 and save 20%.", code: "JAGANNATH20", tag: "Odisha Special", valid: "Valid till 31 Mar 2027", image: "puri", href: "/odisha-tours" },
  { title: "10% OFF on Bus Tickets", text: "Up to ₹250 off on AC sleeper and Volvo buses.", code: "BUSY10", tag: "Buses", valid: "Valid till 31 Jan 2027", image: "bus", href: "/buses" },
  { title: "Group of 10+? Save 15%", text: "Extra group discount on any customized group tour.", code: "SQUAD15", tag: "Group Tours", valid: "Always on", image: "group", href: "/group-tours" },
];

function CodeChip({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(code).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="flex items-center gap-2 rounded-lg border-2 border-dashed border-saffron-300 bg-saffron-50 px-3 py-1.5 font-mono text-sm font-bold tracking-wider text-saffron-700"
      aria-label={`Copy code ${code}`}
    >
      {code} {copied ? <Check size={15} /> : <Copy size={15} />}
    </button>
  );
}

export default function OffersPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-600 py-16 text-white sm:py-20">
        <div className="container">
          <p className="eyebrow text-amber-400">Deals & Discounts</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-6xl">
            Today&apos;s Best <span className="text-amber-400">Offers</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/80">Copy a code and apply it at checkout, or share it with your travel expert.</p>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((o, i) => (
            <Reveal key={o.code} delay={(i % 3) * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-lift">
                <div className="zoom-img relative aspect-[16/8] overflow-hidden">
                  <Image src={img(o.image, 800)} alt={o.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-700">{o.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-semibold text-ink">{o.title}</h2>
                  <p className="mt-1.5 flex-1 text-sm text-slate-600">{o.text}</p>
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500"><Clock size={13} /> {o.valid}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <CodeChip code={o.code} />
                    <Link href={o.href} className="text-sm font-semibold text-navy-600 hover:text-saffron-500">Book now →</Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
