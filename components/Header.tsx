"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, Mail, Menu, Phone, Smartphone, User, X } from "lucide-react";
import Logo from "./Logo";
import { nav, site } from "@/lib/data";

function TopBar() {
  return (
    <div className="hidden border-b border-slate-100 bg-slate-50/80 text-[13px] text-slate-700 md:block">
      <div className="container flex h-10 items-center justify-between">
        <p className="truncate">
          <span className="font-semibold text-saffron-500">Winter Sale is live:</span> up to 25% off on Kashmir, Kerala &amp; Odisha tours
        </p>
        <div className="flex items-center gap-5">
          <a href={`tel:${site.tel}`} className="flex items-center gap-1.5 hover:text-navy-600">
            <Phone size={14} /> {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-navy-600">
            <Mail size={14} /> {site.email}
          </a>
          <span className="h-4 w-px bg-slate-300" />
          <span className="flex items-center gap-1.5">
            <Smartphone size={14} /> Download App
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  // Sticky header: compacts after scrolling, slides away on scroll-down, returns on scroll-up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 500 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <TopBar />
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-all duration-500 ${
          scrolled ? "shadow-[0_8px_30px_-12px_rgba(1,53,100,0.25)]" : "border-b border-slate-100"
        } ${hidden && !mobile ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className={`container flex items-center justify-between transition-all duration-500 ${scrolled ? "h-[68px]" : "h-[84px]"}`}>
          <Logo />

          <nav className="hidden h-full items-center gap-1 xl:flex" aria-label="Main">
            {nav.map((item) => (
              <div key={item.label} className="group relative flex h-full items-center">
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1 px-3.5 py-2 text-[15px] font-medium transition-colors hover:text-navy-600 ${
                    isActive(item.href) ? "text-navy-600" : "text-ink"
                  }`}
                >
                  {item.label}
                  {item.mega && <ChevronDown size={15} className="transition-transform group-hover:rotate-180" />}
                  <span
                    className={`absolute -bottom-0.5 left-3.5 right-3.5 h-[3px] rounded-full bg-navy-600 transition-transform duration-300 ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
                {item.mega && (
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex gap-10 rounded-2xl border border-slate-100 bg-white p-7 shadow-lift">
                      {item.mega.map((col) => (
                        <div key={col.heading} className="min-w-[190px]">
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-saffron-500">{col.heading}</p>
                          <ul className="space-y-2">
                            {col.links.map((l) => (
                              <li key={l.label}>
                                <Link href={l.href} className="text-sm text-slate-700 transition hover:pl-1 hover:text-navy-600">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/tour-packages" className="hidden items-center gap-2 text-[15px] font-medium text-ink hover:text-navy-600 lg:flex">
              <Heart size={20} /> Wishlist
            </Link>
            <button className="hidden items-center gap-2 rounded-xl border-2 border-navy-700 px-4 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-700 hover:text-white sm:flex">
              <User size={18} /> Login / Sign Up
            </button>
            <button
              className="grid h-11 w-11 place-items-center rounded-xl bg-saffron-500 text-white xl:hidden"
              aria-label={mobile ? "Close menu" : "Open menu"}
              onClick={() => setMobile((v) => !v)}
            >
              {mobile ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`overflow-hidden border-t border-slate-100 bg-white transition-[max-height] duration-500 xl:hidden ${
            mobile ? "max-h-[80vh] overflow-y-auto" : "max-h-0"
          }`}
        >
          <nav className="container py-4" aria-label="Mobile">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-slate-100 last:border-0">
                <div className="flex items-center justify-between">
                  <Link href={item.href} className={`block py-3 font-medium ${isActive(item.href) ? "text-navy-600" : "text-ink"}`}>
                    {item.label}
                  </Link>
                  {item.mega && (
                    <button
                      aria-label={`Toggle ${item.label}`}
                      className="p-2"
                      onClick={() => setOpenSub((s) => (s === item.label ? null : item.label))}
                    >
                      <ChevronDown size={18} className={`transition-transform ${openSub === item.label ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {item.mega && openSub === item.label && (
                  <div className="grid gap-4 pb-4 sm:grid-cols-2">
                    {item.mega.map((col) => (
                      <div key={col.heading}>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-saffron-500">{col.heading}</p>
                        {col.links.map((l) => (
                          <Link key={l.label} href={l.href} className="block py-1.5 text-sm text-slate-700">
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href="/group-tours" className="btn-outline">Group Tours</Link>
              <button className="btn-navy">
                <User size={16} /> Login
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
