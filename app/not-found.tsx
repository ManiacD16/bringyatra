import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Image src="/images/icon.png" alt="" width={458} height={512} className="h-auto w-24 animate-floaty" />
      <p className="mt-6 font-display text-6xl font-bold text-navy-800">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-ink">Looks like this road isn&apos;t on our map</h1>
      <p className="mt-2 max-w-md text-slate-600">The page you&apos;re looking for has moved or never existed. Let&apos;s get you back on track.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">Back to Home</Link>
        <Link href="/tour-packages" className="btn-outline">Browse Packages</Link>
      </div>
    </section>
  );
}
