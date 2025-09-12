"use client";

import data from "@/data/emergency.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildVCard, downloadVCardFile } from "@/lib/vcard";

type Emergency = { name: string; phones: string[]; address?: string; notes?: string; accent?: string };

export default function EmergencyPage() {
  const entries = data as Emergency[];
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 grid gap-6">
      <div>
        <h1 className="text-3xl">Emergency Services</h1>
        <p className="text-muted-foreground">Health and safety contacts. In emergencies, call the ambulance first.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {entries.map((e) => (
          <Card key={e.name} className="glass border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{e.name}</CardTitle>
              <Badge className="bg-green-600 text-white">Emergency</Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex flex-wrap gap-2 items-center">
                {e.phones.map((p) => (
                  <a key={p} href={`tel:${p}`} className="underline">
                    {p}
                  </a>
                ))}
              </div>
              {e.address && <div>{e.address}</div>}
              {e.notes && <div className="text-muted-foreground">{e.notes}</div>}
              <div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    const v = buildVCard({ name: e.name, phones: e.phones, address: e.address, org: "Emergency" });
                    downloadVCardFile(e.name, v);
                  }}
                >
                  Download contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}


