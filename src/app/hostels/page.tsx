import data from "@/data/hostels.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Hostel = {
  block: string;
  wardens: { name: string; phone: string; email?: string }[];
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
              {h.wardens.map((w, i) => (
                <div key={i} className="text-sm">
                  <div className="font-medium">{w.name}</div>
                  <div>
                    {w.phone !== "—" ? (
                      <a className="underline" href={`tel:${w.phone}`}>{w.phone}</a>
                    ) : (
                      <span className="text-muted-foreground">Phone: —</span>
                    )}
                  </div>
                  {w.email && <div>{w.email}</div>}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}


