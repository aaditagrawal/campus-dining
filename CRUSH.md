# Alac - MIT Manipal Campus Directory

## Commands

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

## Code Style

### General
- Use TypeScript with strict mode enabled
- Follow Next.js 15 App Router patterns
- Use `@/*` path alias for internal imports
- No explicit test framework configured

### React/TypeScript
- Functional components with TypeScript
- Use `Readonly<>` for props typing in layout components
- Client components marked with `"use client";` directive
- Prefer React hooks (useEffect, useState, useMemo) over class patterns

### Styling & UI
- Tailwind CSS for styling
- Radix UI primitives for accessibility
- Use `cn()` utility from `@/lib/utils` for class merging
- CVA (class-variance-authority) for component variants
- Shadcn/ui component patterns

### Error Handling
- Try-catch blocks around async operations
- Console error logging with meaningful context
- Graceful fallbacks for failed operations

### Naming Conventions
- PascalCase for components and interfaces
- camelCase for variables and functions
- Descriptive names with clear intent
- File names match component names (kebab-case for folders)

### Imports
- Group external libraries first, then internal imports
- Use absolute imports with `@/` prefix
- Import type-only imports with `type` keyword where applicable