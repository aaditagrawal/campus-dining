import restaurants from "@/data/restaurants.json";
import services from "@/data/services.json";
import travel from "@/data/travel.json";
import emergencies from "@/data/emergency.json";
import hostels from "@/data/hostels.json";
import academics from "@/data/academics.json";
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

// Type definitions for data structures
type Restaurant = {
  name: string;
  phones: string[];
  deliveryFee?: string;
  packagingFee?: string;
  address?: string;
  hours?: Array<{ day: number; open: string; close: string }>;
};

type ServiceItem = {
  name: string;
  phones: string[];
  notes?: string;
};

type ServicesData = {
  laundry?: ServiceItem[];
  xerox?: ServiceItem[];
};

type TravelItem = {
  name: string;
  phones: string[];
  notes?: string;
};

type TravelData = {
  autos?: TravelItem[];
  cabs?: TravelItem[];
};

type EmergencyItem = {
  name: string;
  phones: string[];
  address?: string;
  notes?: string;
  accent?: string;
};

type Warden = {
  name: string;
  designation?: string;
  officePhone?: string;
  mobiles?: string[];
  email?: string;
};

type Hostel = {
  block: string;
  campus: string;
  address?: string;
  receptionPhone?: string;
  email?: string;
  wardens?: Warden[];
};

type AcademicItem = {
  name: string;
  description?: string;
  url: string;
  credentials?: {
    userId: string;
    password: string;
  };
};

type AcademicSection = {
  section: string;
  items: AcademicItem[];
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
    if (title && href) {
      items.push({ title, section: "Pages", href });
    }
  }

  // Restaurants
  for (const r of restaurants as Restaurant[]) {
    if (r && r.name) {
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
  }

  // Services
  const svc = services as ServicesData;
  const svcSections: Array<[string, ServiceItem[]]> = [
    ["Laundry Services", svc.laundry ?? []],
    ["Xerox & Printing", svc.xerox ?? []],
  ];
  for (const [svcTitle, list] of svcSections) {
    if (svcTitle && Array.isArray(list)) {
      for (const s of list) {
        if (s && s.name) {
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
    }
  }

  // Travel
  const trv = travel as TravelData;
  const trvSections: Array<[string, TravelItem[]]> = [
    ["Autos", trv.autos ?? []],
    ["Cabs & Taxis", trv.cabs ?? []],
  ];
  for (const [cat, list] of trvSections) {
    if (cat && Array.isArray(list)) {
      for (const t of list) {
        if (t && t.name) {
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
    }
  }

  // Emergency
  for (const e of emergencies as EmergencyItem[]) {
    if (e && e.name) {
      items.push({
        title: e.name,
        section: "Emergency",
        href: `/emergency#${slugify(e.name)}`,
        phones: e.phones,
        address: e.address,
        notes: e.notes,
      });
    }
  }

  // Hostels (blocks and wardens)
  for (const h of hostels as Hostel[]) {
    if (h && h.block) {
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
          if (w && w.name) {
            items.push({
              title: w.name,
              section: "Hostels",
              subtitle: `${h.block}${w.designation ? ` • ${w.designation}` : ""}`,
              href: `/hostels#${slugify(h.block)}`,
              phones: [
                ...(Array.isArray(w.mobiles) ? w.mobiles : []),
                ...(w.officePhone ? [w.officePhone] : []),
              ],
              notes: w.email,
            });
          }
        }
      }
    }
  }

  // Academics
  for (const section of academics as AcademicSection[]) {
    if (section && section.section && Array.isArray(section.items)) {
      // Index the section header
      items.push({
        title: section.section,
        section: "Academics",
        href: `/academics#${slugify(section.section)}`,
      });

      // Index individual academic resources
      for (const item of section.items) {
        if (item && item.name) {
          items.push({
            title: item.name,
            section: "Academics",
            subtitle: section.section,
            href: `/academics#${slugify(item.name)}`,
            notes: item.description,
          });
        }
      }
    }
  }

  return items;
}
