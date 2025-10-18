"use client";

import { useMemo, useState } from "react";
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

export default function RestaurantsPage() {
  const [sortOrder, setSortOrder] = useState<'alpha-asc' | 'alpha-desc' | 'open-now' | null>(null);

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
        // Open restaurants first, then by name
        const aOpen = a.open === true;
        const bOpen = b.open === true;

        if (aOpen && !bOpen) return -1;
        if (!aOpen && bOpen) return 1;

        // If both open or both closed, sort alphabetically
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
    setSortOrder(current => {
      if (current === null) return 'alpha-asc';
      if (current === 'alpha-asc') return 'alpha-desc';
      if (current === 'alpha-desc') return 'open-now';
      return null;
    });
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 grid gap-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl">Restaurants</h1>
            <p className="text-muted-foreground">Call restaurants directly or download contact.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSort}
            className="gap-2"
          >
            {sortOrder === 'alpha-asc' && <ArrowUp className="size-4" />}
            {sortOrder === 'alpha-desc' && <ArrowDown className="size-4" />}
            {sortOrder === 'open-now' && <Clock className="size-4" />}
            {sortOrder === null && <ArrowUpDown className="size-4" />}
            Sort {sortOrder === 'alpha-asc' ? 'A-Z' : sortOrder === 'alpha-desc' ? 'Z-A' : sortOrder === 'open-now' ? 'Open Now' : 'Name'}
          </Button>
        </div>
      </div>
      <div className="[column-fill:_balance]_columns-1 sm:columns-2 gap-4">
        {sortedRestaurants.map((r) => (
          <Card key={r.name} id={slugify(r.name)} className="glass mb-4 break-inside-avoid scroll-mt-24">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{r.name}</CardTitle>
                {r.range && (
                  <div className="text-xs text-muted-foreground mt-1">Hours • {r.range}</div>
                )}
              </div>
              {r.open !== undefined && (
                <Badge className={r.open ? "bg-green-600 text-white" : "bg-rose-400 text-white"}>{r.open ? "Open" : "Closed"}</Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2 items-center">
                {r.phones?.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s+/g, "")}`} className="underline">
                    {p}
                  </a>
                ))}
              </div>
              {(r.deliveryFee || r.packagingFee) && (
                <div className="text-sm text-muted-foreground">
                  {r.deliveryFee && <span>Delivery: {r.deliveryFee}</span>} {" "}
                  {r.packagingFee && <span>• Packaging: {r.packagingFee}</span>}
                </div>
              )}
              {r.address && <div className="text-sm text-muted-foreground">{r.address}</div>}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="secondary"
                  onClick={() => {
                    window.location.href = `tel:${r.phones?.[0]?.replace(/\s+/g, "") ?? ""}`;
                  }}
                  className="gap-2"
                >
                  <Phone className="size-4" />
                  Call Now
                </Button>
                <Button onClick={() => downloadRestaurantVcf(r)}>Download contact</Button>
                {r.menuUrl && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(r.menuUrl, '_blank')}
                    className="gap-2"
                  >
                    <ExternalLink className="size-4" />
                    Menu
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}


