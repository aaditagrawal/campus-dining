"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Siren, GraduationCap, Search, Settings } from "lucide-react";
import { useMemo } from "react";

export default function Home() {
  const isMac = useMemo(() => navigator.platform.toUpperCase().includes("MAC"), []);
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 grid gap-6">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl">MIT Manipal Campus Directory</h1>
        <p className="text-muted-foreground">Quickly find restaurants, hostels, travel options, services, tools and emergency info.</p>
        <div className="mx-auto max-w-xl">
          <button
            className="w-full flex items-center gap-2 rounded-md border px-3 py-2 text-left text-sm hover:bg-muted/60"
            onClick={() => {
              window.dispatchEvent(new Event("open-global-search"));
            }}
            aria-label="Open search"
          >
            <Search className="size-4 text-muted-foreground" />
            <span className="flex-1 text-muted-foreground">Search restaurants, hostels, travel, services, tools…</span>
            <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">{isMac ? "⌘K" : "Ctrl+K"}</kbd>
          </button>
        </div>
      </section>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link href="/academics">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academics
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Academic systems, resources and portals</CardContent>
          </Card>
        </Link>
        <Link href="/restaurants">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Restaurants</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Menus, timings, delivery and contacts</CardContent>
          </Card>
        </Link>
        <Link href="/hostels">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Hostels</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Wardens and contacts per block</CardContent>
          </Card>
        </Link>
        <Link href="/travel">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Travel</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Autos, cabs, taxis, buggies</CardContent>
          </Card>
        </Link>
        <Link href="/services">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Laundry, Xerox, and other misc</CardContent>
          </Card>
        </Link>
        <Link href="/tools">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Campus map, mess menus, and resources</CardContent>
          </Card>
        </Link>
        <Link href="/emergency">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5 border-red-400/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-500">
                <Siren className="h-5 w-5 text-red-500" />
                Emergency
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-red-500">Clinic, ambulance, security</CardContent>
          </Card>
        </Link>
      </section>
    </main>
  );
}
