import type { CategorySlug } from "./data";
import type { ImageKey } from "./images";

/** Holiday theme landing pages: /holidays/[slug] */
export type HolidayTheme = {
  slug: string;
  category: CategorySlug;
  /** Matching option in the holiday enquiry form */
  formType: string;
  label: string;
  title: string;
  highlight: string;
  tagline: string;
  intro: string;
  image: ImageKey;
  perks: { title: string; text: string }[];
  destinations: { name: string; image: ImageKey; note: string }[];
};

export const holidayThemes: HolidayTheme[] = [
  {
    slug: "family",
    category: "family",
    formType: "Family",
    label: "Family Holidays",
    title: "Family",
    highlight: "Holidays",
    tagline: "Easy-paced trips that kids, parents and grandparents all enjoy.",
    intro:
      "Our family holidays are planned around comfort: family rooms or connecting rooms, private cabs, relaxed sightseeing and kid-friendly activities. Whether it's snow in Kashmir, houseboats in Kerala or temples in Odisha, everyone comes home happy.",
    image: "familySea",
    perks: [
      { title: "Family & connecting rooms", text: "Hotels picked for space and safety, with extra beds arranged." },
      { title: "Private AC cab", text: "One vehicle and driver for the whole trip, so there's no rushing for buses." },
      { title: "Kid-friendly plans", text: "Short drives, rest breaks and activities for children of every age." },
      { title: "Senior-citizen care", text: "Wheelchairs, ground-floor rooms and darshan help where needed." },
    ],
    destinations: [
      { name: "Kashmir", image: "kashmir", note: "Gondola rides & shikaras" },
      { name: "Kerala", image: "keralaHouseboat", note: "Houseboats & tea gardens" },
      { name: "Shimla Manali", image: "manali", note: "Snow & mountain views" },
      { name: "Odisha", image: "konarkWheel", note: "Temples, beaches & Chilika" },
    ],
  },
  {
    slug: "honeymoon",
    category: "honeymoon",
    formType: "Honeymoon",
    label: "Honeymoon Packages",
    title: "Honeymoon",
    highlight: "Packages",
    tagline: "Romantic escapes with the special touches that make it unforgettable.",
    intro:
      "Begin your forever with a trip designed for two. Every BringYatra honeymoon includes a romantic welcome, a candlelight dinner and handpicked couple-friendly stays, from Dal Lake houseboats to private Kerala backwater villas and Andaman beach resorts.",
    image: "honeymoonDance",
    perks: [
      { title: "Candlelight dinner", text: "One romantic dinner included on every honeymoon package." },
      { title: "Room decoration & cake", text: "Flower bed decoration and a honeymoon cake on arrival." },
      { title: "Couple-friendly stays", text: "Private, scenic hotels with room upgrades where available." },
      { title: "Private sightseeing", text: "Just the two of you, with no shared tours." },
    ],
    destinations: [
      { name: "Kashmir", image: "kashmirBoats", note: "Houseboat nights on Dal Lake" },
      { name: "Andaman", image: "andaman", note: "Turquoise beaches" },
      { name: "Kerala", image: "keralaHouseboat", note: "Private backwater cruise" },
      { name: "Goa", image: "goa", note: "Sunsets & beach shacks" },
    ],
  },
  {
    slug: "pilgrimage",
    category: "pilgrimage",
    formType: "Pilgrimage",
    label: "Religious & Pilgrimage Tours",
    title: "Religious &",
    highlight: "Pilgrimage Tours",
    tagline: "Peaceful yatras with darshan assistance and comfortable stays.",
    intro:
      "From the Char Dham in the Himalayas to Jagannath Dham in Puri, Kashi Vishwanath and the Golden Temple, we plan pilgrimages with care. We handle registrations, helicopter and pony bookings, satvik meals and senior-citizen support, so you can focus on your darshan.",
    image: "varanasiAarti",
    perks: [
      { title: "Darshan assistance", text: "Local guides and help with queues at major temples." },
      { title: "Yatra registrations", text: "Char Dham registration, helicopter and pony bookings handled." },
      { title: "Satvik meals", text: "Pure vegetarian meal options throughout the journey." },
      { title: "Senior-citizen friendly", text: "Comfortable pacing, doctor-on-call and wheelchair help." },
    ],
    destinations: [
      { name: "Char Dham", image: "kedarnath", note: "Kedarnath, Badrinath & more" },
      { name: "Jagannath Puri", image: "puri", note: "Shree Kshetra darshan" },
      { name: "Varanasi", image: "varanasi", note: "Kashi Vishwanath & Ganga Aarti" },
      { name: "Amritsar", image: "amritsar", note: "Golden Temple" },
    ],
  },
  {
    slug: "hill-station",
    category: "hill-station",
    formType: "Hill Station",
    label: "Hill Stations",
    title: "Hill Station",
    highlight: "Holidays",
    tagline: "Cool mountain air, misty valleys and cosy stays.",
    intro:
      "Escape the heat with India's favourite hill stations: the snow of Manali and Gulmarg, the tea gardens of Darjeeling and Munnar, and the living root bridges of Meghalaya. Our hill holidays include scenic stays, local sightseeing and comfortable mountain drives.",
    image: "himalayaVillage",
    perks: [
      { title: "Scenic stays", text: "Hotels with valley or mountain views wherever possible." },
      { title: "Experienced hill drivers", text: "Safe, comfortable drives on mountain roads." },
      { title: "Snow activities", text: "Skiing, snow-scooters and cable cars added on request." },
      { title: "Best-season advice", text: "We'll tell you when each hill station is at its best." },
    ],
    destinations: [
      { name: "Manali", image: "manaliSnow", note: "Solang & Atal Tunnel" },
      { name: "Darjeeling", image: "toyTrain", note: "Toy train & Tiger Hill" },
      { name: "Munnar", image: "munnar", note: "Tea gardens" },
      { name: "Meghalaya", image: "meghalayaFalls", note: "Waterfalls & root bridges" },
    ],
  },
  {
    slug: "beach",
    category: "beach",
    formType: "Beach",
    label: "Beach Holidays",
    title: "Beach",
    highlight: "Holidays",
    tagline: "Sun, sand and sea, from Goa to the Andamans and the Odisha coast.",
    intro:
      "Whether you want Goa's beach parties, the Andamans' crystal-clear water or the quiet golden sands of Gopalpur and Puri, our beach holidays include sea-facing stays, water sports and sunset cruises.",
    image: "goaHuts",
    perks: [
      { title: "Beach-side resorts", text: "Stays close to the sand, with pools where possible." },
      { title: "Water sports", text: "Snorkelling, parasailing and scuba added on request." },
      { title: "Sunset cruises", text: "Mandovi river and island-hopping cruises." },
      { title: "Island transfers", text: "Ferry and cruise bookings for the Andamans handled." },
    ],
    destinations: [
      { name: "Goa", image: "goaUmbrellas", note: "North & South Goa beaches" },
      { name: "Andaman", image: "andaman", note: "Havelock & Neil Island" },
      { name: "Puri & Gopalpur", image: "odishaBeach", note: "Odisha's golden coast" },
      { name: "Kerala", image: "kerala", note: "Kovalam & Varkala" },
    ],
  },
  {
    slug: "heritage",
    category: "heritage",
    formType: "Heritage",
    label: "Heritage Tours",
    title: "Heritage",
    highlight: "Tours",
    tagline: "Forts, palaces and ancient temples, with stories told by expert guides.",
    intro:
      "Walk through centuries of history: the Taj Mahal at sunrise, the forts and palaces of Rajasthan, and the 13th-century Sun Temple at Konark. Our heritage tours include licensed guides, heritage-hotel stays and well-timed visits that avoid the crowds.",
    image: "tajGolden",
    perks: [
      { title: "Licensed guides", text: "Expert local guides at every major monument." },
      { title: "Heritage stays", text: "Havelis and palace hotels on request." },
      { title: "Smart timing", text: "Sunrise visits and crowd-free slots where possible." },
      { title: "Culture evenings", text: "Folk dance, light-and-sound shows and local food." },
    ],
    destinations: [
      { name: "Golden Triangle", image: "taj", note: "Delhi · Agra · Jaipur" },
      { name: "Rajasthan", image: "udaipur", note: "Udaipur, Jodhpur & Jaipur" },
      { name: "Konark & Bhubaneswar", image: "lingaraj", note: "Temple architecture of Odisha" },
      { name: "Jaipur", image: "jaipur", note: "Amber Fort & Hawa Mahal" },
    ],
  },
  {
    slug: "adventure",
    category: "adventure",
    formType: "Adventure",
    label: "Adventure Tours",
    title: "Adventure",
    highlight: "Tours",
    tagline: "High passes, white-water rafting and treks for thrill-seekers.",
    intro:
      "Ride over some of the world's highest motorable passes in Ladakh, raft the Ganga at Rishikesh or trek to Meghalaya's living root bridges. Our adventure tours come with certified operators, safety gear and acclimatisation-friendly itineraries.",
    image: "ladakh",
    perks: [
      { title: "Certified operators", text: "Rafting, trekking and biking with licensed partners." },
      { title: "Safety first", text: "Helmets, life jackets, oxygen and first-aid kits included." },
      { title: "Acclimatisation built in", text: "High-altitude trips are paced to keep you safe." },
      { title: "Group departures", text: "Join fixed-date groups, or go private with friends." },
    ],
    destinations: [
      { name: "Leh Ladakh", image: "ladakhLake", note: "Khardung La & Pangong" },
      { name: "Rishikesh", image: "rishikesh", note: "Rafting & camping" },
      { name: "Meghalaya", image: "meghalaya", note: "Root-bridge treks" },
      { name: "Manali", image: "manali", note: "Paragliding at Solang" },
    ],
  },
];

export const getTheme = (slug: string) => holidayThemes.find((t) => t.slug === slug);

/** Where a holiday theme / package category should link to. */
export const themeHref = (slug: string) =>
  slug === "weekend" ? "/weekend-getaways" : holidayThemes.some((t) => t.slug === slug) ? `/holidays/${slug}` : `/tour-packages?category=${slug}`;
