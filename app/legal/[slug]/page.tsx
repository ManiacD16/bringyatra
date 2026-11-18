import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, FileText, Mail, Phone } from "lucide-react";
import { site } from "@/lib/data";
import { getLegalPage, lastUpdated, legalPages, type Block } from "@/lib/legal";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = getLegalPage((await params).slug);
  return page ? { title: page.title, description: page.summary } : {};
}

function renderBlock(block: Block, key: number) {
  if (typeof block === "string") {
    return (
      <p key={key} className="leading-relaxed text-slate-700">
        {block}
      </p>
    );
  }
  if (Array.isArray(block)) {
    return (
      <ul key={key} className="space-y-2">
        {block.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-slate-700">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-500" />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  const hasHead = block.head.some(Boolean);
  return (
    <div key={key} className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[420px] text-left text-sm">
        {hasHead && (
          <thead className="bg-navy-50 text-navy-800">
            <tr>
              {block.head.map((h) => (
                <th key={h} className="px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {block.rows.map((row) => (
            <tr key={row.join()} className="border-t border-slate-100 first:border-t-0 even:bg-slate-50/60">
              {row.map((cell, i) => (
                <td key={i} className={`px-4 py-3 align-top ${i === 0 ? "font-medium text-ink" : "text-slate-700"}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function LegalPolicyPage({ params }: Params) {
  const page = getLegalPage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <section className="bg-gradient-to-br from-navy-950 via-navy-800 to-navy-600 py-14 text-white sm:py-20">
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Policies</span>
            <ChevronRight size={14} />
            <span className="text-white">{page.title}</span>
          </nav>
          <h1 className="text-4xl font-bold sm:text-5xl">{page.title}</h1>
          <p className="mt-3 max-w-2xl text-white/80">{page.summary}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white/85">
            <CalendarDays size={14} /> Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit space-y-6 lg:sticky lg:top-28">
            <nav aria-label="Policies" className="rounded-2xl border border-slate-100 bg-white p-3 shadow-card">
              <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Policies</p>
              {legalPages.map((p) => {
                const active = p.slug === page.slug;
                return (
                  <Link
                    key={p.slug}
                    href={`/legal/${p.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active ? "bg-navy-800 text-white" : "text-slate-700 hover:bg-navy-50 hover:text-navy-700"
                    }`}
                  >
                    <FileText size={16} className={active ? "text-amber-400" : "text-saffron-500"} />
                    {p.title}
                  </Link>
                );
              })}
            </nav>

            <nav aria-label="On this page" className="hidden rounded-2xl border border-slate-100 p-5 lg:block">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">On this page</p>
              <ul className="space-y-2 text-sm">
                {page.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-slate-600 hover:text-navy-600">{s.heading.replace(/^\d+\.\s*/, "")}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="min-w-0 max-w-3xl">
            <div className="space-y-10">
              {page.sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="mb-4 text-xl font-semibold text-ink sm:text-2xl">{s.heading}</h2>
                  <div className="space-y-4">{s.body.map(renderBlock)}</div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-navy-50 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-ink">Questions about this policy?</h2>
              <p className="mt-1 text-sm text-slate-600">Our team is happy to help. Reach us on:</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={`tel:${site.tel}`} className="btn-navy py-2.5"><Phone size={16} /> {site.phone}</a>
                <a href={`mailto:${site.email}`} className="btn-outline py-2.5"><Mail size={16} /> {site.email}</a>
              </div>
              <p className="mt-4 text-xs text-slate-500">BringYatra is a brand of {site.legalName}, {site.address}.</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
