"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Siren, GraduationCap, Search, Settings, Mail, Utensils, Building, Car, Wrench } from "lucide-react";
import { useMemo } from "react";

export default function Home() {
  const isMac = useMemo(() => navigator.platform.toUpperCase().includes("MAC"), []);
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 grid gap-12">
      <section className="text-center space-y-6">
        <h1 className="text-6xl md:text-7xl font-serif tracking-tight">MIT Manipal</h1>
        <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Campus directory for restaurants, hostels, travel, services, and emergency information.</p>
        <div className="mx-auto max-w-md">
          <button
            className="w-full flex items-center gap-3 rounded-full border border-border px-6 py-4 text-left text-base hover:bg-muted/50 transition-all duration-200"
            onClick={() => {
              window.dispatchEvent(new Event("open-global-search"));
            }}
            aria-label="Open search"
          >
            <Search className="size-5 text-muted-foreground" />
            <span className="flex-1 text-muted-foreground">Quick search anything…</span>
            <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">{isMac ? "⌘K" : "Ctrl+K"}</kbd>
          </button>
        </div>
      </section>
      
      <section className="glass border border-emerald-200/50 bg-emerald-50/20 rounded-xl p-6 text-center">
        <p className="text-lg flex items-center justify-center gap-3">
          <Mail className="h-5 w-5 text-emerald-400" />
          <span className="font-medium text-emerald-400">Try the Mail to Warden for Leave feature</span>
          <Link href="/tools/mail-to-warden" className="ml-2 text-emerald-400 hover:text-emerald-500 underline font-medium">
            Generate Leave Request →
          </Link>
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/academics">
          <div className="group p-8 rounded-2xl border bg-card hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <GraduationCap className="h-8 w-8 mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-3 font-serif">Academics</h3>
            <p className="text-base text-muted-foreground">Academic systems, resources and portals</p>
          </div>
        </Link>
        <Link href="/restaurants">
          <div className="group p-8 rounded-2xl border bg-card hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <Utensils className="h-8 w-8 mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-3 font-serif">Restaurants</h3>
            <p className="text-base text-muted-foreground">Menus, timings, delivery and contacts</p>
          </div>
        </Link>
        <Link href="/hostels">
          <div className="group p-8 rounded-2xl border bg-card hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <Building className="h-8 w-8 mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-3 font-serif">Hostels</h3>
            <p className="text-base text-muted-foreground">Wardens and contacts per block</p>
          </div>
        </Link>
        <Link href="/travel">
          <div className="group p-8 rounded-2xl border bg-card hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <Car className="h-8 w-8 mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-3 font-serif">Travel</h3>
            <p className="text-base text-muted-foreground">Autos, cabs, taxis, buggies</p>
          </div>
        </Link>
        <Link href="/services">
          <div className="group p-8 rounded-2xl border bg-card hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <Wrench className="h-8 w-8 mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-3 font-serif">Services</h3>
            <p className="text-base text-muted-foreground">Laundry, Xerox, and other misc</p>
          </div>
        </Link>
        <Link href="/tools">
          <div className="group p-8 rounded-2xl border bg-card hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <Settings className="h-8 w-8 mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-3 font-serif">Tools</h3>
            <p className="text-base text-muted-foreground">Campus map, mess menus, and resources</p>
          </div>
        </Link>
        <Link href="/emergency">
          <div className="group p-8 rounded-2xl border border-rose-300/80 bg-card hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <Siren className="h-8 w-8 mb-4 text-rose-400" />
            <h3 className="text-xl font-medium mb-3 text-rose-400 font-serif">Emergency</h3>
            <p className="text-base text-rose-400">Clinic, ambulance, security</p>
          </div>
        </Link>
      </section>
    </main>
  );
}
