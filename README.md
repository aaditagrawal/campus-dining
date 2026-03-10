# MIT Manipal Directory

Campus directory for MIT Manipal students. Look up restaurants, hostels, travel, services, academics, grievance contacts, and emergency numbers.

Live at: https://alac.vercel.app (or wherever this is deployed)

## What's in it

- **Restaurants** with phone numbers, delivery fees, and live open/closed status based on operating hours
- **Hostels** with block-wise warden contacts (name, phone, email) and reception numbers
- **Travel** with auto and cab contacts, plus airport pricing tables
- **Services** like laundry and xerox shops
- **Academics** with links to SLCM, library resources, Lighthouse, Impartus, and other portals
- **Grievance Redressal** with contacts for CWO, SWO, Student Affairs, Academics, and Student Council
- **Emergency** contacts for campus security, KMC, police, fire, ambulance, and mental health helplines
- **Global search** (Cmd+K / Ctrl+K) across all contacts and pages
- **Favorites** saved to localStorage
- **vCard downloads** for any contact
- Dark/light mode

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
