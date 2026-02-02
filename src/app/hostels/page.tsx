"use client";

import { useMemo, useState } from "react";
import data from "@/data/hostels.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildVCard, downloadVCardFile } from "@/lib/vcard";
import { slugify } from "@/lib/utils";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";


type Hostel = {
  block: string;
  campus?: string;
  address?: string;
  receptionPhone?: string;
  email?: string;
  wardens: {
    name: string;
    designation?: string;
    officePhone?: string;
    mobiles?: string[];
    email?: string;
  }[];
};

export default function HostelsPage() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const hostels = data as Hostel[];

  const sortedHostels = useMemo(() => {
    if (!sortOrder) return hostels;
    return [...hostels].sort((a, b) => {
      // Extract block numbers from "Block X" format
      const getBlockNumber = (block: string) => {
        const match = block.match(/Block (\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      };

      const numA = getBlockNumber(a.block);
      const numB = getBlockNumber(b.block);

      if (numA !== numB) {
        return sortOrder === 'asc' ? numA - numB : numB - numA;
      }

      // If numbers are equal, fallback to alphabetical
      return sortOrder === 'asc' ? a.block.localeCompare(b.block) : b.block.localeCompare(a.block);
    });
  }, [hostels, sortOrder]);

  const toggleSort = () => {
    setSortOrder(current => {
      if (current === null) return 'asc';
      if (current === 'asc') return 'desc';
      return null;
    });
  };
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif">Hostels</h1>
          <p className="text-sm text-muted-foreground mt-1">Wardens and block contacts</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSort}
          className="gap-1.5 h-8 text-xs"
        >
          {sortOrder === 'asc' && <ArrowUp className="size-3.5" />}
          {sortOrder === 'desc' && <ArrowDown className="size-3.5" />}
          {sortOrder === null && <ArrowUpDown className="size-3.5" />}
          {sortOrder === 'asc' ? '1→9' : sortOrder === 'desc' ? '9→1' : 'Sort'}
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {sortedHostels.map((h) => (
          <Card key={h.block} id={slugify(h.block)} className="glass">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl font-serif">{h.block}</CardTitle>
                {h.receptionPhone && (
                  <a href={`tel:${h.receptionPhone}`} className="text-xs text-muted-foreground hover:text-foreground">
                    Reception: {h.receptionPhone}
                  </a>
                )}
              </div>
              {h.campus && (
                <p className="text-xs text-muted-foreground">{h.campus}</p>
              )}
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {h.wardens.map((w, i) => (
                <div key={i} id={slugify(`${h.block}-${w.name}`)} className="py-2 first:pt-0 border-t first:border-0 border-border/50">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">{w.name}</div>
                      {w.designation && (
                        <div className="text-xs text-muted-foreground">{w.designation}</div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const v = buildVCard({
                          name: w.name,
                          title: w.designation,
                          phones: [...(w.mobiles ?? []), ...(w.officePhone ? [w.officePhone] : [])],
                          email: w.email,
                          org: h.block,
                          address: [h.campus, h.address].filter(Boolean).join(", ") || undefined,
                        })
                        downloadVCardFile(`${h.block}-${w.name}`, v)
                      }}
                      className="h-7 text-xs px-2 shrink-0"
                    >
                      Save
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                    {w.mobiles && w.mobiles.length > 0 && w.mobiles.map((m) => (
                      <a key={m} href={`tel:${m}`} className="hover:text-foreground hover:underline underline-offset-2">{m}</a>
                    ))}
                    {w.officePhone && (
                      <a href={`tel:${w.officePhone}`} className="hover:text-foreground hover:underline underline-offset-2">Office: {w.officePhone}</a>
                    )}
                    {w.email && (
                      <a href={`mailto:${w.email}`} className="hover:text-foreground hover:underline underline-offset-2 truncate max-w-[200px]">{w.email}</a>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}


