import restaurants from "@/data/restaurants.json";
import services from "@/data/services.json";
import travel from "@/data/travel.json";
import emergencies from "@/data/emergency.json";
import hostels from "@/data/hostels.json";
import { slugify } from "@/lib/utils";

export type SearchItem = {
  title: string;
  subtitle?: string;
  section: string; // Restaurants, Hostels, etc.
  href: string; // absolute path with optional #anchor
  phones?: string[];
  address?: string;
  notes?: string;
};

export function getAllSearchItems(): SearchItem[] {
  const items: SearchItem[] = [];

  // Section entries for quick navigation
  const sections: Array<[string, string]> = [
    ["Home", "/"],
    ["Academics", "/academics"],
    ["Restaurants", "/restaurants"],
    ["Hostels", "/hostels"],
    ["Travel", "/travel"],
    ["Emergency", "/emergency"],
    ["Services", "/services"],
  ];
  for (const [title, href] of sections) {
    items.push({ title, section: "Pages", href });
  }

  // Restaurants
  for (const r of restaurants as Array<any>) {
    items.push({
      title: r.name,
      section: "Restaurants",
      href: `/restaurants#${slugify(r.name)}`,
      phones: r.phones,
      address: r.address,
      subtitle: [r.deliveryFee ? `Delivery ${r.deliveryFee}` : null, r.packagingFee ? `Packaging ${r.packagingFee}` : null]
        .filter(Boolean)
        .join(" • ") || undefined,
    });
  }

  // Services
  const svc = services as any;
  const svcSections: Array<[string, Array<any>]> = [
    ["Laundry Services", svc.laundry ?? []],
    ["Xerox & Printing", svc.xerox ?? []],
  ];
  for (const [svcTitle, list] of svcSections) {
    for (const s of list) {
      items.push({
        title: s.name,
        section: "Services",
        subtitle: svcTitle,
        href: `/services#${slugify(s.name)}`,
        phones: s.phones,
        notes: s.notes,
      });
    }
  }

  // Travel
  const trv = travel as any;
  const trvSections: Array<[string, Array<any>]> = [
    ["Autos", trv.autos ?? []],
    ["Cabs & Taxis", trv.cabs ?? []],
  ];
  for (const [cat, list] of trvSections) {
    for (const t of list) {
      items.push({
        title: t.name,
        section: "Travel",
        subtitle: cat,
        href: `/travel#${slugify(t.name)}`,
        phones: t.phones,
        notes: t.notes,
      });
    }
  }

  // Emergency
  for (const e of emergencies as Array<any>) {
    items.push({
      title: e.name,
      section: "Emergency",
      href: `/emergency#${slugify(e.name)}`,
      phones: e.phones,
      address: e.address,
      notes: e.notes,
    });
  }

  // Hostels (blocks and wardens)
  for (const h of hostels as Array<any>) {
    items.push({
      title: h.block,
      section: "Hostels",
      href: `/hostels#${slugify(h.block)}`,
      address: [h.campus, h.address].filter(Boolean).join(", ") || undefined,
      phones: h.receptionPhone ? [h.receptionPhone] : undefined,
      subtitle: h.campus,
    });
    if (Array.isArray(h.wardens)) {
      for (const w of h.wardens) {
        items.push({
          title: w.name,
          section: "Hostels",
          subtitle: `${h.block}${w.designation ? ` • ${w.designation}` : ""}`,
          href: `/hostels#${slugify(`${h.block}-${w.name}`)}`,
          phones: [
            ...(Array.isArray(w.mobiles) ? w.mobiles : []),
            ...(w.officePhone ? [w.officePhone] : []),
          ],
          notes: w.email,
        });
      }
    }
  }

  return items;
}
