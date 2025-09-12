"use client";

import data from "@/data/hostels.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildVCard, downloadVCardFile } from "@/lib/vcard";

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
  const hostels = data as Hostel[];
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 grid gap-6">
      <div>
        <h1 className="text-3xl">Hostels</h1>
        <p className="text-muted-foreground">Wardens and contact details for each block.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {hostels.map((h) => (
          <Card key={h.block} className="glass">
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
              {h.wardens.map((w, i) => (
                <div key={i} className="text-sm">
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
                        <>
                          <a key={m} className="underline" href={`tel:${m}`}>{m}</a>
                          {idx < w.mobiles!.length - 1 ? "/" : null}
                        </>
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


