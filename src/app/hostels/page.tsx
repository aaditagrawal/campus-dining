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
    <main className="max-w-6xl mx-auto px-4 py-8 grid gap-8">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif font-semibold">Hostels</h1>
            <p className="text-lg text-muted-foreground mt-2">Wardens and contact details for each block.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSort}
            className="gap-2 h-10"
          >
            {sortOrder === 'asc' && <ArrowUp className="size-4" />}
            {sortOrder === 'desc' && <ArrowDown className="size-4" />}
            {sortOrder === null && <ArrowUpDown className="size-4" />}
            Sort {sortOrder === 'asc' ? 'Block ↑' : sortOrder === 'desc' ? 'Block ↓' : 'Block'}
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {sortedHostels.map((h) => (
          <Card key={h.block} id={slugify(h.block)} className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-semibold font-serif">{h.block}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Block Information Section */}
              <div className="space-y-3 mt-2">
                <h3 className="text-base font-semibold text-foreground uppercase tracking-wide font-sans">Block Information</h3>
                {(h.campus || h.address) && (
                  <div className="space-y-1">
                    {h.campus && <div className="text-base text-muted-foreground">{h.campus}</div>}
                    {h.address && <div className="text-base text-muted-foreground">{h.address}</div>}
                  </div>
                )}
                {(h.receptionPhone || h.email) && (
                  <div className="space-y-2">
                    {h.receptionPhone && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Reception:</span>
                        <a className="text-base font-medium underline hover:no-underline" href={`tel:${h.receptionPhone}`}>{h.receptionPhone}</a>
                      </div>
                    )}
                    {h.email && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Email:</span>
                        <a className="text-base underline hover:no-underline" href={`mailto:${h.email}`}>{h.email}</a>
                      </div>
                    )}
                  </div>
                )}
                <div className="pt-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      const v = buildVCard({
                        name: h.block,
                        org: h.campus,
                        phones: h.receptionPhone ? [h.receptionPhone] : [],
                        email: h.email,
                        address: [h.campus, h.address].filter(Boolean).join(", ") || undefined,
                      })
                      downloadVCardFile(`${h.block}-Reception`, v)
                    }}
                    className="w-full sm:w-auto"
                  >
                    Download Block Contact
                  </Button>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t pt-6">
                <h3 className="text-base font-semibold text-foreground uppercase tracking-wide mb-4 font-sans">Wardens</h3>
                {h.wardens.map((w, i) => (
                  <div key={i} id={slugify(`${h.block}-${w.name}`)} className="space-y-3 pt-6 pb-8 last:pb-0 last:border-0 border-b last:border-0">
                    <div className="space-y-1">
                      <div className="text-xl font-semibold font-serif">{w.name}</div>
                      {w.designation && (
                        <div className="text-base text-muted-foreground font-medium">{w.designation}</div>
                      )}
                    </div>
                    
                    {/* Contact Details */}
                    <div className="space-y-2">
                      {w.officePhone && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">Office:</span>
                          <a className="text-base underline hover:no-underline" href={`tel:${w.officePhone}`}>{w.officePhone}</a>
                        </div>
                      )}
                      {w.mobiles && w.mobiles.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">Mobile:</span>
                          <span className="text-base">
                            {w.mobiles.map((m, idx) => (
                              <span key={m}>
                                <a className="underline hover:no-underline" href={`tel:${m}`}>{m}</a>
                                {idx < w.mobiles!.length - 1 && <span className="mx-1">/</span>}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                      {w.email && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">Email:</span>
                          <a className="text-base underline hover:no-underline" href={`mailto:${w.email}`}>{w.email}</a>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-1">
                      <Button
                        variant="secondary"
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
                        className="w-full sm:w-auto"
                      >
                        Download Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}


