'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  JobTrackerPreferences,
  DEFAULT_PREFERENCES,
  savePreferences,
  loadPreferences,
} from "@/lib/scoring";

const Settings = () => {
  const [preferences, setPreferences] = useState<JobTrackerPreferences>(
    DEFAULT_PREFERENCES
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loaded = loadPreferences();
    setPreferences(loaded);
  }, []);

  const handleSave = () => {
    savePreferences(preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updatePreferences = <K extends keyof JobTrackerPreferences>(
    key: K,
    value: JobTrackerPreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleRoleKeywordsChange = (value: string) => {
    const keywords = value
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k);
    updatePreferences("roleKeywords", keywords);
  };

  const handleSkillsChange = (value: string) => {
    const skills = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    updatePreferences("skills", skills);
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    let updated = preferences.preferredLocations;
    if (checked) {
      updated = [...updated, location];
    } else {
      updated = updated.filter((l) => l !== location);
    }
    updatePreferences("preferredLocations", updated);
  };

  const handleModeChange = (mode: string, checked: boolean) => {
    let updated = preferences.preferredMode;
    if (checked) {
      updated = [...updated, mode];
    } else {
      updated = updated.filter((m) => m !== mode);
    }
    updatePreferences("preferredMode", updated);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-space-3 py-space-4">
      <h2 className="mb-space-1">Job Match Preferences</h2>
      <p className="mb-space-4 text-sm text-muted-foreground">
        Configure your preferences to get intelligent job matching across the dashboard.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job Criteria</CardTitle>
          <CardDescription>
            These preferences power the match scoring system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-space-4">
          {/* Role Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords">Role Keywords</Label>
            <Input
              id="keywords"
              placeholder="e.g. Frontend Engineer, Backend Developer"
              value={preferences.roleKeywords.join(", ")}
              onChange={(e) => handleRoleKeywordsChange(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated keywords to match against job titles and descriptions.
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label htmlFor="skills">Technical Skills</Label>
            <Input
              id="skills"
              placeholder="e.g. React, TypeScript, Node.js"
              value={preferences.skills.join(", ")}
              onChange={(e) => handleSkillsChange(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated skills to match against job requirements.
            </p>
          </div>

          {/* Preferred Locations */}
          <div className="space-y-2">
            <Label>Preferred Locations</Label>
            <div className="space-y-2 rounded-md border p-3">
              {["Bangalore", "Chennai", "Hyderabad", "Mysuru"].map((location) => (
                <div key={location} className="flex items-center gap-2">
                  <Checkbox
                    id={location}
                    checked={preferences.preferredLocations.includes(location)}
                    onCheckedChange={(checked) =>
                      handleLocationChange(location, !!checked)
                    }
                  />
                  <Label htmlFor={location} className="font-normal cursor-pointer">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Work Mode */}
          <div className="space-y-2">
            <Label>Preferred Work Mode</Label>
            <div className="space-y-2 rounded-md border p-3">
              {["Remote", "Hybrid", "Onsite"].map((mode) => (
                <div key={mode} className="flex items-center gap-2">
                  <Checkbox
                    id={mode}
                    checked={preferences.preferredMode.includes(mode)}
                    onCheckedChange={(checked) =>
                      handleModeChange(mode, !!checked)
                    }
                  />
                  <Label htmlFor={mode} className="font-normal cursor-pointer">
                    {mode}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select
              value={preferences.experienceLevel}
              onValueChange={(value) =>
                updatePreferences("experienceLevel", value)
              }
            >
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Level</SelectItem>
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="0-1">0–1 years</SelectItem>
                <SelectItem value="1-3">1–3 years</SelectItem>
                <SelectItem value="3-5">3–5 years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Min Match Score Slider */}
          <div className="space-y-3">
            <Label htmlFor="threshold">
              Minimum Match Score Threshold: <span className="text-primary font-semibold">{preferences.minMatchScore}</span>
            </Label>
            <Slider
              id="threshold"
              min={0}
              max={100}
              step={5}
              value={[preferences.minMatchScore]}
              onValueChange={(value) =>
                updatePreferences("minMatchScore", value[0])
              }
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Only jobs with a score above this threshold are shown in "Show only matches" mode.
            </p>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="mt-space-3 w-full"
          >
            {saved ? "✓ Preferences Saved" : "Save Preferences"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
