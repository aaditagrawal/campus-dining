"use client";

import data from "@/data/grievance.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildVCard, downloadVCardFile } from "@/lib/vcard";
import { slugify } from "@/lib/utils";
import { Phone, Mail, ExternalLink, AlertCircle } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";

type GrievanceCategory = {
  title: string;
  description: string;
  contact: string;
  email: string;
  phones: string[];
};

type GrievanceData = {
  categories: GrievanceCategory[];
  studentCouncil: {
    name: string;
    description: string;
    email: string;
    formUrl: string;
    phones: string[];
  };
};

export default function GrievancePage() {
  const { categories, studentCouncil } = data as GrievanceData;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Grievance Redressal</h1>
        <p className="text-muted-foreground">
          Got a complaint? Reach out to the right authority. CC the Student Council in all your emails.
        </p>
      </div>

      <section className="space-y-4 mb-8" id={slugify("Grievance Categories")}>
        <h2 className="text-xl font-semibold">Who to Contact</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Card key={cat.title} id={slugify(cat.title)} className="glass hover:shadow-md transition-shadow duration-200 scroll-mt-24">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg">{cat.title}</CardTitle>
                <FavoriteButton
                  item={{
                    id: `grievance-${slugify(cat.title)}`,
                    type: "grievance",
                    name: cat.contact,
                    href: `/grievance#${slugify(cat.title)}`,
                    phones: cat.phones.length > 0 ? cat.phones : undefined,
                    subtitle: cat.title,
                  }}
                  size="sm"
                />
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{cat.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Contact:</span>
                  <span className="text-sm">{cat.contact}</span>
                </div>
                {cat.email && (
                  <a href={`mailto:${cat.email}`} className="flex items-center gap-2 text-sm underline">
                    <Mail className="size-3.5" />
                    {cat.email}
                  </a>
                )}
                {cat.phones.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    {cat.phones.map((p) => (
                      <a key={p} href={`tel:${p.replace(/\s+/g, "")}`} className="underline text-sm">
                        {p}
                      </a>
                    ))}
                  </div>
                )}
                {(cat.phones.length > 0 || cat.email) && (
                  <div className="flex gap-2 pt-2">
                    {cat.phones.length > 0 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          window.location.href = `tel:${cat.phones[0]?.replace(/\s+/g, "") ?? ""}`;
                        }}
                        className="gap-2"
                      >
                        <Phone className="size-4" />
                        Call Now
                      </Button>
                    )}
                    {cat.email && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          window.location.href = `mailto:${cat.email}`;
                        }}
                        className="gap-2"
                      >
                        <Mail className="size-4" />
                        Email
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => {
                        const v = buildVCard({
                          name: cat.contact,
                          phones: cat.phones,
                          email: cat.email || undefined,
                          org: "MIT Manipal",
                        });
                        downloadVCardFile(cat.contact, v);
                      }}
                    >
                      Download contact
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4 mb-8" id={slugify("Student Council")}>
        <h2 className="text-xl font-semibold">Student Council</h2>
        <Card className="glass hover:shadow-md transition-shadow duration-200 scroll-mt-24">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">{studentCouncil.name}</CardTitle>
            <FavoriteButton
              item={{
                id: "grievance-student-council",
                type: "grievance",
                name: studentCouncil.name,
                href: `/grievance#${slugify("Student Council")}`,
                phones: studentCouncil.phones.length > 0 ? studentCouncil.phones : undefined,
              }}
              size="sm"
            />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2.5">
              <AlertCircle className="size-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">{studentCouncil.description}</p>
            </div>
            {studentCouncil.email && (
              <a href={`mailto:${studentCouncil.email}`} className="flex items-center gap-2 text-sm underline">
                <Mail className="size-3.5" />
                {studentCouncil.email}
              </a>
            )}
            {studentCouncil.phones.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                {studentCouncil.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s+/g, "")}`} className="underline text-sm">
                    {p}
                  </a>
                ))}
              </div>
            )}
            {studentCouncil.formUrl && (
              <a
                href={studentCouncil.formUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm underline"
              >
                <ExternalLink className="size-3.5" />
                Submit Grievance Form
              </a>
            )}
            <div className="flex gap-2 pt-2">
              {studentCouncil.email && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    window.location.href = `mailto:${studentCouncil.email}`;
                  }}
                  className="gap-2"
                >
                  <Mail className="size-4" />
                  Email Us
                </Button>
              )}
              {studentCouncil.phones.length > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    window.location.href = `tel:${studentCouncil.phones[0]?.replace(/\s+/g, "") ?? ""}`;
                  }}
                  className="gap-2"
                >
                  <Phone className="size-4" />
                  Call Now
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
