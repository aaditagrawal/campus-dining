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
    <main className="max-w-5xl mx-auto px-4 py-8 grid gap-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl">Hostels</h1>
            <p className="text-muted-foreground">Wardens and contact details for each block.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSort}
            className="gap-2"
          >
            {sortOrder === 'asc' && <ArrowUp className="size-4" />}
            {sortOrder === 'desc' && <ArrowDown className="size-4" />}
            {sortOrder === null && <ArrowUpDown className="size-4" />}
            Sort {sortOrder === 'asc' ? 'Block ↑' : sortOrder === 'desc' ? 'Block ↓' : 'Block'}
          </Button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {sortedHostels.map((h) => (
          <Card key={h.block} id={slugify(h.block)} className="glass">
            <CardHeader>
              <CardTitle>{h.block}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(h.campus || h.address) && (
                <div className="text-sm text-muted-foreground">
                  {h.campus && <div>{h.campus}</div>}
                  {h.address && <div>{h.address}</div>}
                </div>
              )}
              {(h.receptionPhone || h.email) && (
                <div className="text-sm">
                  {h.receptionPhone && (
                    <div>
                      Reception No: {" "}
                      <a className="underline" href={`tel:${h.receptionPhone}`}>{h.receptionPhone}</a>
                    </div>
                  )}
                  {h.email && (
                    <div>
                      Email id: {" "}
                      <a className="underline" href={`mailto:${h.email}`}>{h.email}</a>
                    </div>
                  )}
                </div>
              )}
              <div className="mt-2">
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
                >
                  Download block contact
                </Button>
              </div>
              {/* separator between block details and wardens */}
              <div className="my-3 h-px bg-border" />
              {h.wardens.map((w, i) => (
                <div key={i} id={slugify(`${h.block}-${w.name}`)} className="text-sm">
                  <div className="font-medium">{w.name}</div>
                  {w.designation && (
                    <div className="text-muted-foreground">{w.designation}</div>
                  )}
                  {w.officePhone && (
                    <div>
                      Ph: (off) {" "}
                      <a className="underline" href={`tel:${w.officePhone}`}>{w.officePhone}</a>
                    </div>
                  )}
                  {w.mobiles && w.mobiles.length > 0 && (
                    <div>
                      Mobile : {w.mobiles.map((m, idx) => (
                        <span key={idx}>
                          <a key={m} className="underline" href={`tel:${m}`}>{m}</a>
                          {idx < w.mobiles!.length - 1 ? "/" : null}
                        </span>
                      ))}
                    </div>
                  )}
                  {w.email && (
                    <div>
                      <a className="underline" href={`mailto:${w.email}`}>{w.email}</a>
                    </div>
                  )}
                  <div className="mt-2">
                    <Button
                      variant="secondary"
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
                    >
                      Download contact
                    </Button>
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


