import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/data";

/** BringYatra logo with tagline, matching the brand lock-up. */
export default function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="BringYatra home" className={`inline-flex flex-col ${className}`}>
      <Image
        src="/images/logo.png"
        alt="BringYatra"
        width={900}
        height={261}
        priority
        className={`h-auto w-[150px] sm:w-[178px] ${light ? "rounded-lg bg-white px-2 py-1" : ""}`}
      />
      <span
        className={`-mt-0.5 whitespace-nowrap pl-[22%] text-[10px] font-medium tracking-wide sm:text-[12px] ${light ? "mt-1 text-white/80" : "text-navy-800"}`}
      >
        {site.tagline}
      </span>
    </Link>
  );
}
