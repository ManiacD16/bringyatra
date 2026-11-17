import type { Metadata } from "next";
import BookingPage from "@/components/BookingPage";

export const metadata: Metadata = { title: "Hotel Booking", description: "Book verified hotels, resorts and homestays across India with BringYatra." };

export default function HotelsPage() {
  return (
    <BookingPage
      tab="hotels"
      title="Book Verified"
      highlight="Hotels"
      subtitle="From budget stays to beach resorts and houseboats, every property is checked by our team."
      image="resortPool"
      perks={["Pay at hotel*", "Free cancellation*", "Best price guarantee", "Verified photos"]}
      stays={[
        { name: "Sea Breeze Beach Resort", city: "Puri, Odisha", price: 3499, rating: 4.6, image: "resort" },
        { name: "Dal View Heritage Houseboat", city: "Srinagar, Kashmir", price: 4899, rating: 4.8, image: "kashmirBoats" },
        { name: "Palm Grove Backwater Villa", city: "Alleppey, Kerala", price: 5299, rating: 4.7, image: "keralaHouseboat" },
        { name: "Mall Road Residency", city: "Shimla, Himachal", price: 2799, rating: 4.4, image: "hotelRoom" },
        { name: "Lake Pichola Haveli", city: "Udaipur, Rajasthan", price: 6499, rating: 4.8, image: "udaipur" },
        { name: "Calangute Bay Resort", city: "North Goa", price: 3999, rating: 4.5, image: "resortPool" },
        { name: "Temple Town Inn", city: "Bhubaneswar, Odisha", price: 2199, rating: 4.3, image: "hotelRoom" },
        { name: "Coffee Estate Homestay", city: "Coorg, Karnataka", price: 3299, rating: 4.7, image: "coorg" },
      ]}
    />
  );
}
