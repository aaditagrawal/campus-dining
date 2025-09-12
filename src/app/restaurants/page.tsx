"use client";

import { useMemo } from "react";
import data from "@/data/restaurants.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Restaurant = {
  name: string;
  phones: string[];
  address?: string;
  deliveryFee?: string;
  packagingFee?: string;
  menuImages?: string[];
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

function buildVCard(r: Restaurant) {
  const phone = r.phones?.[0] ?? "";
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${r.name}`,
    `ORG:${r.name}`,
    phone ? `TEL;TYPE=CELL:${phone}` : undefined,
    r.address ? `ADR;TYPE=WORK:;;${r.address}` : undefined,
    "END:VCARD",
  ].filter(Boolean);
  return lines.join("\n");
}

export default function RestaurantsPage() {
  const restaurants = data as Restaurant[];

  const enhanced = useMemo(
    () =>
      restaurants.map((r) => ({
        ...r,
        open: isOpenNow(r.hours),
        range: getDisplayRange(r.hours),
      })),
    [restaurants]
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 grid gap-6">
      <div>
        <h1 className="text-3xl">Restaurants</h1>
        <p className="text-muted-foreground">Click to copy phone or download contact.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {enhanced.map((r) => (
          <Card key={r.name} className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{r.name}</CardTitle>
                {r.range && (
                  <div className="text-xs text-muted-foreground mt-1">{r.open ? "Open now" : "Hours"} • {r.range}</div>
                )}
              </div>
              {r.open !== undefined && (
                <Badge variant={r.open ? "default" : "secondary"}>{r.open ? "Open" : "Closed"}</Badge>
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
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(r.phones?.[0] ?? "");
                  }}
                >
                  Copy Phone
                </Button>
                <Button
                  onClick={() => {
                    const blob = new Blob([buildVCard(r)], { type: "text/vcard" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${r.name.replace(/\s+/g, "_")}.vcf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                  }}
                >
                  Download VCF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}


