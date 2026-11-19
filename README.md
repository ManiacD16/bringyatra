# BringYatra — *Bringing Journeys to Life.*

Travel agency website UI built with **Next.js 15 (App Router) · Tailwind CSS 3 · TypeScript**.
UI only: no backend. Forms show a success state, and the search widgets show a demo notice.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build for deployment

```bash
npm run build      # creates the ./build folder
npm start          # optional: preview ./build locally at http://localhost:3000
```

`npm run build` creates a **static website** in the `build/` folder: plain HTML, CSS, JS and images, with no Node.js server needed.

## Deploy

Upload the **contents** of `build/` to any web host:

- **cPanel / Hostinger / GoDaddy (shared hosting):** open File Manager → `public_html`, then upload everything inside `build/`, including the hidden `.htaccess` file. Or zip it, upload the zip and extract it there.
- **Netlify:** drag and drop the `build` folder at app.netlify.com/drop, or connect the repo with build command `npm run build` and publish directory `build`.
- **Vercel:** import the repo; it detects the settings automatically.
- **GitHub Pages / S3 / Firebase Hosting / Nginx:** serve the `build` folder as the site root and set `404.html` as the error page.

Upload it to the root of your domain (e.g. `bringyatra.com`), not a subfolder.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero slideshow + Flights/Hotels/Buses/Holidays/Tour search, trust strip, trending packages, interests, the 8 services, destinations by region, Odisha special, packages by interest, weekend getaways, bookings, group tours + counters, why us, testimonials, blog, FAQ |
| `/tour-packages` | All packages with category / region / duration filters, search and sort (URL-driven, e.g. `?category=honeymoon`) |
| `/tour-packages/[slug]` | Package detail: gallery, overview, day-wise itinerary, inclusions, price card, enquiry form (19 pre-rendered packages) |
| `/odisha-tours` | Odisha special: places, packages, festival calendar |
| `/group-tours` | Customized group tours + quote form |
| `/weekend-getaways` | Getaways by city + weekend packages |
| `/holidays` | Holiday themes (family, honeymoon, pilgrimage …) |
| ~~`/flights`, `/buses`, `/hotels`~~ | **Temporarily hidden.** The booking pages live in `app/_flights`, `app/_buses`, `app/_hotels`. Rename them without the `_` and search the code for `BOOKINGS (temporarily hidden)` to restore them |
| `/offers`, `/about`, `/contact` | Offers with copyable codes, about, and contact with map |
| `/legal/terms-and-conditions`, `/legal/privacy-policy`, `/legal/cancellation-policy`, `/legal/refund-policy`, `/legal/legal-policy` | Policy pages (content in `lib/legal.ts`) |

## Editing content

- **All text, packages, prices, itineraries, testimonials, FAQs and navigation:** `lib/data.ts`
- **Photos:** `lib/images.ts` (one id per photo; change an id to swap that photo site-wide)
- **Brand colours:** `tailwind.config.ts` (`navy`, `saffron`, `teal`, `amber`, sampled from the logo)
- **Logo / icon:** `public/images/logo.png`, `public/images/icon.png`, favicon `app/icon.png`. The original SVGs are in `brand/`.
- **Customer care number, email, legal name and registered address:** `site` in `lib/data.ts` (used by the header, footer, floating call button and Contact page)

## Design notes

- **Fonts:** Poppins (headings) and Inter (body), self-hosted via `@fontsource`, so the build needs no network access for fonts.
- **Scroll behaviour** follows tourmyindia.com: smooth scrolling, slide-by-one carousels with round arrow buttons, a fixed bottom quick-links bar, and floating Call / Plan Your Trip buttons. On top of that, sections fade and slide in as you scroll (`components/Reveal.tsx`), counters count up, the hero uses a Ken Burns zoom, and the header hides on scroll-down and returns on scroll-up. All motion respects `prefers-reduced-motion`.
- **Photos** are real travel photos from [Unsplash](https://unsplash.com), free to use under the Unsplash License, served through `next/image`. For production you may want to replace them with your own trip photos.
- Testimonials, blog posts, offers, prices and stats are placeholder content. Replace them before going live.
- The policy pages in `lib/legal.ts` are a sensible starting template for an Indian travel agency, not legal advice. Have them reviewed by your lawyer or CA before going live, especially the cancellation slabs and refund timelines.
