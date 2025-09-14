"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { slugify } from "@/lib/utils";

export default function AcademicsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 grid gap-8">
      <div>
        <h1 className="text-3xl">Academics</h1>
        <p className="text-muted-foreground">Quick links to academic systems and resources.</p>
      </div>

      <div className="space-y-2" id={slugify("Student Lifecycle Management")}>
        <h2 className="text-xl">Student Lifecycle Management</h2>
        <div className="[column-fill:_balance]_columns-1 sm:columns-2 gap-4">
          <a href="https://maheslcmtech.manipal.edu" target="_blank" rel="noreferrer">
            <Card className="glass hover:shadow-lg transition-colors mb-4 break-inside-avoid scroll-mt-24" id={slugify("SLCM 2.0")}>
              <CardHeader>
                <CardTitle>SLCM 2.0</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                New SLCM portal
                <br />
                <span className="text-xs text-gray-500">https://maheslcmtech.manipal.edu</span>
              </CardContent>
            </Card>
          </a>
          <a href="https://slcm.manipal.edu" target="_blank" rel="noreferrer">
            <Card className="glass hover:shadow-lg transition-colors mb-4 break-inside-avoid scroll-mt-24" id={slugify("SLCM (Classic)")}>
              <CardHeader>
                <CardTitle>SLCM (Classic)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Legacy SLCM portal
                <br />
                <span className="text-xs text-gray-500">https://slcm.manipal.edu</span>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>

      <div className="space-y-2" id={slugify("Library")}>
        <h2 className="text-xl">Library</h2>
        <div className="[column-fill:_balance]_columns-1 sm:columns-2 gap-4">
          <a href="https://library-orpin-two.vercel.app" target="_blank" rel="noreferrer">
            <Card className="glass hover:shadow-lg transition-colors mb-4 break-inside-avoid scroll-mt-24" id={slugify("Previous Years' Questions Archive")}>
              <CardHeader>
                <CardTitle>Previous Years&apos; Questions Archive</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Browse past question papers
                <br />
                <span className="text-xs text-gray-500">https://library-orpin-two.vercel.app</span>
              </CardContent>
            </Card>
          </a>
          <a href="https://research.ebsco.com/c/fqdtcf/search" target="_blank" rel="noreferrer">
            <Card className="glass hover:shadow-lg transition-colors mb-4 break-inside-avoid scroll-mt-24" id={slugify("EBSCO search")}>
              <CardHeader>
                <CardTitle>EBSCO search</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Search academic databases
                <br />
                <span className="text-xs">User ID: <span className="font-mono">ebscopreviewmity</span></span>
                <br />
                <span className="text-xs">Password: <span className="font-mono">UIPreview2021!</span></span>
                <br />
                <span className="text-xs text-gray-500">https://research.ebsco.com/c/fqdtcf/search</span>
              </CardContent>
            </Card>
          </a>
          <a href="https://libportal.manipal.edu/MIT/MIT.aspx" target="_blank" rel="noreferrer">
            <Card className="glass hover:shadow-lg transition-colors mb-4 break-inside-avoid scroll-mt-24" id={slugify("Library Portal")}>
              <CardHeader>
                <CardTitle>Library Portal</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                MIT Library portal
                <br />
                <span className="text-xs text-gray-500">https://libportal.manipal.edu/MIT/MIT.aspx</span>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>

      <div className="space-y-2" id={slugify("Academic Resources")}>
        <h2 className="text-xl">Academic Resources</h2>
        <div className="[column-fill:_balance]_columns-1 sm:columns-2 gap-4">
          <a href="https://lighthouse.manipal.edu" target="_blank" rel="noreferrer">
            <Card className="glass hover:shadow-lg transition-colors mb-4 break-inside-avoid scroll-mt-24" id={slugify("Lighthouse")}>
              <CardHeader>
                <CardTitle>Lighthouse</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Semester-wise resources and quiz platform
                <br />
                <span className="text-xs text-gray-500">https://lighthouse.manipal.edu</span>
              </CardContent>
            </Card>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.d2l.brightspace.student.android" target="_blank" rel="noreferrer">
            <Card className="glass hover:shadow-lg transition-colors mb-4 break-inside-avoid scroll-mt-24" id={slugify("Pulse (Android)")}>
              <CardHeader>
                <CardTitle>Pulse (Android)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Brightspace Pulse app for Lighthouse
                <br />
                <span className="text-xs text-gray-500">https://play.google.com/store/apps/details?id=com.d2l.brightspace.student.android</span>
              </CardContent>
            </Card>
          </a>
          <a href="https://apps.apple.com/us/app/brightspace-pulse/id1001688546" target="_blank" rel="noreferrer">
            <Card className="glass hover:shadow-lg transition-colors mb-4 break-inside-avoid scroll-mt-24" id={slugify("Pulse (iOS)")}>
              <CardHeader>
                <CardTitle>Pulse (iOS)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Brightspace Pulse app for Lighthouse
                <br />
                <span className="text-xs text-gray-500">https://apps.apple.com/us/app/brightspace-pulse/id1001688546</span>
              </CardContent>
            </Card>
          </a>
          <a href="https://impartus.manipal.edu" target="_blank" rel="noreferrer">
            <Card className="glass hover:shadow-lg transition-colors mb-4 break-inside-avoid scroll-mt-24" id={slugify("Impartus")}>
              <CardHeader>
                <CardTitle>Impartus</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Class recordings platform
                <br />
                <span className="text-xs text-gray-500">https://impartus.manipal.edu</span>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>

      <div className="space-y-2" id={slugify("Research")}>
        <h2 className="text-xl">Research</h2>
        <div className="[column-fill:_balance]_columns-1 sm:columns-2 gap-4">
          <a href="https://researcher.manipal.edu" target="_blank" rel="noreferrer">
            <Card className="glass hover:shadow-lg transition-colors mb-4 break-inside-avoid scroll-mt-24" id={slugify("Manipal PURE")}>
              <CardHeader>
                <CardTitle>Manipal PURE</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Researchers directory
                <br />
                <span className="text-xs text-gray-500">https://researcher.manipal.edu</span>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>

      <div className="space-y-2" id={slugify("Microsoft 365")}>
        <h2 className="text-xl">Microsoft 365</h2>
        <div className="[column-fill:_balance]_columns-1 sm:columns-2 gap-4">
          <a href="https://outlook.office365.com/mail/" target="_blank" rel="noreferrer">
            <Card className="glass hover:shadow-lg transition-colors mb-4 break-inside-avoid scroll-mt-24" id={slugify("Outlook")}>
              <CardHeader>
                <CardTitle>Outlook</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Web mail
                <br />
                <span className="text-xs text-gray-500">https://outlook.office365.com/mail/</span>
              </CardContent>
            </Card>
          </a>
          <a href="https://m365.cloud.microsoft/apps/" target="_blank" rel="noreferrer">
            <Card className="glass hover:shadow-lg transition-colors mb-4 break-inside-avoid scroll-mt-24" id={slugify("Office 365")}>
              <CardHeader>
                <CardTitle>Office 365</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Microsoft 365 apps
                <br />
                <span className="text-xs text-gray-500">https://m365.cloud.microsoft/apps/</span>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </main>
  );
}


