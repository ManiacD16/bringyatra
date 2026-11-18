import { site } from "./data";

/**
 * Policy pages. Each body entry is one block:
 *   string            -> paragraph
 *   string[]          -> bullet list
 *   { head, rows }    -> table
 */
export type Block = string | string[] | { head: string[]; rows: string[][] };

export type LegalSection = { id: string; heading: string; body: Block[] };

export type LegalPage = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  sections: LegalSection[];
};

export const lastUpdated = "18 November 2026";

const company = `${site.legalName} ("Billbring", "BringYatra", "we", "us" or "our")`;
const contactLine = `Customer Care: ${site.phone} · Email: ${site.email} · Address: ${site.address}`;

export const legalPages: LegalPage[] = [
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    short: "Terms",
    summary: "The rules for using the BringYatra website and for booking tours, flights, buses and hotels with us.",
    sections: [
      {
        id: "introduction",
        heading: "1. Introduction",
        body: [
          `BringYatra is a travel brand owned and operated by ${company}, a company incorporated in India with its registered office at ${site.address}.`,
          "These Terms & Conditions apply to your use of the BringYatra website, mobile pages, phone and WhatsApp support, and every booking you make through any of them. By browsing the website or making a booking, you agree to these terms, our Privacy Policy, Cancellation Policy, Refund Policy and Legal Policy.",
        ],
      },
      {
        id: "eligibility",
        heading: "2. Eligibility & Account",
        body: [
          [
            "You must be at least 18 years old and legally able to enter into a contract to make a booking.",
            "If you book for other travellers, you confirm that you have their consent and that the details you share for them are accurate.",
            "You are responsible for keeping your login details confidential and for all activity on your account.",
          ],
        ],
      },
      {
        id: "our-role",
        heading: "3. Our Role as a Travel Agent",
        body: [
          "BringYatra acts as an intermediary between you and independent service providers such as airlines, bus operators, railways, hotels, transporters, guides and activity operators (\"Suppliers\").",
          "Each service is provided by its Supplier under the Supplier's own terms, including fare rules, check-in times and baggage allowances. We are not responsible for a Supplier's acts, omissions, delays, cancellations or deficiency in service, but we will assist you in resolving any issue with the Supplier.",
        ],
      },
      {
        id: "bookings-and-payments",
        heading: "4. Bookings, Prices & Payments",
        body: [
          [
            "Package prices are per person on twin sharing basis unless stated otherwise, and are subject to availability at the time of confirmation.",
            "Prices may change because of Supplier fare revisions, fuel surcharges, taxes or government levies until the booking is fully paid and confirmed.",
            "Tour packages are confirmed on payment of an advance (usually 25% of the package cost). The balance must be paid at least 15 days before departure, or as stated in your booking confirmation.",
            "Flights, bus tickets and prepaid hotels must be paid in full at the time of booking.",
            "GST and other applicable taxes are charged as per prevailing law and shown on your invoice.",
            "If a payment fails or is reversed, the booking is not confirmed and may be released without notice.",
          ],
        ],
      },
      {
        id: "travel-documents",
        heading: "5. Travel Documents & Identification",
        body: [
          "Every traveller must carry a valid government-issued photo ID (Aadhaar, passport, voter ID or driving licence). Some destinations require additional permits, such as Inner Line Permits for parts of the North-East and Ladakh. We will guide you, but obtaining valid documents remains the traveller's responsibility.",
          "We are not liable for denied boarding, entry or check-in caused by missing or invalid documents.",
        ],
      },
      {
        id: "itinerary-changes",
        heading: "6. Itinerary Changes",
        body: [
          "Itineraries may be changed, rerouted or shortened because of weather, road conditions, landslides, strikes, government orders, temple closures or other reasons beyond our control. We will try to offer a comparable alternative. Any extra cost arising from such changes is payable by the traveller, and unused services caused by such events are not refundable unless the Supplier refunds them.",
        ],
      },
      {
        id: "traveller-conduct",
        heading: "7. Traveller Responsibilities",
        body: [
          [
            "Follow the instructions of tour managers, drivers, guides and Supplier staff, and respect local laws, customs and religious sites.",
            "Inform us at booking of any medical condition, dietary need or mobility requirement.",
            "Look after your own luggage, valuables and documents.",
            "We may end the services of any traveller whose behaviour endangers or seriously inconveniences others, without refund.",
          ],
        ],
      },
      {
        id: "liability",
        heading: "8. Limitation of Liability",
        body: [
          "To the maximum extent permitted by law, our total liability for any claim relating to a booking is limited to the amount you paid to us for that booking. We are not liable for indirect or consequential losses, or for loss caused by force majeure events such as natural disasters, epidemics, war, civil unrest or government action.",
          "We strongly recommend that you buy travel insurance covering medical emergencies, trip cancellation and loss of baggage.",
        ],
      },
      {
        id: "governing-law",
        heading: "9. Governing Law & Disputes",
        body: [
          "These terms are governed by the laws of India. Any dispute is subject to the exclusive jurisdiction of the courts at Gurugram, Haryana. Before going to court, please contact our Grievance Officer (see the Legal Policy) so that we can try to resolve the issue amicably.",
        ],
      },
      {
        id: "contact",
        heading: "10. Contact Us",
        body: [contactLine],
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    short: "Privacy",
    summary: "What personal data we collect, why we collect it, who we share it with and the choices you have.",
    sections: [
      {
        id: "scope",
        heading: "1. Scope",
        body: [
          `This Privacy Policy explains how ${company} collects, uses, stores and shares your personal data when you use the BringYatra website or our services. It is published in line with the Information Technology Act, 2000, the rules made under it, and the Digital Personal Data Protection Act, 2023.`,
        ],
      },
      {
        id: "data-we-collect",
        heading: "2. Information We Collect",
        body: [
          [
            "Identity & contact details: name, mobile number, email address, city, and age or date of birth where a Supplier requires it.",
            "Traveller details: names, ages, gender and ID or passport details of co-travellers, needed for tickets, permits and hotel check-in.",
            "Booking details: destinations, dates, preferences, special requests and enquiry history.",
            "Payment information: transaction reference and status. Card and bank details are processed by RBI-authorised payment gateways and are not stored by us.",
            "Technical data: IP address, device and browser type, and pages visited, collected through cookies and similar technologies.",
          ],
        ],
      },
      {
        id: "how-we-use",
        heading: "3. How We Use Your Information",
        body: [
          [
            "To respond to enquiries and prepare quotes and itineraries.",
            "To make and manage bookings with airlines, bus operators, hotels and other Suppliers.",
            "To send booking confirmations, travel updates and support messages by SMS, email, phone or WhatsApp.",
            "To process payments, refunds and invoices.",
            "To improve our website and services, and to prevent fraud.",
            "To send offers and newsletters, only where you have opted in. You can unsubscribe at any time.",
          ],
        ],
      },
      {
        id: "sharing",
        heading: "4. Sharing of Information",
        body: [
          "We do not sell your personal data. We share it only as needed to provide our services:",
          [
            "With Suppliers (airlines, bus operators, hotels, transporters, guides) to fulfil your booking.",
            "With payment gateways and banks to process payments and refunds.",
            "With technology and communication service providers who work for us under confidentiality obligations.",
            "With government or law-enforcement authorities when required by law.",
          ],
        ],
      },
      {
        id: "cookies",
        heading: "5. Cookies",
        body: [
          "We use essential cookies to keep the website working, and analytics cookies to understand how it is used. You can block or delete cookies in your browser settings, but some features may then not work properly.",
        ],
      },
      {
        id: "security-retention",
        heading: "6. Data Security & Retention",
        body: [
          "We use reasonable security practices, including encrypted connections (HTTPS), access controls and secure servers, to protect your data. No method of transmission over the internet is completely secure, but we work to keep your data safe.",
          "We keep personal data only as long as needed for the purposes above, or as required by tax, accounting and other laws.",
        ],
      },
      {
        id: "your-rights",
        heading: "7. Your Rights",
        body: [
          [
            "Access a summary of the personal data we hold about you.",
            "Ask us to correct, complete or update your data.",
            "Withdraw consent for marketing communications at any time.",
            "Ask us to erase data that is no longer needed, subject to legal retention requirements.",
            "Raise a grievance with our Grievance Officer.",
          ],
          `To exercise these rights, email ${site.email} with the subject "Privacy Request".`,
        ],
      },
      {
        id: "children",
        heading: "8. Children's Data",
        body: [
          "Bookings for children must be made by a parent or legal guardian. We process children's details only to fulfil the booking made by the parent or guardian.",
        ],
      },
      {
        id: "changes",
        heading: "9. Changes to this Policy",
        body: ["We may update this policy from time to time. The latest version will always be available on this page, with the date of the last update shown at the top."],
      },
      {
        id: "contact",
        heading: "10. Contact & Grievance Officer",
        body: [`For privacy questions or complaints, contact the Grievance Officer, ${site.legalName}. ${contactLine}`],
      },
    ],
  },
  {
    slug: "cancellation-policy",
    title: "Cancellation Policy",
    short: "Cancellation",
    summary: "How to cancel a tour package, flight, bus or hotel booking, and the charges that apply.",
    sections: [
      {
        id: "how-to-cancel",
        heading: "1. How to Cancel",
        body: [
          `All cancellation requests must be sent in writing to ${site.email} from your registered email address, or raised through our Customer Care on ${site.phone}. A cancellation takes effect on the date and time we receive your written request, and we will acknowledge it by email.`,
        ],
      },
      {
        id: "tour-packages",
        heading: "2. Tour Packages",
        body: [
          "The following charges apply to domestic tour packages, counted from the date of departure:",
          {
            head: ["When you cancel", "Cancellation charge"],
            rows: [
              ["30 days or more before departure", "5% of the total package cost (processing fee)"],
              ["15 – 29 days before departure", "25% of the total package cost"],
              ["7 – 14 days before departure", "50% of the total package cost"],
              ["Less than 7 days before departure, or no-show", "100% of the total package cost"],
            ],
          },
          [
            "Where flights, train tickets, special-event stays (such as Rath Yatra or New Year) or non-refundable hotels are part of the package, their cancellation charges apply in addition to, or in place of, the slabs above, whichever is higher.",
            "Char Dham, Kedarnath helicopter, Amarnath and other yatra registrations are non-refundable once issued.",
            "Unused services after the tour has started (missed sightseeing, meals or nights) are not refundable.",
          ],
        ],
      },
      {
        id: "flights",
        heading: "3. Flights",
        body: [
          [
            "Flight cancellations follow the fare rules of the airline. Cancellation charges levied by the airline are deducted from the refund.",
            "BringYatra's service or convenience fee is non-refundable.",
            "To cancel close to departure, cancel at least 4 hours before the scheduled departure time, or as the airline specifies. Otherwise the ticket may be treated as a no-show, and only statutory taxes may be refundable.",
          ],
        ],
      },
      {
        id: "buses",
        heading: "4. Bus Tickets",
        body: [
          "Bus ticket cancellations follow the bus operator's policy shown at the time of booking. Charges usually increase closer to departure, and tickets generally cannot be cancelled after the scheduled departure time.",
        ],
      },
      {
        id: "hotels",
        heading: "5. Hotels",
        body: [
          "Hotel bookings follow the cancellation policy shown for the selected room and rate plan. Non-refundable rates cannot be cancelled or changed. For pay-at-hotel bookings, the hotel may charge a no-show fee as per its policy.",
        ],
      },
      {
        id: "by-us",
        heading: "6. Cancellation by BringYatra or a Supplier",
        body: [
          "If we or a Supplier cancel a confirmed service for reasons within our control, you will receive a full refund of the amount paid for that service, or an alternative of equal or higher value if you prefer.",
          "If a service is cancelled because of force majeure events such as natural disasters, extreme weather, landslides, epidemics, government orders or civil unrest, we will pass on whatever refund or credit the Suppliers give us, after deducting non-recoverable costs.",
        ],
      },
      {
        id: "amendments",
        heading: "7. Changes to a Booking",
        body: [
          "Date changes, name corrections and other amendments are subject to availability and Supplier charges, plus a BringYatra amendment fee where applicable. Moving a package to a later date within 30 days is treated as a cancellation and rebooking if the original Suppliers cannot carry it forward.",
        ],
      },
      {
        id: "refunds",
        heading: "8. Refunds",
        body: ["The refund amount, timelines and payment mode are explained in our Refund Policy."],
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    short: "Refund",
    summary: "When refunds are due, how much you get back, and how long it takes to reach your account.",
    sections: [
      {
        id: "eligibility",
        heading: "1. When Is a Refund Due?",
        body: [
          [
            "When you cancel a booking, as per the charges in our Cancellation Policy.",
            "When we or a Supplier cancel a confirmed service.",
            "When a payment is debited but the booking is not confirmed (failed transaction).",
            "When you are charged twice or more for the same booking (duplicate payment).",
          ],
        ],
      },
      {
        id: "amount",
        heading: "2. Refund Amount",
        body: [
          "The refund equals the amount you paid, minus the applicable cancellation charges, Supplier charges, and BringYatra service or convenience fees. Payment gateway charges may be deducted where they are not reversed by the gateway. Failed and duplicate transactions are refunded in full.",
        ],
      },
      {
        id: "timelines",
        heading: "3. Refund Timelines",
        body: [
          {
            head: ["Type of refund", "We start processing within", "Credit to your account*"],
            rows: [
              ["Failed / duplicate transaction", "2 working days", "5 – 7 working days"],
              ["Tour package cancellation", "7 working days", "7 – 14 working days"],
              ["Flight cancellation", "On receipt from airline", "7 – 21 working days"],
              ["Bus ticket cancellation", "2 working days", "5 – 7 working days"],
              ["Hotel cancellation", "On receipt from hotel", "7 – 14 working days"],
            ],
          },
          "*After processing, the time it takes for the money to reach your account depends on your bank or card issuer.",
        ],
      },
      {
        id: "mode",
        heading: "4. Mode of Refund",
        body: [
          [
            "Refunds are credited to the original payment method (card, UPI, net banking or wallet) used for the booking.",
            "Cash payments, or payments from a closed account, are refunded by bank transfer to an account in the name of the person who made the booking, after verification.",
            "With your consent, the refund can instead be kept as a BringYatra travel credit, valid for 12 months, for any future booking.",
          ],
        ],
      },
      {
        id: "non-refundable",
        heading: "5. Non-Refundable Items",
        body: [
          [
            "BringYatra service, convenience and amendment fees.",
            "Non-refundable airfares, hotel rates and special-event bookings.",
            "Yatra registrations, permits, visa fees and insurance premiums once issued.",
            "Services left unused after the trip has started.",
          ],
        ],
      },
      {
        id: "status",
        heading: "6. Tracking Your Refund",
        body: [
          `Once a refund is processed, we email you the refund reference number. If you haven't received a refund within the timelines above, write to ${site.email} with your booking ID, or call Customer Care on ${site.phone}.`,
        ],
      },
    ],
  },
  {
    slug: "legal-policy",
    title: "Legal Policy",
    short: "Legal",
    summary: "Company information, intellectual property, disclaimers and how to raise a grievance.",
    sections: [
      {
        id: "company",
        heading: "1. Company Information",
        body: [
          {
            head: ["", ""],
            rows: [
              ["Brand name", "BringYatra"],
              ["Legal entity", site.legalName],
              ["Registered office", site.address],
              ["Customer Care", site.phone],
              ["Email", site.email],
            ],
          },
        ],
      },
      {
        id: "intellectual-property",
        heading: "2. Intellectual Property",
        body: [
          `The BringYatra name, logo, tagline "${site.tagline}", website design, text, itineraries and graphics are the property of ${site.legalName} or are used under licence. You may not copy, reproduce, republish or use them commercially without our prior written permission. Photographs on the website are owned by us or licensed from third parties, and remain the property of their respective owners.`,
        ],
      },
      {
        id: "website-use",
        heading: "3. Acceptable Use",
        body: [
          [
            "Do not use the website for any unlawful, fraudulent or abusive purpose.",
            "Do not make speculative, false or fraudulent bookings.",
            "Do not attempt to gain unauthorised access to our systems, or to scrape or overload the website.",
            "Do not post or send content that is defamatory, obscene or infringes the rights of others.",
          ],
        ],
      },
      {
        id: "disclaimer",
        heading: "4. Disclaimer",
        body: [
          "Information on the website, including descriptions, photos, prices, weather and travel tips, is provided in good faith for general guidance. Photos may be representative. While we try to keep everything accurate and up to date, we do not guarantee that the website is error-free or available without interruption. Your final booking confirmation will show the confirmed services, prices and terms.",
          "Links to third-party websites are provided for convenience. We are not responsible for their content or privacy practices.",
        ],
      },
      {
        id: "fraud",
        heading: "5. Beware of Fraud",
        body: [
          `BringYatra never asks for your card PIN, CVV, OTP or UPI PIN over phone, SMS or WhatsApp. We only accept payments through our official payment links and the company bank account of ${site.legalName}. If someone contacts you claiming to be from BringYatra and asks for such details, please do not share them, and report it to ${site.email}.`,
        ],
      },
      {
        id: "grievance",
        heading: "6. Grievance Redressal",
        body: [
          "In line with the Information Technology Act, 2000 and the Consumer Protection (E-Commerce) Rules, 2020, you can contact our Grievance Officer with any complaint about our services or website content:",
          [
            `Grievance Officer, ${site.legalName}`,
            `Address: ${site.address}`,
            `Email: ${site.email} (subject: "Grievance")`,
            `Phone: ${site.phone}`,
          ],
          "We acknowledge every grievance within 48 hours and aim to resolve it within 30 days of receipt.",
        ],
      },
      {
        id: "jurisdiction",
        heading: "7. Governing Law",
        body: ["All matters relating to this website and our services are governed by the laws of India, and are subject to the exclusive jurisdiction of the courts at Gurugram, Haryana."],
      },
    ],
  },
];

export const getLegalPage = (slug: string) => legalPages.find((p) => p.slug === slug);
