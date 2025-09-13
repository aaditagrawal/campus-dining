import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Siren, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 grid gap-6">
      <section className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl">MIT Manipal Campus Directory</h1>
        <p className="text-muted-foreground">Quickly find restaurants, hostels, travel options, services and emergency info.</p>
      </section>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link href="/academics">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academics
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Academic systems, resources and portals</CardContent>
          </Card>
        </Link>
        <Link href="/restaurants">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Restaurants</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Menus, timings, delivery and contacts</CardContent>
          </Card>
        </Link>
        <Link href="/hostels">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Hostels</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Wardens and contacts per block</CardContent>
          </Card>
        </Link>
        <Link href="/travel">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Travel</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Autos, cabs, taxis, buggies</CardContent>
          </Card>
        </Link>
        <Link href="/services">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Laundry, Xerox, and other misc</CardContent>
          </Card>
        </Link>
        <Link href="/emergency">
          <Card className="glass hover:shadow-lg transition-transform duration-200 will-change-transform hover:-translate-y-0.5 border-red-400/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-500">
                <Siren className="h-5 w-5 text-red-500" />
                Emergency
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-red-500">Clinic, ambulance, security</CardContent>
          </Card>
        </Link>
      </section>
    </main>
  );
}
