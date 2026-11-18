import { img, type ImageKey } from "./images";

export const site = {
  name: "BringYatra",
  tagline: "Bringing Journeys to Life.",
  /** Customer care number, as displayed. */
  phone: "+91 87968 83271",
  /** Same number for tel: links. */
  tel: "+918796883271",
  email: "support@bringyatra.com",
  legalName: "Billbring Payment Solution Pvt Ltd",
  address: "Unit No. 141-142, First Floor, Tower-B3, Spaze Itech Park, Sohna Road, Sector 49, Gurugram, Haryana 122018",
};

/* ------------------------------------------------------------------ */
/* Categories — the eight things BringYatra does                       */
/* ------------------------------------------------------------------ */

export type CategorySlug =
  | "domestic"
  | "weekend"
  | "family"
  | "honeymoon"
  | "pilgrimage"
  | "group"
  | "odisha"
  | "hill-station"
  | "beach"
  | "heritage"
  | "adventure";

export type Service = {
  slug: string;
  title: string;
  short: string;
  blurb: string;
  image: ImageKey;
  href: string;
  count: string;
};

export const services: Service[] = [
  {
    slug: "domestic",
    title: "Domestic Tour Packages",
    short: "Domestic Tours",
    blurb: "Kashmir to Kanyakumari: complete India holidays with stays, transfers and sightseeing handled for you.",
    image: "taj",
    href: "/tour-packages?category=domestic",
    count: "120+",
  },
  {
    slug: "weekend",
    title: "Weekend Getaways",
    short: "Weekend Getaways",
    blurb: "Short 2–3 day breaks from your city: hills, beaches and heritage, all within a few hours of home.",
    image: "rishikesh",
    href: "/weekend-getaways",
    count: "45+",
  },
  {
    slug: "family",
    title: "Family Holidays",
    short: "Family Holidays",
    blurb: "Easy-paced itineraries with family rooms, child-friendly activities and private cabs.",
    image: "family",
    href: "/holidays/family",
    count: "60+",
  },
  {
    slug: "honeymoon",
    title: "Honeymoon Packages",
    short: "Honeymoon",
    blurb: "Candlelight dinners, private houseboats and room upgrades for the start of your forever.",
    image: "honeymoon",
    href: "/holidays/honeymoon",
    count: "40+",
  },
  {
    slug: "pilgrimage",
    title: "Religious & Pilgrimage Tours",
    short: "Pilgrimage Tours",
    blurb: "Char Dham, Jagannath Puri, Kashi, the Golden Temple and more, with darshan assistance and comfortable stays.",
    image: "varanasiAarti",
    href: "/holidays/pilgrimage",
    count: "55+",
  },
  {
    slug: "bookings",
    title: "Flight, Bus & Hotel Bookings",
    short: "Flights · Bus · Hotels",
    blurb: "Book flights, Volvo and sleeper buses, and verified hotels across India from one place, at the best fares.",
    image: "flight",
    href: "/flights",
    count: "24×7",
  },
  {
    slug: "group",
    title: "Customized Group Tours",
    short: "Group Tours",
    blurb: "Corporate offsites, college trips, family reunions and yatra groups planned around your dates and budget.",
    image: "group",
    href: "/group-tours",
    count: "500+ groups",
  },
  {
    slug: "odisha",
    title: "Odisha Special Tour Packages",
    short: "Odisha Special",
    blurb: "Puri, Konark, Chilika and the temple city of Bhubaneswar, planned by local experts who live here.",
    image: "puri",
    href: "/odisha-tours",
    count: "30+",
  },
];

export const interests: { slug: CategorySlug; label: string; image: ImageKey; count: string }[] = [
  { slug: "honeymoon", label: "Honeymoon", image: "honeymoonDance", count: "40+" },
  { slug: "family", label: "Family", image: "familySea", count: "60+" },
  { slug: "pilgrimage", label: "Pilgrimage", image: "kedarnath", count: "55+" },
  { slug: "hill-station", label: "Hill Stations", image: "manali", count: "75+" },
  { slug: "beach", label: "Beach Tours", image: "goaHuts", count: "25+" },
  { slug: "heritage", label: "Heritage", image: "jaipur", count: "35+" },
  { slug: "adventure", label: "Adventure", image: "ladakh", count: "30+" },
  { slug: "weekend", label: "Weekend", image: "coorg", count: "45+" },
];

/* ------------------------------------------------------------------ */
/* Packages                                                            */
/* ------------------------------------------------------------------ */

export type Pkg = {
  slug: string;
  title: string;
  subtitle: string;
  places: string[];
  days: number;
  nights: number;
  price: number;
  oldPrice: number;
  image: ImageKey;
  gallery: ImageKey[];
  categories: CategorySlug[];
  region: "North" | "South" | "East" | "West" | "Central";
  rating: number;
  reviews: number;
  badge?: string;
  highlights: string[];
  itinerary: string[];
};

export const packages: Pkg[] = [
  {
    slug: "kashmir-getaway",
    title: "Kashmir Getaway",
    subtitle: "Paradise on Earth",
    places: ["Srinagar", "Gulmarg", "Pahalgam"],
    days: 5,
    nights: 4,
    price: 24999,
    oldPrice: 29999,
    image: "kashmir",
    gallery: ["kashmir", "kashmirBoats", "himalaya", "himalayaValley"],
    categories: ["domestic", "honeymoon", "family", "hill-station"],
    region: "North",
    rating: 4.9,
    reviews: 1284,
    badge: "Popular",
    highlights: ["Night stay on a Dal Lake houseboat", "Gondola ride at Gulmarg", "Betaab & Aru valley excursion", "Shikara ride at sunset"],
    itinerary: ["Arrive Srinagar · Shikara ride on Dal Lake", "Srinagar to Gulmarg day trip · Gondola", "Srinagar to Pahalgam · Betaab Valley", "Pahalgam · Aru & Chandanwari", "Return to Srinagar · Departure"],
  },
  {
    slug: "puri-bhubaneswar-konark",
    title: "Puri - Bhubaneswar - Konark",
    subtitle: "Odisha Heritage Tour",
    places: ["Bhubaneswar", "Puri", "Konark"],
    days: 4,
    nights: 3,
    price: 13999,
    oldPrice: 16999,
    image: "konarkWheel",
    gallery: ["konarkWheel", "puri", "lingaraj", "konark"],
    categories: ["domestic", "odisha", "pilgrimage", "family", "heritage"],
    region: "East",
    rating: 4.8,
    reviews: 962,
    badge: "Odisha Special",
    highlights: ["Jagannath Temple darshan with local guide", "Konark Sun Temple, a UNESCO World Heritage Site", "Lingaraj & Mukteswar temples", "Sunset at Chandrabhaga beach"],
    itinerary: ["Arrive Bhubaneswar · Lingaraj & Mukteswar", "Dhauli Shanti Stupa · Udayagiri caves · drive to Puri", "Jagannath darshan · Konark Sun Temple · Chandrabhaga", "Raghurajpur artist village · Departure"],
  },
  {
    slug: "shimla-manali-escape",
    title: "Shimla Manali Escape",
    subtitle: "Himachal Hill Holiday",
    places: ["Shimla", "Manali", "Solang"],
    days: 6,
    nights: 5,
    price: 28999,
    oldPrice: 34999,
    image: "manali",
    gallery: ["manali", "shimla", "manaliSnow", "himalayaVillage"],
    categories: ["domestic", "honeymoon", "family", "hill-station"],
    region: "North",
    rating: 4.8,
    reviews: 1508,
    highlights: ["Mall Road & Ridge, Shimla", "Kufri snow point", "Solang Valley adventure sports", "Hadimba Temple & Old Manali cafés"],
    itinerary: ["Arrive Chandigarh · drive to Shimla", "Kufri & Shimla sightseeing", "Shimla to Manali via Kullu valley", "Solang Valley · Atal Tunnel", "Manali local · Hadimba Temple · Vashisht", "Drive back to Chandigarh · Departure"],
  },
  {
    slug: "goa-holiday",
    title: "Goa Holiday",
    subtitle: "Sun, Sand & Susegad",
    places: ["North Goa", "South Goa"],
    days: 4,
    nights: 3,
    price: 17999,
    oldPrice: 20999,
    image: "goa",
    gallery: ["goa", "goaHuts", "goaUmbrellas", "resort"],
    categories: ["domestic", "beach", "weekend", "honeymoon"],
    region: "West",
    rating: 4.7,
    reviews: 2210,
    highlights: ["Beach-side resort with breakfast", "North Goa forts & beaches", "Old Goa churches", "Mandovi river sunset cruise"],
    itinerary: ["Arrive Goa · check in · evening at Baga", "North Goa: Aguada, Calangute, Anjuna", "South Goa: Old Goa churches, Colva & cruise", "Leisure morning · Departure"],
  },
  {
    slug: "enchanting-kerala",
    title: "Enchanting Kerala",
    subtitle: "God's Own Country",
    places: ["Kochi", "Munnar", "Thekkady", "Alleppey"],
    days: 6,
    nights: 5,
    price: 26499,
    oldPrice: 31999,
    image: "keralaHouseboat",
    gallery: ["keralaHouseboat", "munnar", "kerala", "coorg"],
    categories: ["domestic", "honeymoon", "family", "beach"],
    region: "South",
    rating: 4.9,
    reviews: 1873,
    badge: "Best Seller",
    highlights: ["Overnight private houseboat in Alleppey", "Munnar tea gardens & Eravikulam", "Periyar spice plantation walk", "Kathakali show in Kochi"],
    itinerary: ["Arrive Kochi · Fort Kochi walk", "Kochi to Munnar · waterfalls en route", "Munnar: tea museum & Eravikulam", "Munnar to Thekkady · spice plantation", "Alleppey houseboat cruise", "Alleppey to Kochi · Departure"],
  },
  {
    slug: "golden-triangle",
    title: "Golden Triangle Tour",
    subtitle: "Delhi · Agra · Jaipur",
    places: ["Delhi", "Agra", "Jaipur"],
    days: 6,
    nights: 5,
    price: 21999,
    oldPrice: 25999,
    image: "tajGolden",
    gallery: ["tajGolden", "taj", "jaipur", "jaipurFort"],
    categories: ["domestic", "heritage", "family"],
    region: "North",
    rating: 4.8,
    reviews: 2654,
    highlights: ["Sunrise at the Taj Mahal", "Amber Fort & Hawa Mahal", "Old Delhi rickshaw ride", "Fatehpur Sikri en route"],
    itinerary: ["Arrive Delhi · India Gate & Qutub Minar", "Old & New Delhi sightseeing", "Delhi to Agra · Agra Fort", "Taj Mahal sunrise · drive to Jaipur", "Jaipur: Amber Fort, City Palace, Hawa Mahal", "Jaipur to Delhi · Departure"],
  },
  {
    slug: "leh-ladakh-adventure",
    title: "Leh Ladakh Adventure",
    subtitle: "Land of High Passes",
    places: ["Leh", "Nubra", "Pangong"],
    days: 7,
    nights: 6,
    price: 38999,
    oldPrice: 44999,
    image: "ladakh",
    gallery: ["ladakh", "ladakhLake", "himalaya", "himalayaGreen"],
    categories: ["domestic", "adventure", "group"],
    region: "North",
    rating: 4.9,
    reviews: 842,
    badge: "Trending",
    highlights: ["Khardung La, one of the highest motorable passes", "Camel safari at Hunder dunes", "Lakeside camp at Pangong Tso", "Thiksey & Hemis monasteries"],
    itinerary: ["Arrive Leh · acclimatisation", "Leh local: Shanti Stupa, Leh Palace", "Leh to Nubra via Khardung La", "Nubra to Pangong via Shyok", "Pangong to Leh via Chang La", "Sham valley & Magnetic Hill", "Departure from Leh"],
  },
  {
    slug: "char-dham-yatra",
    title: "Char Dham Yatra",
    subtitle: "Sacred Himalayan Pilgrimage",
    places: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"],
    days: 12,
    nights: 11,
    price: 42999,
    oldPrice: 49999,
    image: "kedarnath",
    gallery: ["kedarnath", "rishikesh", "himalaya", "varanasiAarti"],
    categories: ["domestic", "pilgrimage", "group"],
    region: "North",
    rating: 4.9,
    reviews: 1120,
    highlights: ["VIP darshan assistance at all four dhams", "Helicopter option for Kedarnath", "Ganga Aarti at Haridwar", "Hot meals and doctor-on-call support"],
    itinerary: ["Arrive Haridwar · Ganga Aarti", "Haridwar to Barkot", "Yamunotri darshan", "Barkot to Uttarkashi", "Gangotri darshan", "Uttarkashi to Guptkashi", "Kedarnath darshan", "Kedarnath to Guptkashi", "Guptkashi to Badrinath", "Badrinath darshan · Mana village", "Badrinath to Rudraprayag", "Rishikesh · Departure"],
  },
  {
    slug: "kashi-spiritual-tour",
    title: "Kashi Spiritual Tour",
    subtitle: "Varanasi · Sarnath · Prayagraj",
    places: ["Varanasi", "Sarnath", "Prayagraj"],
    days: 4,
    nights: 3,
    price: 14499,
    oldPrice: 16999,
    image: "varanasiAarti",
    gallery: ["varanasiAarti", "varanasi", "rishikesh", "kedarnath"],
    categories: ["domestic", "pilgrimage", "family"],
    region: "North",
    rating: 4.8,
    reviews: 734,
    highlights: ["Kashi Vishwanath darshan", "Dashashwamedh Ganga Aarti from a boat", "Sarnath Buddhist circuit", "Triveni Sangam snan at Prayagraj"],
    itinerary: ["Arrive Varanasi · evening Ganga Aarti", "Sunrise boat ride · Kashi Vishwanath · Sarnath", "Day trip to Prayagraj Sangam", "Departure from Varanasi"],
  },
  {
    slug: "andaman-island-escape",
    title: "Andaman Island Escape",
    subtitle: "Turquoise Water Holiday",
    places: ["Port Blair", "Havelock", "Neil Island"],
    days: 6,
    nights: 5,
    price: 34999,
    oldPrice: 39999,
    image: "andaman",
    gallery: ["andaman", "resort", "goa", "odishaBeach"],
    categories: ["domestic", "beach", "honeymoon"],
    region: "South",
    rating: 4.8,
    reviews: 689,
    highlights: ["Radhanagar Beach, one of Asia's finest beaches", "Snorkelling at Elephant Beach", "Cellular Jail light & sound show", "Private cruise transfers"],
    itinerary: ["Arrive Port Blair · Cellular Jail", "Cruise to Havelock · Radhanagar Beach", "Elephant Beach snorkelling", "Havelock to Neil Island", "Neil to Port Blair · Ross Island", "Departure"],
  },
  {
    slug: "royal-rajasthan",
    title: "Royal Rajasthan",
    subtitle: "Forts, Palaces & Lakes",
    places: ["Jaipur", "Jodhpur", "Udaipur"],
    days: 7,
    nights: 6,
    price: 32999,
    oldPrice: 37999,
    image: "udaipur",
    gallery: ["udaipur", "jaipur", "jaipurFort", "tajGolden"],
    categories: ["domestic", "heritage", "family", "honeymoon"],
    region: "West",
    rating: 4.8,
    reviews: 1036,
    highlights: ["Lake Pichola boat ride, Udaipur", "Mehrangarh Fort, Jodhpur", "Heritage haveli stays", "Rajasthani folk dinner"],
    itinerary: ["Arrive Jaipur · Birla Mandir", "Jaipur forts & bazaars", "Jaipur to Jodhpur", "Mehrangarh & Jaswant Thada · to Udaipur", "Udaipur City Palace & Lake Pichola", "Saheliyon ki Bari · leisure", "Departure from Udaipur"],
  },
  {
    slug: "darjeeling-gangtok",
    title: "Darjeeling & Gangtok",
    subtitle: "Himalayan Tea Trails",
    places: ["Darjeeling", "Gangtok", "Tsomgo"],
    days: 6,
    nights: 5,
    price: 27999,
    oldPrice: 32499,
    image: "darjeeling",
    gallery: ["darjeeling", "toyTrain", "sikkim", "himalayaVillage"],
    categories: ["domestic", "family", "hill-station"],
    region: "East",
    rating: 4.7,
    reviews: 811,
    highlights: ["Tiger Hill sunrise over Kanchenjunga", "Toy train joy ride (UNESCO)", "Tsomgo Lake & Baba Mandir", "Tea estate tasting"],
    itinerary: ["Arrive Bagdogra · drive to Darjeeling", "Tiger Hill sunrise · Batasia Loop · toy train", "Darjeeling to Gangtok", "Tsomgo Lake excursion", "Gangtok local · MG Marg", "Departure via Bagdogra"],
  },
  {
    slug: "amritsar-golden-temple",
    title: "Amritsar Golden Temple",
    subtitle: "Weekend Pilgrimage",
    places: ["Amritsar", "Wagah Border"],
    days: 3,
    nights: 2,
    price: 9999,
    oldPrice: 11999,
    image: "amritsar",
    gallery: ["amritsar", "jaipurFort", "varanasi", "taj"],
    categories: ["domestic", "pilgrimage", "weekend"],
    region: "North",
    rating: 4.9,
    reviews: 967,
    highlights: ["Harmandir Sahib darshan & langar", "Wagah Border retreat ceremony", "Jallianwala Bagh", "Punjabi food walk"],
    itinerary: ["Arrive Amritsar · Golden Temple evening", "Jallianwala Bagh · Wagah Border", "Palki Sahib at dawn · Departure"],
  },
  {
    slug: "rishikesh-weekend",
    title: "Rishikesh Rafting Weekend",
    subtitle: "Yoga Capital Adventure",
    places: ["Rishikesh", "Shivpuri"],
    days: 3,
    nights: 2,
    price: 7999,
    oldPrice: 9499,
    image: "rishikesh",
    gallery: ["rishikesh", "himalayaGreen", "group", "kedarnath"],
    categories: ["domestic", "weekend", "adventure", "group"],
    region: "North",
    rating: 4.7,
    reviews: 1342,
    highlights: ["16 km white-water rafting", "Riverside camp & bonfire", "Triveni Ghat Ganga Aarti", "Laxman Jhula & cafés"],
    itinerary: ["Arrive Rishikesh · Ganga Aarti", "Rafting from Shivpuri · camp night", "Sunrise yoga · Departure"],
  },
  {
    slug: "chilika-gopalpur",
    title: "Chilika & Gopalpur Coast",
    subtitle: "Odisha Coastal Escape",
    places: ["Chilika", "Satapada", "Gopalpur"],
    days: 4,
    nights: 3,
    price: 15499,
    oldPrice: 17999,
    image: "chilika",
    gallery: ["chilika", "odishaBeach", "puri", "konark"],
    categories: ["domestic", "odisha", "weekend", "beach", "family"],
    region: "East",
    rating: 4.7,
    reviews: 403,
    highlights: ["Irrawaddy dolphin spotting at Satapada", "Kalijai island temple", "Gopalpur-on-Sea beach resort", "Fresh Chilika seafood"],
    itinerary: ["Arrive Bhubaneswar · drive to Satapada", "Chilika boat safari · Rajhans beach", "Gopalpur-on-Sea · beach evening", "Departure from Bhubaneswar"],
  },
  {
    slug: "grand-odisha",
    title: "Grand Odisha Tour",
    subtitle: "Temples, Tribes & Tides",
    places: ["Bhubaneswar", "Puri", "Konark", "Chilika", "Simlipal"],
    days: 8,
    nights: 7,
    price: 29999,
    oldPrice: 35999,
    image: "lingaraj",
    gallery: ["lingaraj", "konarkWheel", "chilika", "puri"],
    categories: ["domestic", "odisha", "heritage", "family", "group"],
    region: "East",
    rating: 4.9,
    reviews: 318,
    badge: "Signature",
    highlights: ["Ekamra Kshetra temple trail", "Konark Sun Temple & Chandrabhaga", "Chilika dolphin safari", "Simlipal National Park jungle stay"],
    itinerary: ["Arrive Bhubaneswar · Old town temples", "Dhauli · Khandagiri · Nandankanan", "Bhubaneswar to Puri · Jagannath darshan", "Konark Sun Temple · Pipili applique village", "Puri to Chilika · Satapada dolphins", "Drive to Simlipal · jungle lodge", "Simlipal safari · Barehipani falls", "Return to Bhubaneswar · Departure"],
  },
  {
    slug: "jagannath-puri-darshan",
    title: "Jagannath Puri Darshan",
    subtitle: "Shree Kshetra Yatra",
    places: ["Puri", "Konark", "Sakshigopal"],
    days: 3,
    nights: 2,
    price: 8499,
    oldPrice: 9999,
    image: "puri",
    gallery: ["puri", "konarkWheel", "odishaBeach", "lingaraj"],
    categories: ["domestic", "odisha", "pilgrimage", "weekend"],
    region: "East",
    rating: 4.8,
    reviews: 1189,
    highlights: ["Assisted Jagannath darshan & Mahaprasad", "Sakshigopal & Alarnath temples", "Golden Beach, Puri", "Konark Sun Temple"],
    itinerary: ["Arrive Puri · evening at Golden Beach", "Jagannath darshan · Mahaprasad · Konark", "Sakshigopal temple · Departure"],
  },
  {
    slug: "meghalaya-living-roots",
    title: "Meghalaya Living Roots",
    subtitle: "Abode of Clouds",
    places: ["Shillong", "Cherrapunji", "Dawki"],
    days: 5,
    nights: 4,
    price: 24499,
    oldPrice: 28999,
    image: "meghalaya",
    gallery: ["meghalaya", "meghalayaFalls", "coorg", "himalayaGreen"],
    categories: ["domestic", "adventure", "family", "hill-station"],
    region: "East",
    rating: 4.8,
    reviews: 512,
    highlights: ["Double-decker living root bridge trek", "Crystal-clear Umngot river at Dawki", "Nohkalikai & Seven Sisters falls", "Mawlynnong, a village known for cleanliness"],
    itinerary: ["Arrive Guwahati · drive to Shillong", "Cherrapunji waterfalls & caves", "Living root bridge trek", "Dawki & Mawlynnong", "Departure via Guwahati"],
  },
  {
    slug: "coorg-coffee-trails",
    title: "Coorg Coffee Trails",
    subtitle: "Scotland of India",
    places: ["Madikeri", "Bylakuppe"],
    days: 3,
    nights: 2,
    price: 10999,
    oldPrice: 12999,
    image: "coorg",
    gallery: ["coorg", "munnar", "kerala", "resortPool"],
    categories: ["domestic", "weekend", "family", "hill-station"],
    region: "South",
    rating: 4.7,
    reviews: 655,
    highlights: ["Coffee plantation homestay", "Abbey Falls & Raja's Seat", "Golden Temple, Bylakuppe", "Dubare elephant camp"],
    itinerary: ["Arrive Coorg · Raja's Seat sunset", "Abbey Falls · Dubare · Bylakuppe", "Plantation walk · Departure"],
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);

export const byCategory = (cat: CategorySlug) => packages.filter((p) => p.categories.includes(cat));

export const discount = (p: Pkg) => Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const packageImage = (p: Pkg, w = 900) => img(p.image, w);

/* ------------------------------------------------------------------ */
/* Destinations by region                                              */
/* ------------------------------------------------------------------ */

export type Region = "North India" | "South India" | "East India" | "West India" | "Central India";

export const regions: Record<Region, { name: string; image: ImageKey; count: string }[]> = {
  "North India": [
    { name: "Jammu & Kashmir", image: "kashmir", count: "30+" },
    { name: "Himachal Pradesh", image: "manali", count: "60+" },
    { name: "Uttarakhand", image: "kedarnath", count: "50+" },
    { name: "Ladakh", image: "ladakhLake", count: "25+" },
    { name: "Uttar Pradesh", image: "taj", count: "25+" },
    { name: "Punjab", image: "amritsar", count: "12+" },
  ],
  "South India": [
    { name: "Kerala", image: "keralaHouseboat", count: "40+" },
    { name: "Karnataka", image: "coorg", count: "25+" },
    { name: "Munnar", image: "munnar", count: "18+" },
    { name: "Andaman", image: "andaman", count: "15+" },
    { name: "Tamil Nadu", image: "kerala", count: "20+" },
    { name: "Pondicherry", image: "goaUmbrellas", count: "10+" },
  ],
  "East India": [
    { name: "Odisha", image: "konarkWheel", count: "30+" },
    { name: "Sikkim", image: "sikkim", count: "40+" },
    { name: "Darjeeling", image: "toyTrain", count: "20+" },
    { name: "Meghalaya", image: "meghalayaFalls", count: "15+" },
    { name: "Puri", image: "puri", count: "18+" },
    { name: "Chilika", image: "chilika", count: "8+" },
  ],
  "West India": [
    { name: "Goa", image: "goaHuts", count: "15+" },
    { name: "Rajasthan", image: "udaipur", count: "30+" },
    { name: "Jaipur", image: "jaipur", count: "22+" },
    { name: "Gujarat", image: "jaipurFort", count: "30+" },
    { name: "Maharashtra", image: "resort", count: "20+" },
    { name: "Udaipur", image: "udaipur", count: "16+" },
  ],
  "Central India": [
    { name: "Madhya Pradesh", image: "himalayaGreen", count: "30+" },
    { name: "Varanasi", image: "varanasi", count: "15+" },
    { name: "Khajuraho", image: "konark", count: "10+" },
    { name: "Kanha", image: "coorg", count: "15+" },
    { name: "Ujjain", image: "varanasiAarti", count: "15+" },
    { name: "Chhattisgarh", image: "meghalaya", count: "5+" },
  ],
};

/* ------------------------------------------------------------------ */
/* Weekend getaways by city                                            */
/* ------------------------------------------------------------------ */

export const weekendCities: { city: string; image: ImageKey; count: number; picks: string[] }[] = [
  { city: "Bhubaneswar", image: "chilika", count: 22, picks: ["Puri", "Chilika", "Gopalpur", "Daringbadi"] },
  { city: "Delhi", image: "rishikesh", count: 25, picks: ["Rishikesh", "Agra", "Jaipur", "Mussoorie"] },
  { city: "Mumbai", image: "goaUmbrellas", count: 20, picks: ["Lonavala", "Alibaug", "Goa", "Mahabaleshwar"] },
  { city: "Bangalore", image: "coorg", count: 25, picks: ["Coorg", "Ooty", "Chikmagalur", "Mysore"] },
  { city: "Kolkata", image: "darjeeling", count: 18, picks: ["Darjeeling", "Digha", "Mandarmani", "Puri"] },
  { city: "Chennai", image: "kerala", count: 22, picks: ["Pondicherry", "Mahabalipuram", "Yelagiri", "Kodaikanal"] },
  { city: "Hyderabad", image: "jaipurFort", count: 16, picks: ["Hampi", "Srisailam", "Araku", "Warangal"] },
  { city: "Chandigarh", image: "shimla", count: 20, picks: ["Shimla", "Kasauli", "Manali", "Amritsar"] },
];

/* ------------------------------------------------------------------ */
/* Social proof                                                        */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: 25000, suffix: "+", label: "Happy Travellers" },
  { value: 350, suffix: "+", label: "Tour Packages" },
  { value: 120, suffix: "+", label: "Destinations" },
  { value: 12, suffix: "+", label: "Years of Experience" },
];

export const testimonials = [
  {
    name: "Priyanka & Rohit Mishra",
    city: "Bhubaneswar",
    trip: "Kashmir Honeymoon · Mar 2026",
    rating: 5,
    text: "The Dal Lake houseboat night was magical. BringYatra handled every transfer and even arranged a surprise cake. We didn't worry about a thing for five days.",
  },
  {
    name: "Suresh Patnaik",
    city: "Cuttack",
    trip: "Char Dham Yatra · Jun 2026",
    rating: 5,
    text: "I travelled with my parents, both over 65. The team booked helicopter tickets for Kedarnath, ponies and hot meals at every stop. We could focus on the darshan.",
  },
  {
    name: "Ananya Rao",
    city: "Bangalore",
    trip: "Enchanting Kerala · Dec 2025",
    rating: 5,
    text: "The private houseboat in Alleppey and the tea-estate stay in Munnar were spot on. Good value, prompt replies on WhatsApp and a very polite driver.",
  },
  {
    name: "Team Infotrack Solutions",
    city: "Pune",
    trip: "Corporate Group Tour · 64 pax",
    rating: 5,
    text: "BringYatra planned our Goa offsite in under a week, including flights, the resort, team activities and a gala dinner. It ran on time from start to finish.",
  },
  {
    name: "Debashish Sahoo",
    city: "Kolkata",
    trip: "Grand Odisha Tour · Jan 2026",
    rating: 5,
    text: "I'm from Odisha originally, and even I discovered new places: Simlipal, Raghurajpur and the dolphins at Chilika. The local guides really know their stuff.",
  },
];

export const whyUs = [
  { title: "Handpicked Experiences", text: "Every itinerary is tested by our own travel experts before it goes on sale.", icon: "sparkles" },
  { title: "Verified Hotels", text: "Clean, safe and well-reviewed stays, inspected by our team in person.", icon: "hotel" },
  { title: "Best Price Guaranteed", text: "No hidden charges. Found it cheaper elsewhere? We'll match it.", icon: "badge" },
  { title: "24×7 On-trip Support", text: "A real person on call throughout your journey, wherever you are.", icon: "headset" },
] as const;

export const blogs = [
  {
    title: "Rath Yatra 2027: A Complete Guide to Puri's Chariot Festival",
    date: "Nov 10, 2026",
    tag: "Festivals",
    image: "puri" as ImageKey,
    excerpt: "Chariot dimensions, the best viewing spots on Bada Danda, and how to book stays months ahead.",
  },
  {
    title: "12 Best Weekend Getaways from Bhubaneswar under ₹10,000",
    date: "Oct 28, 2026",
    tag: "Weekend",
    image: "chilika" as ImageKey,
    excerpt: "From the dolphins of Chilika to the coffee hills of Daringbadi, these short breaks are worth taking.",
  },
  {
    title: "Kashmir in Winter: What to Pack for Gulmarg Snow",
    date: "Oct 14, 2026",
    tag: "Travel Tips",
    image: "himalaya" as ImageKey,
    excerpt: "Layering, footwear, and why you should pre-book the Gondola Phase 2 tickets.",
  },
];

export const faqs = [
  {
    q: "How do I book a tour package with BringYatra?",
    a: "Choose a package and click “Enquire Now”, or call or WhatsApp us. A travel expert will share a personalised quote within 30 minutes, and you can confirm with a 25% advance.",
  },
  {
    q: "Can I customise an existing package?",
    a: "Yes. Every itinerary can be tailored: add or remove days, upgrade hotels, change the cab type or add activities. Your expert will rework the price for you.",
  },
  {
    q: "Do you organise group tours for corporates, schools and yatra groups?",
    a: "Yes. We handle groups from 10 to 500+ travellers, with dedicated tour managers, bulk flight and train blocks, and custom meal plans.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancel 30 or more days before departure and you get a full refund minus a 5% processing fee. Charges rise closer to the travel date, and flights and hotels follow their own rules. See our Cancellation and Refund policies for the full details.",
  },
  {
    q: "Are flights included in the package price?",
    a: "Package prices shown are per person on twin sharing and exclude flights unless stated. We can add flights, trains or Volvo buses from your city at the best available fares.",
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavItem = {
  label: string;
  href: string;
  mega?: { heading: string; links: { label: string; href: string }[] }[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Domestic Tours",
    href: "/tour-packages",
    mega: [
      {
        heading: "Popular Tours",
        links: packages.slice(0, 6).map((p) => ({ label: p.title, href: `/tour-packages/${p.slug}` })),
      },
      {
        heading: "By Region",
        links: [
          { label: "North India", href: "/tour-packages?region=North" },
          { label: "South India", href: "/tour-packages?region=South" },
          { label: "East India", href: "/tour-packages?region=East" },
          { label: "West India", href: "/tour-packages?region=West" },
          { label: "All Domestic Tours", href: "/tour-packages" },
          { label: "Enquire for a Domestic Tour", href: "/tour-packages#enquire" },
        ],
      },
    ],
  },
  {
    label: "Holiday Packages",
    href: "/holidays",
    mega: [
      {
        heading: "Holidays by Theme",
        links: [
          { label: "Family Holidays", href: "/holidays/family" },
          { label: "Honeymoon Packages", href: "/holidays/honeymoon" },
          { label: "Religious & Pilgrimage", href: "/holidays/pilgrimage" },
          { label: "Weekend Getaways", href: "/weekend-getaways" },
        ],
      },
      {
        heading: "By Interest",
        links: [
          { label: "Hill Stations", href: "/holidays/hill-station" },
          { label: "Beach Holidays", href: "/holidays/beach" },
          { label: "Heritage Tours", href: "/holidays/heritage" },
          { label: "Adventure Tours", href: "/holidays/adventure" },
          { label: "Enquire for a Holiday", href: "/holidays#enquire" },
        ],
      },
    ],
  },
  {
    label: "Odisha Special",
    href: "/odisha-tours",
    mega: [
      {
        heading: "Odisha Packages",
        links: [
          { label: "Puri - Bhubaneswar - Konark", href: "/tour-packages/puri-bhubaneswar-konark" },
          { label: "Grand Odisha Tour", href: "/tour-packages/grand-odisha" },
          { label: "Jagannath Puri Darshan", href: "/tour-packages/jagannath-puri-darshan" },
          { label: "Chilika & Gopalpur Coast", href: "/tour-packages/chilika-gopalpur" },
          { label: "All Odisha Tours", href: "/odisha-tours" },
          { label: "Enquire for an Odisha Tour", href: "/odisha-tours#enquire" },
        ],
      },
    ],
  },
  { label: "Group Tours", href: "/group-tours" },
  { label: "Weekend Getaways", href: "/weekend-getaways" },
  { label: "Offers", href: "/offers" },
];
