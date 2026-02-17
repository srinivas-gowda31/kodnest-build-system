import { useState } from "react";
import { jobs, Job } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { Bookmark } from "lucide-react";

const Saved = () => {
  const { savedIds, toggleSave, isSaved } = useSavedJobs();
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

  if (savedJobs.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-space-3 py-space-5 text-center">
        <Bookmark className="mb-space-3 h-12 w-12 text-muted-foreground/40" />
        <h2>No saved jobs.</h2>
        <p className="mt-space-1 text-sm text-muted-foreground">
          Jobs you bookmark will appear here for easy access.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-space-3 py-space-4">
      <h2 className="mb-space-1">Saved Jobs</h2>
      <p className="mb-space-3 text-sm text-muted-foreground">
        {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
      </p>

      <div className="grid gap-space-2">
        {savedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={isSaved(job.id)}
            onToggleSave={toggleSave}
            onView={setViewJob}
          />
        ))}
      </div>

      <JobDetailModal
        job={viewJob}
        open={!!viewJob}
        onOpenChange={(open) => !open && setViewJob(null)}
      />
    </div>
  );
};

export default Saved;
