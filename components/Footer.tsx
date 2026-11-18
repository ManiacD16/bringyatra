import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter, Youtube } from "lucide-react";
import Logo from "./Logo";
import { packages, site } from "@/lib/data";

const cols = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Offers & Deals", href: "/offers" },
      { label: "Customer Reviews", href: "/about#reviews" },
      { label: "Careers", href: "/about" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { label: "Domestic Tour Packages", href: "/tour-packages" },
      { label: "Weekend Getaways", href: "/weekend-getaways" },
      { label: "Family Holidays", href: "/tour-packages?category=family" },
      { label: "Honeymoon Packages", href: "/tour-packages?category=honeymoon" },
      { label: "Pilgrimage Tours", href: "/tour-packages?category=pilgrimage" },
      { label: "Customized Group Tours", href: "/group-tours" },
      { label: "Odisha Special Tours", href: "/odisha-tours" },
    ],
  },
  {
    title: "Bookings",
    links: [
      { label: "Flight Booking", href: "/flights" },
      { label: "Bus Booking", href: "/buses" },
      { label: "Hotel Booking", href: "/hotels" },
      { label: "Holiday Packages", href: "/holidays" },
    ],
  },
  {
    title: "Top Packages",
    links: packages.slice(0, 7).map((p) => ({ label: p.title, href: `/tour-packages/${p.slug}` })),
  },
];

const socials = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Twitter, label: "X / Twitter" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pb-24 text-white/75 md:pb-20">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-saffron-500/10 blur-3xl" />

      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container flex flex-col items-start justify-between gap-6 py-10 lg:flex-row lg:items-center">
          <div>
            <h3 className="text-2xl font-bold text-white">Get exclusive travel deals in your inbox</h3>
            <p className="mt-1 text-sm">Early-bird offers, festival specials and new itineraries, once a week.</p>
          </div>
          <form className="flex w-full max-w-md gap-2">
            <input className="field border-white/10 bg-white/10 text-white placeholder:text-white/50 focus:ring-white/10" placeholder="Enter your email" type="email" aria-label="Email address" />
            <button type="button" className="btn-primary shrink-0">
              <Send size={16} /> Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container relative grid gap-10 py-14 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            BringYatra crafts domestic holidays, pilgrimages, honeymoons, Odisha specials and group tours across India, so every journey comes to life.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-saffron-400" />
              <span>
                <span className="block font-medium text-white">{site.legalName}</span>
                {site.address}
              </span>
            </li>
            <li>
              <a href={`tel:${site.tel}`} className="flex gap-3 hover:text-saffron-400">
                <Phone size={18} className="shrink-0 text-saffron-400" />
                Customer Care: {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 hover:text-saffron-400">
                <Mail size={18} className="shrink-0 text-saffron-400" />
                {site.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-2.5">
            {socials.map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-saffron-500 hover:text-white">
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-base font-semibold text-white">{c.title}</h4>
            <ul className="space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:pl-1 hover:text-saffron-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container relative flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.legalName}. BringYatra is a brand of {site.legalName}. All rights reserved.
        </p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-white">Terms &amp; Conditions</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Cancellation Policy</a>
        </div>
      </div>
    </footer>
  );
}
