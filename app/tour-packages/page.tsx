import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import PackagesExplorer from "@/components/PackagesExplorer";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Tour Packages",
  description: "Browse domestic tour packages across India: honeymoon, family, pilgrimage, weekend, group and Odisha special tours.",
};

export default function TourPackagesPage() {
  return (
    <>
      <PageHero
        image={img("himalayaValley", 2000)}
        title={<>India Tour <span className="text-amber-400">Packages</span></>}
        subtitle="350+ handpicked itineraries with verified hotels, private transfers and 24×7 support."
        crumbs={[{ label: "Tour Packages" }]}
      />
      <section className="bg-slate-50/70 py-12 sm:py-16">
        <div className="container">
          <Suspense fallback={<div className="h-96" />}>
            <PackagesExplorer />
          </Suspense>
        </div>
      </section>
    </>
  );
}
