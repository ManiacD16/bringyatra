import Link from "next/link";
import { ArrowRight, BedDouble, Bus, Landmark, Mountain, Palmtree, Phone, Plane, Users } from "lucide-react";
import EnquiryButton from "../EnquiryButton";
import { site } from "@/lib/data";

const services = [
  { label: "Tour Packages", sub: "350+ itineraries", href: "/tour-packages", Icon: Mountain },
  { label: "Holidays", sub: "Family & honeymoon", href: "/holidays", Icon: Palmtree },
  { label: "Pilgrimage Tours", sub: "Char Dham, Puri & more", href: "/tour-packages?category=pilgrimage", Icon: Landmark },
  { label: "Group Tours", sub: "10 to 500+ travellers", href: "/group-tours", Icon: Users },
  { label: "Flight Booking", sub: "Best domestic fares", href: "/flights", Icon: Plane },
  { label: "Bus & Hotels", sub: "Volvo, sleeper & stays", href: "/hotels", Icon: BedDouble },
];

/** Hero card introducing BringYatra as a tour & travels company (stands in for the booking search box). */
export default function HeroIntro() {
  return (
    <div className="grid gap-6 rounded-2xl bg-white p-5 shadow-[0_24px_60px_-20px_rgba(1,26,51,0.45)] sm:p-7 lg:grid-cols-[1fr_1.7fr] lg:items-center lg:gap-10">
      <div>
        <p className="eyebrow">
          <Bus size={16} /> BringYatra Tour &amp; Travels
        </p>
        <h2 className="mt-2 text-2xl font-bold leading-tight text-ink sm:text-[1.75rem]">
          Tours, holidays &amp; travel bookings, <span className="text-navy-600">all in one place</span>
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Tell us where you want to go. Our travel experts plan the itinerary, hotels, transport and sightseeing for you.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <EnquiryButton className="btn-primary">
            Plan My Trip <ArrowRight size={18} />
          </EnquiryButton>
          <a href={`tel:${site.tel}`} className="btn-outline">
            <Phone size={16} /> {site.phone}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {services.map(({ label, sub, href, Icon }) => (
          <Link
            key={label}
            href={href}
            className="group flex flex-col items-start gap-2 rounded-xl border border-slate-200 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron-300 hover:shadow-card sm:flex-row sm:items-center sm:gap-3 sm:p-4"
          >
            <span className="grid h-10 w-10 shrink-0 sm:h-11 sm:w-11 place-items-center rounded-xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-saffron-500 group-hover:text-white">
              <Icon size={22} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-ink sm:text-[15px]">{label}</span>
              <span className="block text-xs text-slate-500 sm:truncate">{sub}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
