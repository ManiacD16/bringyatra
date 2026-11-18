"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarCheck, Heart, LogOut, Mail, MapPinned, Phone, PartyPopper, Ticket, UserRound } from "lucide-react";
import { useAuth } from "@/components/Auth";
import EnquiryButton from "@/components/EnquiryButton";
import PackageCard from "@/components/PackageCard";
import { packages } from "@/lib/data";

const quick = [
  { label: "Domestic Tours", href: "/tour-packages", Icon: MapPinned },
  { label: "Holiday Packages", href: "/holidays", Icon: Heart },
  { label: "Odisha Special", href: "/odisha-tours", Icon: Ticket },
  { label: "Group Tours", href: "/group-tours", Icon: CalendarCheck },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, ready, logout } = useAuth();
  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    setWelcome(new URLSearchParams(window.location.search).has("welcome"));
  }, []);

  if (!ready) return <div className="min-h-[60vh]" />;

  if (!user) {
    return (
      <section className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-navy-50 text-navy-700"><UserRound size={30} /></span>
        <h1 className="mt-5 text-3xl font-bold text-ink">You&apos;re not logged in</h1>
        <p className="mt-2 max-w-md text-slate-600">Login or create a free account to see your trips, wishlist and member offers.</p>
        <div className="mt-7 flex gap-3">
          <Link href="/login" className="btn-navy">Login</Link>
          <Link href="/signup" className="btn-primary">Sign Up</Link>
        </div>
      </section>
    );
  }

  const first = user.name.split(" ")[0];
  const joined = new Date(user.joined).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <>
      <section className="bg-gradient-to-br from-navy-950 via-navy-800 to-navy-600 py-12 text-white sm:py-16">
        <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-saffron-400 to-amber-500 font-display text-2xl font-bold">
              {first[0]?.toUpperCase()}
            </span>
            <div>
              <h1 className="text-3xl font-bold">Namaste, {first}!</h1>
              <p className="text-sm text-white/75">BringYatra member since {joined}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="btn self-start border border-white/30 text-white hover:bg-white hover:text-navy-900 sm:self-auto"
          >
            <LogOut size={17} /> Logout
          </button>
        </div>
      </section>

      <section className="py-12">
        <div className="container grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit space-y-5">
            {welcome && (
              <div className="flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <PartyPopper size={20} className="shrink-0" /> Your account is ready. Welcome to BringYatra!
              </div>
            )}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <h2 className="font-semibold text-ink">Profile</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-3"><UserRound size={17} className="text-saffron-500" />{user.name}</li>
                <li className="flex items-center gap-3 break-all"><Mail size={17} className="shrink-0 text-saffron-500" />{user.email}</li>
                {user.phone && <li className="flex items-center gap-3"><Phone size={17} className="text-saffron-500" />{user.phone}</li>}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quick.map(({ label, href, Icon }) => (
                <Link key={label} href={href} className="flex flex-col items-start gap-2 rounded-xl border border-slate-100 bg-white p-4 text-sm font-medium text-ink shadow-card transition hover:-translate-y-0.5 hover:border-saffron-200">
                  <Icon size={20} className="text-navy-600" /> {label}
                </Link>
              ))}
            </div>
          </aside>

          <div className="min-w-0 space-y-8">
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <CalendarCheck size={36} className="mx-auto text-slate-400" />
              <h2 className="mt-3 text-xl font-semibold text-ink">No upcoming trips yet</h2>
              <p className="mt-1 text-sm text-slate-600">Once you book a tour with us, your itinerary and vouchers will show up here.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/tour-packages" className="btn-navy">Explore Tours</Link>
                <EnquiryButton className="btn-outline">Plan a Custom Trip</EnquiryButton>
              </div>
            </div>

            <div>
              <h2 className="mb-5 text-2xl font-bold text-ink">Recommended <span className="text-navy-600">for you</span></h2>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {packages.slice(0, 3).map((p) => (
                  <PackageCard key={p.slug} pkg={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
