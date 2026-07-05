import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import AutofleetApp from "@/src/marketing/autofleet/AutofleetApp";

// Autofleet's face (read live off autofleet.io, 2026-07-05) is Visby CF,
// a commercial geometric-round sans. Closest free substitute: Poppins.
const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-af-sans",
  display: "swap",
});

// Ad-hoc, personalized application page for Bar Moshe's "Full Stack
// Developer" application to Autofleet (autofleet.io, fleet + mobility
// optimization platform, Tel Aviv; an Element Fleet Management company).
// Built in Autofleet's own visual language, read live off autofleet.io:
// near-white #F5F5F7 surface, ink #333 headings, #11A4FF CTAs with the
// inset-white sheen, the sky #55C3FF to mint #1EF5B9 signature gradient,
// and an original isometric city scene in their style.
// Noindex, a shareable link for the Autofleet team.
const ogTitle = "Bar Moshe × Autofleet — Full Stack Developer";
const ogDescription =
  "Bar Moshe, applying to Autofleet as a Full Stack Developer. Node.js, Express, React, and the production discipline around them. Real shipped work, in public.";

export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Bar Moshe",
    title: ogTitle,
    description: ogDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@barmoshe1",
    creator: "@barmoshe1",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function AutofleetPage() {
  return (
    <div className={sans.variable}>
      <AutofleetApp />
    </div>
  );
}
