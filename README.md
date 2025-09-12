# MIT Manipal Campus Directory

A comprehensive directory web application for MIT Manipal students to quickly find essential campus services including restaurants, hostels, travel options, and emergency contacts.

## 🌟 Features

- **Restaurants**: Browse menus, contact information, timings, and delivery options
- **Hostels**: Find wardens and contact details for each hostel block
- **Travel**: Discover auto, cab, taxi, and buggy services around campus
- **Emergency**: Quick access to clinic, ambulance, and security contacts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: Built-in theme switching capability
- **Contact Integration**: Direct vCard downloads for easy contact saving

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **Build Tool**: Bun (recommended)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/alac.git
cd alac
```

2. Install dependencies:
```bash
# Using bun (recommended)
bun install

# Or using npm
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

3. Run the development server:
```bash
# Using bun
bun dev

# Or using npm
npm run dev

# Or using yarn
yarn dev

# Or using pnpm
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── restaurants/       # Restaurants directory page
│   ├── hostels/           # Hostels directory page
│   ├── travel/            # Travel services page
│   ├── emergency/         # Emergency contacts page
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── site-header.tsx   # Navigation header
├── data/                  # JSON data files for services
├── lib/                   # Utility functions
│   └── vcard.ts          # vCard generation utilities
└── styles/               # Global styles
```

## 🏗️ Building for Production

```bash
# Using bun
bun run build

# Or using npm
npm run build
```

## 📱 Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [Radix UI](https://www.radix-ui.com)
- Icons from [Lucide](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)
