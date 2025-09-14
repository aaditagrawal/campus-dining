# MIT Manipal Campus Directory

A comprehensive, modern web application designed specifically for MIT Manipal students to quickly access essential campus services, academic resources, and emergency contacts. Built with Next.js 15 and featuring a beautiful glassmorphism design with dark/light mode support.

## 🌟 Features

### 📚 **Academics**
- **Student Lifecycle Management**: Quick access to both new SLCM 2.0 and legacy SLCM portals
- **Library Resources**: Previous years' question papers, EBSCO database access, and library portal
- **Academic Platforms**: Lighthouse (semester resources), Impartus (class recordings), and Brightspace Pulse apps
- **Research Tools**: Manipal PURE researchers directory
- **Microsoft 365**: Direct links to Outlook and Office 365 apps

### 🍽️ **Restaurants**
- **Real-time Status**: Live open/closed indicators with current operating hours
- **Complete Information**: Contact numbers, delivery fees, packaging costs, and addresses
- **Smart Hours Display**: Shows current operating window or next available hours
- **Quick Actions**: One-click phone copying and vCard downloads
- **Comprehensive Coverage**: 12+ restaurants including Taco House, Hungry House, Hit&Run, and more

### 🏠 **Hostels**
- **Block-wise Organization**: Complete directory of all hostel blocks (4, 7, 8, 9, 10, 14, 15, 17, 18, 19, 20, 21, 22)
- **Warden Details**: Names, designations, office phones, mobile numbers, and email addresses
- **Reception Contacts**: Main hostel phone numbers and email addresses
- **Individual Contacts**: Download individual warden contacts as vCards

### 🚗 **Travel Services**
- **Auto Rickshaws**: Gate 2 & 4 auto stands plus individual auto drivers
- **Cab Services**: Manipal Khaas, Manipal Cabs, and Sashikant Taxi
- **Contact Management**: Direct calling and vCard downloads for all transport services

### 🚑 **Emergency Services**
- **Campus Emergency**: MIT Student Clinic, Campus Patrol, and KMC Ambulance
- **Local Helplines**: Student Health Clinic, KMC Emergency, Fire, MAHE Control Room
- **National Helplines**: Police (100), Fire (101), Ambulance (102), Women's Helpline (181)
- **Mental Health**: Suicide prevention helplines (Aasra, Spandana)
- **Quick Access**: Emergency badge indicators and one-click calling

### 🔧 **General Services**
- **Laundry Services**: Dhobimate with multiple contact numbers
- **Printing & Xerox**: Om Xerox, Print Shop, Pratham Xerox, FC2 Xerox
- **Web Resources**: Interactive campus map and weekly mess menu
- **Service Locations**: Detailed location information for each service

### 🎨 **User Experience**
- **Global Search**: Fuzzy search across all services with ⌘K shortcut
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: System preference detection with manual toggle
- **Glassmorphism UI**: Modern glass-effect cards with backdrop blur
- **Smooth Animations**: Hover effects and smooth scrolling
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🚀 Tech Stack

### **Core Framework**
- **Next.js 15.5.3** with App Router for modern React development
- **React 19.1.0** with latest features and optimizations
- **TypeScript 5** for type safety and better developer experience

### **Styling & UI**
- **Tailwind CSS 4** with custom design system
- **Radix UI** primitives for accessible components
- **Lucide React 0.544.0** for consistent iconography
- **next-themes 0.4.6** for theme management
- **tw-animate-css** for smooth animations

### **Search & Data**
- **Fuse.js 7.1.0** for fuzzy search functionality
- **JSON data files** for easy content management
- **vCard generation** for contact downloads

### **Fonts & Typography**
- **Geist Sans** for body text
- **Geist Mono** for code elements
- **Instrument Serif** for headings

### **Development Tools**
- **ESLint** with Next.js configuration
- **Bun** (recommended) or npm/yarn/pnpm for package management
- **PostCSS** for CSS processing

## 🛠️ Getting Started

### Prerequisites

- **Node.js 18+** or **Bun** runtime
- **Git** for version control
- **Package manager**: npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/aaditagrawal/campus-dining.git
cd campus-dining
```

2. **Install dependencies:**
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

3. **Start the development server:**
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

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── academics/               # Academic resources page
│   │   └── page.tsx            # SLCM, Library, Lighthouse, etc.
│   ├── emergency/               # Emergency contacts page
│   │   └── page.tsx            # Campus & national emergency numbers
│   ├── hostels/                 # Hostels directory page
│   │   └── page.tsx            # Block-wise warden information
│   ├── restaurants/             # Restaurants directory page
│   │   └── page.tsx            # Food outlets with hours & delivery info
│   ├── services/                # General services page
│   │   └── page.tsx            # Laundry, Xerox, web resources
│   ├── travel/                  # Travel services page
│   │   └── page.tsx            # Autos, cabs, and transport
│   ├── globals.css              # Global styles and design system
│   ├── layout.tsx               # Root layout with theme provider
│   └── page.tsx                 # Home page with navigation cards
├── components/                   # Reusable UI components
│   ├── ui/                      # Radix UI component library
│   │   ├── badge.tsx           # Status badges
│   │   ├── button.tsx          # Interactive buttons
│   │   ├── card.tsx            # Content cards
│   │   ├── input.tsx           # Form inputs
│   │   ├── label.tsx           # Form labels
│   │   ├── navigation-menu.tsx # Navigation components
│   │   ├── sheet.tsx           # Mobile navigation drawer
│   │   └── switch.tsx          # Toggle switches
│   ├── site-header.tsx          # Main navigation with search
│   └── theme-provider.tsx       # Dark/light mode provider
├── data/                        # JSON data files
│   ├── academics.json           # Academic resources and portals
│   ├── emergency.json           # Emergency contact information
│   ├── hostels.json             # Hostel blocks and warden details
│   ├── restaurants.json         # Restaurant information and hours
│   ├── services.json            # General services (laundry, xerox)
│   └── travel.json              # Transportation services
└── lib/                         # Utility functions and helpers
    ├── search.ts                # Search functionality and data types
    ├── utils.ts                 # General utilities (slugify, cn)
    └── vcard.ts                 # vCard generation and download
```

## 🏗️ Building for Production

### Build the application:
```bash
# Using bun
bun run build

# Or using npm
npm run build
```

### Start production server:
```bash
# Using bun
bun start

# Or using npm
npm start
```

## 📱 Available Scripts

- **`dev`** - Start development server with hot reload
- **`build`** - Build optimized production bundle
- **`start`** - Start production server
- **`lint`** - Run ESLint for code quality checks

## 🔍 Search Functionality

The application features a powerful global search system:

- **Fuzzy Search**: Uses Fuse.js for intelligent search across all content
- **Keyboard Shortcut**: Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux)
- **Real-time Results**: Instant search results as you type
- **Smart Navigation**: Direct links to specific sections and items
- **Fallback Suggestions**: Shows random items when no query is entered

### Search Categories:
- **Pages**: Main navigation sections
- **Restaurants**: All food outlets and their details
- **Hostels**: Block information and warden contacts
- **Travel**: Auto and cab services
- **Emergency**: All emergency contacts
- **Services**: Laundry, printing, and web resources
- **Academics**: Academic portals and resources

## 🎨 Design System

### **Color Palette**
- **Primary**: Dark gray (`oklch(0.205 0 0)`)
- **Secondary**: Light gray (`oklch(0.97 0 0)`)
- **Accent Colors**: Category-specific colors for different sections
- **Emergency**: Red accents for emergency services
- **Background**: Subtle gradient with animated color shifts

### **Typography**
- **Headings**: Instrument Serif for elegant display text
- **Body**: Geist Sans for optimal readability
- **Code**: Geist Mono for technical content

### **Components**
- **Glass Cards**: Semi-transparent cards with backdrop blur
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Status Indicators**: Color-coded badges for different states

## 📊 Data Management

### **Data Structure**
All content is stored in JSON files for easy management and updates:

- **Type Safety**: Full TypeScript interfaces for all data structures
- **Validation**: Consistent data format across all categories
- **Extensibility**: Easy to add new fields or categories
- **Version Control**: All changes tracked in Git

### **Content Updates**
- **Restaurant Hours**: Real-time status calculation
- **Contact Information**: Direct phone and email links
- **Location Data**: Addresses and service locations
- **Service Details**: Fees, notes, and additional information

## 🔧 Development Guidelines

### **Code Standards**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Next.js recommended configuration
- **Component Structure**: Functional components with hooks
- **File Naming**: kebab-case for files, PascalCase for components

### **Performance Optimizations**
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Bundle Analysis**: Built-in bundle analyzer
- **Caching**: Optimized caching strategies

## 🤝 Contributing

We welcome contributions from the MIT Manipal community! Please see our [Contributing Guide](CONTRIBUTING.md) for detailed information on:

- **Data Contributions**: Updating restaurant hours, contact information, and service details
- **Code Contributions**: Bug fixes, feature additions, and improvements
- **Content Updates**: Adding new services, updating information, and maintaining accuracy

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Built with**: [Next.js](https://nextjs.org) and [React](https://react.dev)
- **UI Components**: [Radix UI](https://www.radix-ui.com) for accessibility
- **Icons**: [Lucide](https://lucide.dev) for consistent iconography
- **Styling**: [Tailwind CSS](https://tailwindcss.com) for utility-first design
- **Search**: [Fuse.js](https://fusejs.io) for fuzzy search capabilities
- **Fonts**: [Geist](https://vercel.com/font) and [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif)

## 📞 Support

For questions, suggestions, or to report issues:
- **GitHub Issues**: [Create an issue](https://github.com/aaditagrawal/campus-dining/issues)
- **Pull Requests**: [Submit a PR](https://github.com/aaditagrawal/campus-dining/pulls)
- **Community**: MIT Manipal student community

---

**Made with ❤️ for the MIT Manipal community**
