import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Jost,
  Pinyon_Script,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import "./globals.css";
import { her } from "./content";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

/* Her name, in the script she writes it in. Tiro is the Devanagari
   companion to a Garamond — the two sit together without arguing. */
const deva = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const script = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: her.siteTitle,
  description: her.siteDescription,
  openGraph: {
    title: her.siteTitle,
    description: her.siteDescription,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#fdf8f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${script.variable} ${deva.variable} h-full antialiased`}
    >
      <head>
        {/* Without JavaScript the curtain would never lift and the
            entrance animations would never run — so undo both. */}
        <noscript>
          <style>{`
            .overture { display: none !important; }
            .char, .line-inner, .reveal { opacity: 1 !important; transform: none !important; filter: none !important; }
            .curtain { clip-path: none !important; }
            .word { opacity: 1 !important; filter: none !important; }
            .thread-step, .cycle-word { opacity: 1 !important; transform: none !important; filter: none !important; }
            .draw-path { stroke-dashoffset: 0 !important; }
            .shimmer { background-image: none !important; color: var(--shimmer-base, #2e2022) !important; }
          `}</style>
        </noscript>
      </head>
      <body className="grain min-h-full">{children}</body>
    </html>
  );
}
