import Image from "next/image";
import type { ReactNode } from "react";
import { BadgePercent, Heart, Info, MapPinned } from "lucide-react";
import { img, type ImageKey } from "@/lib/images";

const perks = [
  { Icon: BadgePercent, text: "Member-only deals & early-bird offers" },
  { Icon: Heart, text: "Save packages to your wishlist" },
  { Icon: MapPinned, text: "Track enquiries & upcoming trips" },
];

/** Split layout used by the login / signup / forgot-password pages. */
export default function AuthShell({ title, subtitle, image, children }: { title: string; subtitle: string; image: ImageKey; children: ReactNode }) {
  return (
    <section className="bg-slate-50 py-10 sm:py-16">
      <div className="container">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-lift lg:grid-cols-[1fr_1.1fr]">
          <div className="relative hidden min-h-[560px] lg:block">
            <Image src={img(image, 1200)} alt="" fill priority sizes="500px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/50 to-navy-900/10" />
            <div className="absolute inset-x-0 bottom-0 p-9 text-white">
              <p className="eyebrow text-amber-400">BringYatra Members</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight">Bringing Journeys to Life.</h2>
              <ul className="mt-5 space-y-3 text-sm text-white/90">
                {perks.map(({ Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/15"><Icon size={16} /></span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-ink">{title}</h1>
            <p className="mt-1.5 text-sm text-slate-600">{subtitle}</p>
              <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
