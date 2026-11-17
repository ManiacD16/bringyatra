import type { Metadata } from "next";
import BookingPage from "@/components/BookingPage";

export const metadata: Metadata = { title: "Bus Booking", description: "Book AC Volvo, sleeper and seater bus tickets across India with BringYatra." };

export default function BusesPage() {
  return (
    <BookingPage
      tab="buses"
      title="Book Bus"
      highlight="Tickets"
      subtitle="AC Volvo, sleeper and seater buses from 2,500+ trusted operators. Choose your seat and track your bus live."
      image="bus"
      perks={["Choose your seat", "Live bus tracking", "Easy cancellation", "Women-safe seating"]}
      routesTitle="Popular Bus"
      routes={[
        { from: "Bhubaneswar", to: "Puri", price: 249, meta: "AC Seater · 1h 45m" },
        { from: "Bhubaneswar", to: "Kolkata", price: 899, meta: "Volvo Sleeper · 9h" },
        { from: "Cuttack", to: "Visakhapatnam", price: 1099, meta: "AC Sleeper · 10h" },
        { from: "Delhi", to: "Manali", price: 1299, meta: "Volvo Semi-sleeper · 13h" },
        { from: "Delhi", to: "Rishikesh", price: 649, meta: "AC Seater · 6h" },
        { from: "Bangalore", to: "Coorg", price: 599, meta: "AC Sleeper · 6h" },
        { from: "Mumbai", to: "Goa", price: 999, meta: "Volvo Sleeper · 11h" },
        { from: "Bhubaneswar", to: "Gopalpur", price: 449, meta: "AC Seater · 4h" },
        { from: "Chennai", to: "Pondicherry", price: 399, meta: "AC Seater · 3h 30m" },
      ]}
    />
  );
}
