"use client";

import Link from "next/link";
import {
  Siren,
  GraduationCap,
  Search,
  Settings,
  Mail,
  Utensils,
  Building,
  Car,
  Wrench,
} from "lucide-react";
import { useMemo } from "react";

export default function Home() {
  const isMac = useMemo(
    () => navigator.platform.toUpperCase().includes("MAC"),
    [],
  );
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 grid gap-10">
      <section className="text-center space-y-5">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight">
          MIT Manipal Directory
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Find restaurants, hostels, travel, services, and emergency contacts.
        </p>
        <div className="mx-auto max-w-sm pt-2">
          <button
            className="w-full flex items-center gap-3 rounded-full border border-border/60 bg-card/50 px-5 py-3 text-left text-sm hover:bg-muted/40 hover:border-border transition-all duration-200"
            onClick={() => {
              window.dispatchEvent(new Event("open-global-search"));
            }}
            aria-label="Open search"
          >
            <Search className="size-4 text-muted-foreground" />
            <span className="flex-1 text-muted-foreground">
              Search anything…
            </span>
            <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              {isMac ? "⌘K" : "Ctrl+K"}
            </kbd>
          </button>
        </div>
      </section>

      <section className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-center">
        <p className="text-sm flex items-center justify-center gap-2 flex-wrap">
          <Mail className="h-4 w-4 text-emerald-500" />
          <span className="text-muted-foreground">
            Need a leave request?
          </span>
          <Link
            href="/tools/mail-to-warden"
            className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
          >
            Generate Mail to Warden →
          </Link>
        </p>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Link href="/academics" className="group">
          <div className="h-full p-5 md:p-6 rounded-xl border border-border/50 bg-card/60 hover:bg-card hover:border-border/80 transition-all duration-200">
            <GraduationCap className="h-6 w-6 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            <h3 className="text-base font-medium mb-1 font-serif">Academics</h3>
            <p className="text-sm text-muted-foreground leading-snug">
              Systems & portals
            </p>
          </div>
        </Link>
        <Link href="/restaurants" className="group">
          <div className="h-full p-5 md:p-6 rounded-xl border border-border/50 bg-card/60 hover:bg-card hover:border-border/80 transition-all duration-200">
            <Utensils className="h-6 w-6 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            <h3 className="text-base font-medium mb-1 font-serif">Restaurants</h3>
            <p className="text-sm text-muted-foreground leading-snug">
              Menus & delivery
            </p>
          </div>
        </Link>
        <Link href="/hostels" className="group">
          <div className="h-full p-5 md:p-6 rounded-xl border border-border/50 bg-card/60 hover:bg-card hover:border-border/80 transition-all duration-200">
            <Building className="h-6 w-6 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            <h3 className="text-base font-medium mb-1 font-serif">Hostels</h3>
            <p className="text-sm text-muted-foreground leading-snug">
              Wardens & contacts
            </p>
          </div>
        </Link>
        <Link href="/travel" className="group">
          <div className="h-full p-5 md:p-6 rounded-xl border border-border/50 bg-card/60 hover:bg-card hover:border-border/80 transition-all duration-200">
            <Car className="h-6 w-6 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            <h3 className="text-base font-medium mb-1 font-serif">Travel</h3>
            <p className="text-sm text-muted-foreground leading-snug">
              Autos, cabs & taxis
            </p>
          </div>
        </Link>
        <Link href="/services" className="group">
          <div className="h-full p-5 md:p-6 rounded-xl border border-border/50 bg-card/60 hover:bg-card hover:border-border/80 transition-all duration-200">
            <Wrench className="h-6 w-6 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            <h3 className="text-base font-medium mb-1 font-serif">Services</h3>
            <p className="text-sm text-muted-foreground leading-snug">
              Laundry & xerox
            </p>
          </div>
        </Link>
        <Link href="/tools" className="group">
          <div className="h-full p-5 md:p-6 rounded-xl border border-border/50 bg-card/60 hover:bg-card hover:border-border/80 transition-all duration-200">
            <Settings className="h-6 w-6 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            <h3 className="text-base font-medium mb-1 font-serif">Tools</h3>
            <p className="text-sm text-muted-foreground leading-snug">
              Maps & resources
            </p>
          </div>
        </Link>
        <Link href="/emergency" className="group col-span-2">
          <div className="h-full p-5 md:p-6 rounded-xl border border-rose-400/40 bg-rose-500/5 hover:bg-rose-500/10 hover:border-rose-400/60 transition-all duration-200">
            <div className="flex items-center gap-3">
              <Siren className="h-6 w-6 text-rose-500" />
              <div>
                <h3 className="text-base font-medium text-rose-600 dark:text-rose-400 font-serif">
                  Emergency
                </h3>
                <p className="text-sm text-rose-500/80">
                  Clinic, ambulance & security
                </p>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
