"use client";

import { useMemo, useState, useTransition, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildVCard, downloadVCardFile } from "@/lib/vcard";
import restaurantsData from "@/data/restaurants.json";
import { slugify } from "@/lib/utils";
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink, Clock, Phone } from "lucide-react";


type Restaurant = {
  name: string;
  phones: string[];
  address?: string;
  deliveryFee?: string;
  packagingFee?: string;
  menuImages?: string[];
  menuUrl?: string;
  hours?: Array<{
    day: number; // 0 = Sunday ... 6 = Saturday
    open: string; // "23:00"
    close: string; // "02:00" may roll over
  }>;
};

function isOpenNow(hours?: Restaurant["hours"]) {
  if (!hours || hours.length === 0) return undefined;
  const now = new Date();
  const day = now.getDay();
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  // consider both same-day and previous-day rollovers
  const today = hours.filter((h) => h.day === day);
  const yesterday = hours.filter((h) => h.day === ((day + 6) % 7));

  const toMinutes = (t: string) => {
    const [H, M] = t.split(":" ).map(Number);
    return H * 60 + M;
  };

  const within = (open: number, close: number) => {
    if (close < open) {
      // rolls past midnight
      return minutesNow >= open || minutesNow < close;
    }
    return minutesNow >= open && minutesNow < close;
  };

  for (const h of today) {
    if (within(toMinutes(h.open), toMinutes(h.close))) return true;
  }
  // previous-day rollover window
  for (const h of yesterday) {
    const open = toMinutes(h.open);
    const close = toMinutes(h.close);
    if (close < open) {
      if (within(open, close)) return true;
    }
  }
  return false;
}

function formatTime12h(hhmm: string) {
  const [hStr, mStr] = hhmm.split(":");
  let hours = Number(hStr);
  const minutes = Number(mStr);
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const mm = String(minutes).padStart(2, "0");
  return `${hours}:${mm} ${suffix}`;
}

function getDisplayRange(hours?: Restaurant["hours"]) {
  if (!hours || hours.length === 0) return undefined;
  const now = new Date();
  const day = now.getDay();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const toMinutes = (t: string) => {
    const [H, M] = t.split(":" ).map(Number);
    return H * 60 + M;
  };

  const within = (open: number, close: number) => {
    if (close < open) {
      return minutesNow >= open || minutesNow < close;
    }
    return minutesNow >= open && minutesNow < close;
  };

  const today = hours.filter((h) => h.day === day);
  const yesterday = hours.filter((h) => h.day === ((day + 6) % 7));

  // Prefer the active window if currently within one (even from yesterday)
  for (const h of today) {
    if (within(toMinutes(h.open), toMinutes(h.close))) {
      return `${formatTime12h(h.open)}–${formatTime12h(h.close)}`;
    }
  }
  for (const h of yesterday) {
    const open = toMinutes(h.open);
    const close = toMinutes(h.close);
    if (close < open && within(open, close)) {
      return `${formatTime12h(h.open)}–${formatTime12h(h.close)}`;
    }
  }

  // Otherwise show the first window for today if present; else fallback to first entry
  const h = today[0] ?? hours[0];
  if (!h) return undefined;
  return `${formatTime12h(h.open)}–${formatTime12h(h.close)}`;
}

function downloadRestaurantVcf(r: Restaurant) {
  const v = buildVCard({ name: r.name, org: r.name, phones: r.phones, address: r.address });
  downloadVCardFile(r.name, v);
}

const RestaurantCard = memo(function RestaurantCard({ r }: { r: Restaurant & { open?: boolean; range?: string } }) {
  return (
    <Card id={slugify(r.name)} className="glass mb-3 break-inside-avoid scroll-mt-24">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{r.name}</CardTitle>
          {r.open !== undefined && (
            <Badge variant="outline" className={r.open ? "border-green-500/50 text-green-600 dark:text-green-400" : "border-rose-400/50 text-rose-500"}>
              {r.open ? "Open" : "Closed"}
            </Badge>
          )}
        </div>
        {r.range && (
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="size-3" />
            {r.range}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {r.phones?.map((p) => (
            <a key={p} href={`tel:${p.replace(/\s+/g, "")}`} className="text-muted-foreground hover:text-foreground underline-offset-2 hover:underline">
              {p}
            </a>
          ))}
        </div>
        {(r.deliveryFee || r.packagingFee) && (
          <div className="text-xs text-muted-foreground">
            {r.deliveryFee && <span>Delivery: {r.deliveryFee}</span>}
            {r.deliveryFee && r.packagingFee && <span> · </span>}
            {r.packagingFee && <span>Packaging: {r.packagingFee}</span>}
          </div>
        )}
        <div className="flex gap-2 flex-wrap pt-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              window.location.href = `tel:${r.phones?.[0]?.replace(/\s+/g, "") ?? ""}`;
            }}
            className="gap-1.5 h-8"
          >
            <Phone className="size-3.5" />
            Call
          </Button>
          <Button size="sm" variant="outline" onClick={() => downloadRestaurantVcf(r)} className="h-8">
            Save Contact
          </Button>
          {r.menuUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(r.menuUrl, '_blank')}
              className="gap-1.5 h-8"
            >
              <ExternalLink className="size-3.5" />
              Menu
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

export default function RestaurantsPage() {
  const [sortOrder, setSortOrder] = useState<'alpha-asc' | 'alpha-desc' | 'open-now' | null>(null);
  const [, startTransition] = useTransition();

  const enhanced = useMemo(
    () =>
      restaurantsData.map((r) => ({
        ...r,
        open: isOpenNow(r.hours),
        range: getDisplayRange(r.hours),
      })),
    []
  );

  const sortedRestaurants = useMemo(() => {
    if (!sortOrder) return enhanced;
    return [...enhanced].sort((a, b) => {
      if (sortOrder === 'open-now') {
        const aOpen = a.open === true;
        const bOpen = b.open === true;

        if (aOpen && !bOpen) return -1;
        if (!aOpen && bOpen) return 1;

        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'alpha-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'alpha-desc') {
        return b.name.localeCompare(a.name);
      }

      return 0;
    });
  }, [enhanced, sortOrder]);

  const toggleSort = () => {
    startTransition(() => {
      setSortOrder(current => {
        if (current === null) return 'alpha-asc';
        if (current === 'alpha-asc') return 'alpha-desc';
        if (current === 'alpha-desc') return 'open-now';
        return null;
      });
    });
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif">Restaurants</h1>
          <p className="text-sm text-muted-foreground mt-1">Call or save contacts</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSort}
          className="gap-1.5 h-8 text-xs"
        >
          {sortOrder === 'alpha-asc' && <ArrowUp className="size-3.5" />}
          {sortOrder === 'alpha-desc' && <ArrowDown className="size-3.5" />}
          {sortOrder === 'open-now' && <Clock className="size-3.5" />}
          {sortOrder === null && <ArrowUpDown className="size-3.5" />}
          {sortOrder === 'alpha-asc' ? 'A-Z' : sortOrder === 'alpha-desc' ? 'Z-A' : sortOrder === 'open-now' ? 'Open' : 'Sort'}
        </Button>
      </div>
      <div className="columns-1 sm:columns-2 gap-3">
        {sortedRestaurants.map((r) => (
          <RestaurantCard key={r.name} r={r} />
        ))}
      </div>
    </main>
  );
}


