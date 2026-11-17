import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  subtitle?: string;
  image: string;
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
  tall?: boolean;
};

export default function PageHero({ title, subtitle, image, crumbs = [], children, tall }: Props) {
  return (
    <section className={`relative flex items-end overflow-hidden bg-navy-900 ${tall ? "min-h-[520px]" : "min-h-[340px] sm:min-h-[400px]"}`}>
      <Image src={image} alt="" fill priority sizes="100vw" className="animate-kenburns object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/50 to-navy-900/20" />
      <div className="container relative pb-12 pt-24 text-white">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-white/75">
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight size={14} />
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
