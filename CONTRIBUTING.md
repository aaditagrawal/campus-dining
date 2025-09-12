# Contributing to MIT Manipal Campus Directory

Thank you for your interest in contributing to the MIT Manipal Campus Directory! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Contributing Process](#contributing-process)
- [Types of Contributions](#types-of-contributions)
- [Reporting Issues](#reporting-issues)

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/alac.git
   cd alac
   ```
3. **Set up the development environment** (see Development Setup below)
4. **Create a new branch** for your contribution:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Setup

### Prerequisites

- **Node.js 18+** or **Bun**
- **Git** for version control

### Installation Steps

1. **Install dependencies**:
   ```bash
   # Using bun (recommended)
   bun install

   # Or using npm
   npm install
   ```

2. **Start the development server**:
   ```bash
   # Using bun
   bun dev

   # Or using npm
   npm run dev
   ```

3. **Open your browser** to [http://localhost:3000](http://localhost:3000)

### Development Scripts

- `npm run dev` / `bun dev` - Start development server with hot reload
- `npm run build` / `bun run build` - Build for production
- `npm run start` / `bun run start` - Start production server
- `npm run lint` / `bun run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── restaurants/       # Restaurant listings page
│   ├── hostels/           # Hostel information page
│   ├── travel/            # Travel services page
│   ├── emergency/         # Emergency contacts page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── ui/               # Shadcn/ui component library
│   ├── site-header.tsx   # Navigation header
│   └── theme-provider.tsx # Theme provider
├── data/                  # Static JSON data files
│   ├── restaurants.json   # Restaurant data
│   ├── hostels.json       # Hostel data
│   ├── travel.json        # Travel service data
│   └── emergency.json     # Emergency contact data
└── lib/                   # Utility functions and libraries
    ├── utils.ts          # General utilities
    └── vcard.ts          # vCard generation utilities
```

## 💻 Coding Standards

### TypeScript/React Guidelines

- **Use TypeScript** for all new code
- **Functional components** with hooks preferred over class components
- **Custom hooks** for reusable logic
- **Descriptive component names** using PascalCase
- **Props interfaces** for component props

### Code Style

- **ESLint** configuration is enforced - run `npm run lint` before committing
- **Consistent naming conventions**:
  - Variables: camelCase
  - Components: PascalCase
  - Files: kebab-case.tsx
- **Meaningful commit messages** following conventional commits

### Example Component Structure

```tsx
interface RestaurantCardProps {
  name: string;
  cuisine: string;
  rating: number;
  isOpen: boolean;
}

export function RestaurantCard({ name, cuisine, rating, isOpen }: RestaurantCardProps) {
  return (
    <div className="restaurant-card">
      <h3>{name}</h3>
      <p>{cuisine}</p>
      <span>{rating} ⭐</span>
      <span className={isOpen ? 'open' : 'closed'}>
        {isOpen ? 'Open' : 'Closed'}
      </span>
    </div>
  );
}
```

## 🔄 Contributing Process

### 1. Choose an Issue

- Check [open issues](https://github.com/yourusername/alac/issues) on GitHub
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to indicate you're working on it

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

### 3. Make Changes

- Write clear, focused commits
- Test your changes thoroughly
- Ensure code follows project standards
- Update documentation if needed

### 4. Test Your Changes

- Run the development server: `npm run dev`
- Test functionality in the browser
- Check for console errors
- Verify responsive design on different screen sizes

### 5. Submit a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub:
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - Describe the changes and why they're needed

3. **Wait for review** and address any feedback

### Pull Request Guidelines

- **Keep PRs focused** - one feature or fix per PR
- **Write descriptive PR titles** (e.g., "Add dark mode toggle to header")
- **Include screenshots** for visual changes
- **Update documentation** if needed
- **Add tests** for new functionality

## 🎯 Types of Contributions

### Code Contributions

- **Bug fixes** - Fix existing issues
- **Features** - Add new functionality
- **UI/UX improvements** - Enhance user interface and experience
- **Performance optimizations** - Improve loading times and efficiency
- **Accessibility improvements** - Make the app more accessible

### Non-Code Contributions

- **Documentation** - Improve README, add code comments
- **Data updates** - Update restaurant, hostel, or service information
- **Translations** - Add support for additional languages
- **Design feedback** - Suggest UI/UX improvements

### Data Updates

The app uses JSON files for data storage. To update information:

1. Locate the relevant JSON file in `src/data/`
2. Make your changes following the existing data structure
3. Test the changes in the app
4. Submit a PR with your updates

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs. actual behavior
- **Browser and OS** information
- **Screenshots** if applicable
- **Console errors** or logs

### Feature Requests

For new features, please provide:

- **Clear description** of the proposed feature
- **Use case** - why would this be useful?
- **Mockups or examples** if applicable
- **Implementation ideas** if you have them

## 📞 Getting Help

- **GitHub Issues**: For bugs, features, and general questions
- **Pull Request Comments**: For discussion on specific changes
- **Documentation**: Check the README.md for setup and usage instructions

## 📜 Code of Conduct

Please be respectful and inclusive when contributing to this project. We follow a code of conduct to ensure a positive experience for all contributors.

---

Thank you for contributing to the MIT Manipal Campus Directory! 🎓
