"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, Utensils, Building2, Bus, ShieldAlert, Wrench, GraduationCap, Search, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { getAllSearchItems, type SearchItem } from "@/lib/search";

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setMounted(true), []);

  const isMac = useMemo(() => navigator.platform.toUpperCase().includes("MAC"), []);

  const items = useMemo(() => getAllSearchItems(), []);
  const fuse = useMemo(() => new Fuse(items, {
    keys: [
      { name: "title", weight: 0.6 },
      { name: "subtitle", weight: 0.2 },
      { name: "section", weight: 0.2 },
    ],
    includeScore: true,
    threshold: 0.35,
    ignoreLocation: true,
  }), [items]);

  // Allow other components (e.g., home page) to open the global search
  useEffect(() => {
    const handler = () => setSearchOpen(true);
    window.addEventListener("open-global-search", handler as EventListener);
    return () => window.removeEventListener("open-global-search", handler as EventListener);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((isMac && e.metaKey && e.key.toLowerCase() === "k") || (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMac]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [searchOpen]);

  const defaultSuggestions = useMemo(() => {
    const pool = items.filter((i) => i.section !== "Pages");
    // shuffle lightweight
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
  }, [items]);

  useEffect(() => {
    if (!query) {
      setResults(defaultSuggestions);
      return;
    }
    try {
      const searchResults = fuse.search(query);
      const r = searchResults.slice(0, 10).map((result) => {
        // Fuse.js returns results with different structure depending on version
        return result.item || result;
      });
      setResults(r);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
  }, [query, fuse, defaultSuggestions]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">
          MIT Manipal Directory
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/academics" className="px-3 py-2 rounded-md hover:bg-muted">Academics</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/restaurants" className="px-3 py-2 rounded-md hover:bg-muted">Restaurants</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/hostels" className="px-3 py-2 rounded-md hover:bg-muted">Hostels</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/travel" className="px-3 py-2 rounded-md hover:bg-muted">Travel</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/emergency" className="px-3 py-2 rounded-md hover:bg-muted">Emergency</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/services" className="px-3 py-2 rounded-md hover:bg-muted">Services</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/tools" className="px-3 py-2 rounded-md hover:bg-muted">Tools</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button variant="outline" size="sm" aria-label="Open search" onClick={() => setSearchOpen(true)} className="gap-2">
            <Search className="size-4" />
            <span className="hidden md:inline">Search…</span>
            <kbd className="ml-2 hidden lg:inline rounded bg-muted px-1.5 py-0.5 text-xs">{isMac ? "⌘K" : "Ctrl+K"}</kbd>
          </Button>

          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {mounted && theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Open search" onClick={() => setSearchOpen(true)}>
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {mounted && theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu" aria-expanded={menuOpen}>
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-1 p-0">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SheetHeader className="p-4 pb-3 border-b">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Navigate</span>
                  <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {mounted && theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
                  </Button>
                </div>
              </SheetHeader>
              <nav className="px-2 py-2">
                <SheetClose asChild>
                  <Link href="/academics" className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-muted focus:bg-muted transition-colors">
                    <GraduationCap className="size-4 text-muted-foreground" />
                    <span className="text-base">Academics</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/restaurants" className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-muted focus:bg-muted transition-colors">
                    <Utensils className="size-4 text-muted-foreground" />
                    <span className="text-base">Restaurants</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/hostels" className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-muted focus:bg-muted transition-colors">
                    <Building2 className="size-4 text-muted-foreground" />
                    <span className="text-base">Hostels</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/travel" className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-muted focus:bg-muted transition-colors">
                    <Bus className="size-4 text-muted-foreground" />
                    <span className="text-base">Travel</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/emergency" className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-muted focus:bg-muted transition-colors">
                    <ShieldAlert className="size-4 text-rose-500" />
                    <span className="text-base">Emergency</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/services" className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-muted focus:bg-muted transition-colors">
                    <Wrench className="size-4 text-muted-foreground" />
                    <span className="text-base">Services</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/tools" className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-muted focus:bg-muted transition-colors">
                    <Settings className="size-4 text-muted-foreground" />
                    <span className="text-base">Tools</span>
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 bg-black/50" role="dialog" aria-modal="true" style={{ paddingTop: 'calc(3.5rem + 1rem)' }}>
          <div className="w-full max-w-xl rounded-lg border bg-background shadow-lg" style={{ marginTop: 0 }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b">
              <Search className="size-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search restaurants, hostels, emergency, travel, services…"
                className="w-full bg-transparent outline-none py-2 text-sm"
                aria-label="Search"
              />
              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline rounded bg-muted px-1.5 py-0.5 text-xs">Esc</kbd>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                  className="h-6 w-6"
                  aria-label="Close search"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>
            <ul className="max-h-[60vh] overflow-auto divide-y">
              {results.length === 0 && (
                <li className="px-4 py-3 text-sm text-muted-foreground">No results</li>
              )}
              {results.map((r, idx) => (
                <li key={`${r.href}-${idx}`} className="px-4 py-3 hover:bg-muted/60 cursor-pointer" onClick={() => {
                  setSearchOpen(false);
                  // navigate
                  try {
                    if (!r || !r.href) {
                      console.error('Invalid search result:', r);
                      return;
                    }

                    if (r.href.startsWith("http")) {
                      window.location.href = r.href;
                    } else {
                      // Handle internal navigation with proper scroll offset
                      const url = new URL(r.href, window.location.origin);
                      if (url.hash) {
                        // If there's an anchor, we need special handling for internal links
                        const elementId = url.hash.substring(1);
                        if (!elementId) {
                          console.error('Invalid hash in URL:', r.href);
                          return;
                        }

                        const element = document.getElementById(elementId);

                        if (element) {
                          // Element exists on current page - just scroll to it
                          const headerHeight = 56; // h-14 = 3.5rem = 56px
                          const viewportHeight = window.innerHeight;
                          const extraOffset = Math.max(16, viewportHeight * 0.08); // 8% of viewport height or minimum 16px
                          const elementPosition = element.offsetTop - headerHeight - extraOffset;
                          window.scrollTo({
                            top: Math.max(0, elementPosition), // Ensure we don't scroll above the page
                            behavior: 'smooth'
                          });
                          // Update URL without triggering scroll
                          window.history.pushState(null, '', r.href);
                        } else {
                          // Element doesn't exist on current page - navigate and then scroll
                          window.location.assign(r.href);
                        }
                      } else {
                        // No anchor, just navigate normally
                        window.location.assign(r.href);
                      }
                    }
                  } catch (error) {
                    console.error('Navigation error:', error, r);
                    // Fallback to basic navigation
                    if (r && r.href) {
                      window.location.href = r.href;
                    }
                  }
                }}>
                  <div className="text-sm">
                    <span className="font-medium">{r.title}</span>
                    {r.subtitle && <span className="text-muted-foreground"> • {r.subtitle}</span>}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{r.section}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}


