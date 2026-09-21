import type { Metadata } from "next";
import { Poppins, Space_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-signature",
});

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  description: `Portfolio of ${profile.name}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${poppins.variable} ${spaceMono.variable} ${caveat.variable}`}
    >
      <body className="min-h-full">
        <div className="mx-auto max-w-3xl min-h-full flex flex-col bg-bg">
          {children}
        </div>
      </body>
    </html>
  );
}
