"use client";

import data from "@/data/travel.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildVCard, downloadVCardFile } from "@/lib/vcard";
import { slugify } from "@/lib/utils";
import { Phone } from "lucide-react";


type Listing = { name: string; phones: string[]; notes?: string };
type TravelData = { autos: Listing[]; cabs: Listing[] };

export default function TravelPage() {
  const travel = data as TravelData;
  const Section = ({ title, items }: { title: string; items: Listing[] }) => (
    <div className="space-y-4 scroll-mt-24" id={slugify(title)}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((i) => (
          <Card key={i.name} id={slugify(i.name)} className="glass hover:shadow-md transition-shadow duration-200 scroll-mt-24">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{i.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                {i.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s+/g, "")}`} className="underline">
                    {p}
                  </a>
                ))}
              </div>
              {i.notes && <div className="text-sm text-muted-foreground leading-relaxed">{i.notes}</div>}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    window.location.href = `tel:${i.phones?.[0]?.replace(/\s+/g, "") ?? ""}`;
                  }}
                  className="gap-2"
                >
                  <Phone className="size-4" />
                  Call Now
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    const v = buildVCard({ name: i.name, phones: i.phones, org: "Travel" });
                    downloadVCardFile(i.name, v);
                  }}
                >
                  Download contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Travel</h1>
        <p className="text-muted-foreground">Autos, cabs and taxi transport.</p>
      </div>
      <div className="space-y-8">
        <Section title="Autos" items={travel.autos} />
        <Section title="Cabs & Taxis" items={travel.cabs} />
      </div>
    </main>
  );
}


