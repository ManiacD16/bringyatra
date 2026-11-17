import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

type Props = {
  title: string;
  highlight?: string;
  subtitle?: string;
  eyebrow?: string;
  link?: { href: string; label: string };
  center?: boolean;
  light?: boolean;
};

export default function SectionHeading({ title, highlight, subtitle, eyebrow, link, center, light }: Props) {
  return (
    <Reveal
      className={`mb-8 flex flex-col gap-4 md:mb-10 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div className={center ? "max-w-2xl" : "max-w-3xl"}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2
          className={`text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl ${light ? "text-white" : "text-ink"}`}
        >
          {title} {highlight && <span className="text-navy-600">{highlight}</span>}
        </h2>
        {subtitle && (
          <p className={`mt-2 text-[15px] sm:text-base ${light ? "text-white/80" : "text-slate-600"}`}>{subtitle}</p>
        )}
        {center && <span className="mx-auto mt-4 block h-1 w-14 rounded-full bg-saffron-500" />}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy-600 hover:text-saffron-500"
        >
          {link.label}
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </Reveal>
  );
}
