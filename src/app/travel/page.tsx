"use client";

import data from "@/data/travel.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildVCard, downloadVCardFile } from "@/lib/vcard";

type Listing = { name: string; phones: string[]; notes?: string };
type TravelData = { autos: Listing[]; cabs: Listing[] };

export default function TravelPage() {
  const travel = data as TravelData;
  const Section = ({ title, items }: { title: string; items: Listing[] }) => (
    <div className="space-y-2">
      <h2 className="text-xl">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((i) => (
          <Card key={i.name} className="glass">
            <CardHeader>
              <CardTitle>{i.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex flex-wrap gap-2 items-center">
                {i.phones.map((p) => (
                  <a key={p} href={`tel:${p}`} className="underline">
                    {p}
                  </a>
                ))}
              </div>
              {i.notes && <div className="text-muted-foreground">{i.notes}</div>}
              <div>
                <Button
                  variant="secondary"
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
    <main className="max-w-5xl mx-auto px-4 py-8 grid gap-8">
      <div>
        <h1 className="text-3xl">Travel</h1>
        <p className="text-muted-foreground">Autos, cabs and taxi transport.</p>
      </div>
      <Section title="Autos" items={travel.autos} />
      <Section title="Cabs & Taxis" items={travel.cabs} />
    </main>
  );
}


