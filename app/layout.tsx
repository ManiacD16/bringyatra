import type { Metadata, Viewport } from "next";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "@fontsource/poppins/latin-800.css";
import "@fontsource-variable/inter";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import { EnquiryProvider } from "@/components/Enquiry";
import { AuthProvider } from "@/components/Auth";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bringyatra.com"),
  title: {
    default: "BringYatra | Tour Packages, Holidays & Pilgrimage Tours in India",
    template: "%s | BringYatra",
  },
  description:
    "BringYatra: Bringing Journeys to Life. Domestic tour packages, weekend getaways, family & honeymoon holidays, pilgrimage tours, Odisha special packages, and customized group tours.",
  keywords: ["tour packages", "Odisha tour", "Puri Konark tour", "honeymoon packages", "pilgrimage tours", "weekend getaways", "BringYatra"],
  openGraph: {
    title: "BringYatra | Bringing Journeys to Life",
    description: "Handpicked holidays across India, with Odisha specials, pilgrimages, honeymoons and group tours.",
    type: "website",
    images: ["/images/logo.png"],
  },
};

export const viewport: Viewport = { themeColor: "#013564" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <EnquiryProvider>
            <Header />
            {/* overflow-x-clip (not hidden) keeps off-screen reveal animations from causing sideways scroll without breaking position: sticky */}
            <main className="overflow-x-clip">{children}</main>
            <Footer />
            <StickyBar />
          </EnquiryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
