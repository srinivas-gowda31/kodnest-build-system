import { useState, useMemo, useEffect } from "react";
import { jobs, Job } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import FilterBar, { Filters } from "@/components/jobs/FilterBar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import {
  loadPreferences,
  calculateMatchScore,
  JobTrackerPreferences,
} from "@/lib/scoring";

const defaultFilters: Filters = {
  keyword: "",
  location: "all",
  mode: "all",
  experience: "all",
  source: "all",
  sort: "latest",
};

interface JobWithScore {
  job: Job;
  matchScore: number;
}

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [preferences, setPreferences] = useState<JobTrackerPreferences | null>(
    null
  );
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);
  const { toggleSave, isSaved } = useSavedJobs();

  // Load preferences on mount
  useEffect(() => {
    const prefs = loadPreferences();
    setPreferences(prefs);
  }, []);

  // Calculate match scores for all jobs
  const jobsWithScores = useMemo<JobWithScore[]>(() => {
    if (!preferences) return jobs.map((job) => ({ job, matchScore: 0 }));

    return jobs.map((job) => ({
      job,
      matchScore: calculateMatchScore(job, preferences),
    }));
  }, [preferences]);

  const locations = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.location))).sort(),
    []
  );

  const preferencesSet = useMemo(() => {
    if (!preferences)
      return false;
    return (
      preferences.roleKeywords.length > 0 ||
      preferences.preferredLocations.length > 0 ||
      preferences.preferredMode.length > 0 ||
      preferences.experienceLevel ||
      preferences.skills.length > 0
    );
  }, [preferences]);

  const filtered = useMemo(() => {
    let list = [...jobsWithScores];

    // Apply "show only matches" filter
    if (showOnlyMatches && preferences) {
      list = list.filter((item) => item.matchScore >= preferences.minMatchScore);
    }

    // Apply keyword search
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      list = list.filter(
        (item) =>
          item.job.title.toLowerCase().includes(kw) ||
          item.job.company.toLowerCase().includes(kw)
      );
    }

    // Apply location filter
    if (filters.location !== "all") {
      list = list.filter((item) => item.job.location === filters.location);
    }

    // Apply mode filter
    if (filters.mode !== "all") {
      list = list.filter((item) => item.job.mode === filters.mode);
    }

    // Apply experience filter
    if (filters.experience !== "all") {
      list = list.filter((item) => item.job.experience === filters.experience);
    }

    // Apply source filter
    if (filters.source !== "all") {
      list = list.filter((item) => item.job.source === filters.source);
    }

    // Apply sorting
    list.sort((a, b) => {
      if (filters.sort === "latest") {
        return a.job.postedDaysAgo - b.job.postedDaysAgo;
      } else if (filters.sort === "oldest") {
        return b.job.postedDaysAgo - a.job.postedDaysAgo;
      } else if (filters.sort === "match-score") {
        return b.matchScore - a.matchScore;
      } else if (filters.sort === "salary") {
        // Extract numeric values for salary comparison
        const extractSalary = (range: string): number => {
          const match = range.match(/₹?\s*(\d+)/);
          return match ? parseInt(match[1]) : 0;
        };
        return extractSalary(b.job.salaryRange) - extractSalary(a.job.salaryRange);
      }
      return 0;
    });

    return list;
  }, [filters, jobsWithScores, showOnlyMatches, preferences]);

  return (
    <div className="mx-auto w-full max-w-5xl px-space-3 py-space-4">
      <h2 className="mb-space-1">Dashboard</h2>

      {/* Preferences Banner */}
      {!preferencesSet && (
        <Alert className="mb-space-3 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <a href="/settings" className="font-semibold hover:underline">
              Set your preferences
            </a>
            {" "}to activate intelligent job matching.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-space-3 flex items-center justify-between gap-space-3">
        <p className="text-sm text-muted-foreground">
          {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
        </p>
        {preferencesSet && (
          <div className="flex items-center gap-space-2">
            <Switch
              id="show-matches"
              checked={showOnlyMatches}
              onCheckedChange={setShowOnlyMatches}
            />
            <Label htmlFor="show-matches" className="cursor-pointer">
              Show only jobs above threshold
            </Label>
          </div>
        )}
      </div>

      <FilterBar filters={filters} onChange={setFilters} locations={locations} />

      <div className="mt-space-3 grid gap-space-2">
        {filtered.length === 0 ? (
          <div className="py-space-5 text-center">
            <p className="text-sm text-muted-foreground">
              {showOnlyMatches
                ? "No roles match your criteria. Adjust filters or lower your threshold."
                : "No jobs match your filters. Try adjusting your criteria."}
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <JobCard
              key={item.job.id}
              job={item.job}
              matchScore={preferences ? item.matchScore : undefined}
              isSaved={isSaved(item.job.id)}
              onToggleSave={toggleSave}
              onView={setViewJob}
            />
          ))
        )}
      </div>

      <JobDetailModal
        job={viewJob}
        open={!!viewJob}
        onOpenChange={(open) => !open && setViewJob(null)}
      />
    </div>
  );
};

export default Dashboard;
