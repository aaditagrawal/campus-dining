"use client";

import data from "@/data/tools.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { slugify } from "@/lib/utils";

type Tool = { name: string; url: string; description: string };
type ToolsData = { web_resources: Tool[]; internal_tools?: Tool[] };

export default function ToolsPage() {
  const tools = data as ToolsData;
  
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 grid gap-8">
      <div>
        <h1 className="text-3xl">Tools</h1>
        <p className="text-muted-foreground">Useful web resources and tools for MIT Manipal students.</p>
      </div>
      
      <div className="space-y-2" id={slugify("Web Resources")}>
        <h2 className="text-xl">Web Resources</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {tools.web_resources.map((tool) => (
            <a 
              key={tool.name}
              href={tool.url} 
              target="_blank" 
              rel="noreferrer"
            >
              <Card className="glass hover:shadow-lg transition-colors">
                <CardHeader>
                  <CardTitle>{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {tool.description}
                  <br />
                  <span className="text-xs text-gray-500">{tool.url}</span>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {tools.internal_tools && tools.internal_tools.length > 0 && (
        <div className="space-y-2" id={slugify("Internal Tools")}>
          <h2 className="text-xl">Internal Tools</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tools.internal_tools.map((tool) => (
              <a 
                key={tool.name}
                href={tool.url} 
                className="block"
              >
                <Card className="glass hover:shadow-lg transition-colors">
                  <CardHeader>
                    <CardTitle>{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {tool.description}
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}