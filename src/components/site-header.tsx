"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, Utensils, Building2, Bus, ShieldAlert, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMounted(true), []);

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
            </NavigationMenuList>
          </NavigationMenu>

          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {mounted && theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
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
                    <ShieldAlert className="size-4 text-red-500" />
                    <span className="text-base">Emergency</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/services" className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-muted focus:bg-muted transition-colors">
                    <Wrench className="size-4 text-muted-foreground" />
                    <span className="text-base">Services</span>
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


