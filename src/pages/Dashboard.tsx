import { useState, useMemo } from "react";
import { jobs, Job } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import FilterBar, { Filters } from "@/components/jobs/FilterBar";

const defaultFilters: Filters = {
  keyword: "",
  location: "all",
  mode: "all",
  experience: "all",
  source: "all",
  sort: "latest",
};

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const { toggleSave, isSaved } = useSavedJobs();

  const locations = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.location))).sort(),
    []
  );

  const filtered = useMemo(() => {
    let list = [...jobs];

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(kw) ||
          j.company.toLowerCase().includes(kw)
      );
    }
    if (filters.location !== "all")
      list = list.filter((j) => j.location === filters.location);
    if (filters.mode !== "all")
      list = list.filter((j) => j.mode === filters.mode);
    if (filters.experience !== "all")
      list = list.filter((j) => j.experience === filters.experience);
    if (filters.source !== "all")
      list = list.filter((j) => j.source === filters.source);

    list.sort((a, b) =>
      filters.sort === "latest"
        ? a.postedDaysAgo - b.postedDaysAgo
        : b.postedDaysAgo - a.postedDaysAgo
    );

    return list;
  }, [filters]);

  return (
    <div className="mx-auto w-full max-w-5xl px-space-3 py-space-4">
      <h2 className="mb-space-1">Dashboard</h2>
      <p className="mb-space-3 text-sm text-muted-foreground">
        {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
      </p>

      <FilterBar filters={filters} onChange={setFilters} locations={locations} />

      <div className="mt-space-3 grid gap-space-2">
        {filtered.length === 0 ? (
          <p className="py-space-5 text-center text-sm text-muted-foreground">
            No jobs match your filters. Try adjusting your criteria.
          </p>
        ) : (
          filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={isSaved(job.id)}
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
