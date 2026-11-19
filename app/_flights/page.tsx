import type { Metadata } from "next";
import BookingPage from "@/components/BookingPage";

export const metadata: Metadata = { title: "Flight Booking", description: "Book cheap domestic and international flights with BringYatra." };

export default function FlightsPage() {
  return (
    <BookingPage
      tab="flights"
      title="Book Cheap"
      highlight="Flights"
      subtitle="Compare fares across airlines and fly to 100+ cities in India and abroad."
      image="flight"
      perks={["Zero convenience fee", "Free date change*", "Instant e-ticket", "24×7 support"]}
      routesTitle="Popular Flight"
      routes={[
        { from: "Bhubaneswar", to: "Delhi", price: 4299, meta: "Non-stop · 2h 15m" },
        { from: "Bhubaneswar", to: "Mumbai", price: 4899, meta: "Non-stop · 2h 30m" },
        { from: "Delhi", to: "Srinagar", price: 3599, meta: "Non-stop · 1h 25m" },
        { from: "Kolkata", to: "Goa", price: 5199, meta: "Non-stop · 2h 40m" },
        { from: "Bangalore", to: "Port Blair", price: 6299, meta: "Non-stop · 2h 35m" },
        { from: "Hyderabad", to: "Bhubaneswar", price: 3899, meta: "Non-stop · 1h 45m" },
        { from: "Mumbai", to: "Kochi", price: 3999, meta: "Non-stop · 1h 55m" },
        { from: "Delhi", to: "Leh", price: 5499, meta: "Non-stop · 1h 20m" },
        { from: "Chennai", to: "Bagdogra", price: 6799, meta: "1 stop · 4h 50m" },
      ]}
    />
  );
}
