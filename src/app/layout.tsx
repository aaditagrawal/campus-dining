import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MIT Manipal Dining",
    template: "%s • MIT Manipal Dining",
  },
  description: "Discover delicious food from your favorite campus restaurants.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "MIT Manipal Dining",
    description: "Discover delicious food from your favorite campus restaurants.",
    siteName: "MIT Manipal Dining",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIT Manipal Dining",
    description: "Discover delicious food from your favorite campus restaurants.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <div className="relative min-h-screen w-full flex flex-col">
          {/* Decorative background */}
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 w-screen h-screen">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
            <div className="absolute left-1/2 top-[-10%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.15),transparent)] blur-2xl" />
            <div className="absolute right-[-10%] bottom-[-10%] h-[50vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.12),transparent)] blur-2xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,6,23,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,6,23,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-100" />
          </div>

          <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
            <div className="container mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-semibold text-slate-900">MIT Manipal</span>
                <span className="text-slate-500 hidden sm:inline">Campus Dining</span>
              </Link>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
