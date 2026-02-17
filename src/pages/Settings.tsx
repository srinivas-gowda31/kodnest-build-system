import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Settings = () => (
  <div className="mx-auto w-full max-w-2xl px-space-3 py-space-4">
    <h2 className="mb-space-1">Preferences</h2>
    <p className="mb-space-4 text-sm text-muted-foreground">
      Define what you're looking for. Matching logic will be added in the next step.
    </p>

    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Job Criteria</CardTitle>
        <CardDescription>These fields are placeholders — no logic yet.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-space-3">
        <div className="space-y-1">
          <Label htmlFor="keywords">Role Keywords</Label>
          <Input id="keywords" placeholder="e.g. Frontend Engineer, Product Designer" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="locations">Preferred Locations</Label>
          <Input id="locations" placeholder="e.g. Bangalore, Mumbai, Remote" />
        </div>

        <div className="space-y-1">
          <Label>Mode</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select work mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="onsite">Onsite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Experience Level</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="lead">Lead / Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="mt-space-2 w-full" disabled>
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default Settings;
