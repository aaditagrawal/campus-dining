import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Instrument_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MIT Manipal Campus Directory",
  description: "A glassy, organized directory for restaurants, hostels, travel, and emergency services at MIT Manipal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script defer src="https://stat.sys256.com/script.js" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${instrumentSans.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          {children}
          <footer className="py-8 text-center text-muted-foreground text-sm">
            <p>
              Found something wrong or missing? Help improve this directory by contributing at{" "}
              <a
                href="https://github.com/aaditagrawal/campus-dining"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors underline decoration-1 underline-offset-2"
              >
                GitHub
              </a>
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
