"use client";

import data from "@/data/grievance.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildVCard, downloadVCardFile } from "@/lib/vcard";
import { slugify } from "@/lib/utils";
import { Mail, AlertCircle } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";

type Contact = {
  name?: string;
  role?: string;
  email: string;
};

type GrievanceCategory = {
  title: string;
  description: string;
  contacts: Contact[];
};

type GrievanceData = {
  categories: GrievanceCategory[];
  studentCouncil: {
    name: string;
    description: string;
    contacts: Contact[];
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
          <br />
          <span className="text-xs">This information is for MIT Manipal only.</span>
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
                    name: cat.title,
                    href: `/grievance#${slugify(cat.title)}`,
                    subtitle: cat.contacts.map((c) => c.name || c.role).join(", "),
                  }}
                  size="sm"
                />
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{cat.description}</p>
                <div className="space-y-2.5">
                  {cat.contacts.map((c) => (
                    <div key={c.email} className="space-y-0.5">
                      {c.name && <div className="text-sm font-medium">{c.name}</div>}
                      {c.role && <div className="text-xs text-muted-foreground">{c.role}</div>}
                      <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 text-sm underline">
                        <Mail className="size-3.5 shrink-0" />
                        {c.email}
                      </a>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.contacts.map((c) => (
                    <Button
                      key={c.email}
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        window.location.href = `mailto:${c.email}`;
                      }}
                      className="gap-2"
                    >
                      <Mail className="size-4" />
                      {c.name || c.role || "Email"}
                    </Button>
                  ))}
                  <Button
                    size="sm"
                    onClick={() => {
                      const primary = cat.contacts[0];
                      const v = buildVCard({
                        name: primary.name || primary.role || cat.title,
                        email: primary.email,
                        org: "MIT Manipal",
                        title: primary.role,
                      });
                      downloadVCardFile(primary.name || cat.title, v);
                    }}
                  >
                    Download contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4" id={slugify("Student Council")}>
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
              }}
              size="sm"
            />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2.5">
              <AlertCircle className="size-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">{studentCouncil.description}</p>
            </div>
            <div className="space-y-2.5">
              {studentCouncil.contacts.map((c) => (
                <div key={c.email} className="space-y-0.5">
                  {c.role && <div className="text-sm font-medium">{c.role}</div>}
                  <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 text-sm underline">
                    <Mail className="size-3.5 shrink-0" />
                    {c.email}
                  </a>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {studentCouncil.contacts.map((c) => (
                <Button
                  key={c.email}
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    window.location.href = `mailto:${c.email}`;
                  }}
                  className="gap-2"
                >
                  <Mail className="size-4" />
                  {c.role || "Email"}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
