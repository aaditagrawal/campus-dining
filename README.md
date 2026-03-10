# MIT Manipal Directory

Campus directory for MIT Manipal students. Look up restaurants, hostels, travel, services, academics, grievance contacts, and emergency numbers.

Live at https://cd.coolstuff.work

## What's in it

**Restaurants** — 12+ listings with phone numbers, delivery fees, packaging costs, and live open/closed status calculated from operating hours. Covers places like Taco House, Hungry House, Hit&Run, and more around campus.

**Hostels** — every block (4, 7, 8, 9, 10, 14, 15, 17, 18, 19, 20, 21, 22) with warden names, designations, office phones, mobile numbers, and emails. Reception contacts for each block too.

**Travel** — auto rickshaw contacts for Gate 2 and Gate 4 stands, individual auto drivers, and cab services (Manipal Khaas, Manipal Cabs, Sashikant Taxi). Includes airport pricing tables.

**Services** — laundry (Dhobimate) and xerox/printing shops (Om Xerox, Print Shop, Pratham Xerox, FC2 Xerox) with phone numbers and locations.

**Academics** — links to SLCM (both new and legacy), library question papers, EBSCO database, Lighthouse for semester resources, Impartus for class recordings, Brightspace Pulse, Manipal PURE, and Microsoft 365 apps.

**Grievance Redressal** — who to contact for what. Food and hostel issues go to CWO, buggy/transport to Dr. V Ramachandra Murty, student welfare to SA/SW offices, academic issues to the Academic Section. Student Council contacts (President, Tech Secretary, General Secretary) are listed separately. MIT Manipal only.

**Emergency** — campus numbers (Student Clinic, KMC Ambulance, MAHE Control Room, Campus Patrol, Fire), local police, and national helplines (100, 101, 102, 112, Women's Helpline, Child in Distress). Suicide prevention helplines (Aasra, Spandana) are listed too.

**Search** — Cmd+K (or Ctrl+K) opens a fuzzy search across every contact, restaurant, warden, service, and page. Results link directly to the relevant card on the page.

**Other features** — favorite any contact to save it locally, download vCards for any listing, dark/light mode toggle.

## Running locally

```bash
git clone https://github.com/aaditagrawal/campus-dir.git
cd campus-dir
bun install
bun dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/           Page routes (academics, restaurants, hostels, travel, services, emergency, grievance, tools, favorites)
  components/    UI components (site-header, favorite-button, shadcn/ui primitives)
  data/          JSON files with all the directory content
  lib/           Utilities (search indexing, vCard generation, slugify)
  hooks/         React hooks (favorites)
```

All directory content lives in `src/data/*.json`. To update a phone number, restaurant, or warden, edit the relevant JSON file.

## Tech

Next.js 15 (App Router, static export), React 19, TypeScript, Tailwind CSS 4, Radix UI, Fuse.js for search.

## Contributing

Edit the JSON data files to fix outdated info or add new entries. For code changes, open a PR.

## License

MIT
