import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import SecondaryPanel from "@/components/layout/SecondaryPanel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [proofItems, setProofItems] = useState([
    { label: "UI Built", completed: false },
    { label: "Logic Working", completed: false },
    { label: "Test Passed", completed: false },
    { label: "Deployed", completed: false },
  ]);

  const handleProofToggle = (index: number) => {
    setProofItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const primaryContent = (
    <div className="flex flex-col gap-space-3">
      {/* Typography Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale</CardTitle>
          <CardDescription>
            Playfair Display for headings, DM Sans for body text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-space-3">
          <h1>Heading One — Confident & Clear</h1>
          <h2>Heading Two — Structured Hierarchy</h2>
          <h3>Heading Three — Section Level</h3>
          <p className="text-base text-foreground">
            Body text set at 16px with generous line-height for comfortable
            reading. Maximum width constrained to 720px to maintain optimal
            line length across all viewport sizes.
          </p>
          <p className="text-sm text-muted-foreground">
            Secondary text uses muted foreground for visual hierarchy without
            competing with primary content.
          </p>
        </CardContent>
      </Card>

      {/* Button Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Button System</CardTitle>
          <CardDescription>
            Primary actions use solid deep red. Secondary actions use outlined styling.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-space-2">
          <div className="flex flex-wrap gap-space-2">
            <Button variant="default">Primary Action</Button>
            <Button variant="outline">Secondary Action</Button>
            <Button variant="ghost">Ghost Action</Button>
          </div>
          <div className="flex flex-wrap gap-space-2">
            <Button variant="default" size="lg">Large Primary</Button>
            <Button variant="outline" size="sm">Small Secondary</Button>
            <Button variant="default" disabled>Disabled</Button>
          </div>
        </CardContent>
      </Card>

      {/* Input Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Form Inputs</CardTitle>
          <CardDescription>
            Clean borders, clear focus states, no heavy shadows.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-space-2">
          <div className="max-w-md space-y-space-2">
            <div className="space-y-1">
              <Label htmlFor="project-name">Project Name</Label>
              <Input id="project-name" placeholder="Enter project name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Brief project description" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spacing & Color Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>
            Maximum 4 colors across the entire system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-space-2">
            <div className="flex flex-col items-center gap-1">
              <div className="h-16 w-16 rounded-md bg-background border border-border" />
              <span className="text-xs text-muted-foreground">Background</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-16 w-16 rounded-md bg-foreground" />
              <span className="text-xs text-muted-foreground">Foreground</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-16 w-16 rounded-md bg-primary" />
              <span className="text-xs text-muted-foreground">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-16 w-16 rounded-md bg-muted" />
              <span className="text-xs text-muted-foreground">Muted</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-16 w-16 rounded-md bg-success" />
              <span className="text-xs text-muted-foreground">Success</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-16 w-16 rounded-md bg-warning" />
              <span className="text-xs text-muted-foreground">Warning</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spacing Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Spacing Scale</CardTitle>
          <CardDescription>
            Consistent 8px base: 8, 16, 24, 40, 64.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-space-2">
            {[
              { name: "space-1", value: "8px" },
              { name: "space-2", value: "16px" },
              { name: "space-3", value: "24px" },
              { name: "space-4", value: "40px" },
              { name: "space-5", value: "64px" },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-space-2">
                <span className="w-20 text-xs text-muted-foreground">{s.value}</span>
                <div
                  className="h-3 rounded-sm bg-primary/20"
                  style={{ width: s.value }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const secondaryContent = (
    <SecondaryPanel
      stepTitle="Step 1: Design System"
      stepDescription="Establish the visual foundation. All tokens, typography, colors, and spacing are defined centrally. No component should contain ad-hoc styling."
      prompt={`Create a design system with:
- Off-white background (#F7F6F3)
- Deep red accent (#8B0000)
- Playfair Display headings
- DM Sans body text
- 8px spacing scale`}
    />
  );

  return (
    <PageLayout
      projectName="KodNest Premium Build System"
      currentStep={1}
      totalSteps={6}
      status="in-progress"
      headline="Design System Foundation"
      subtext="Every decision here propagates across the entire product. Get it right once."
      proofItems={proofItems}
      onProofToggle={handleProofToggle}
      primaryContent={primaryContent}
      secondaryContent={secondaryContent}
    />
  );
};

export default Index;
