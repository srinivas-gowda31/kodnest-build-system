import { Job } from "@/data/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, BookmarkCheck, ExternalLink, Eye, MapPin, Clock } from "lucide-react";
import { getScoreBadgeColor } from "@/lib/scoring";

interface JobCardProps {
  job: Job;
  matchScore?: number;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
  onView: (job: Job) => void;
}

const sourceColor: Record<string, string> = {
  LinkedIn: "bg-primary/10 text-primary",
  Naukri: "bg-success/10 text-success",
  Indeed: "bg-warning/10 text-warning-foreground",
};

const JobCard = ({
  job,
  matchScore,
  isSaved,
  onToggleSave,
  onView,
}: JobCardProps) => {
  const posted =
    job.postedDaysAgo === 0
      ? "Today"
      : job.postedDaysAgo === 1
      ? "1 day ago"
      : `${job.postedDaysAgo} days ago`;

  return (
    <Card className="transition-shadow duration-base hover:shadow-sm">
      <CardContent className="p-space-3">
        <div className="flex items-start justify-between gap-space-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg leading-snug">{job.title}</h3>
            <p className="mt-0.5 text-sm font-medium text-foreground">
              {job.company}
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-1 items-end">
            {matchScore !== undefined && (
              <Badge
                className={`text-xs font-semibold ${getScoreBadgeColor(
                  matchScore
                )}`}
              >
                Match: {matchScore}
              </Badge>
            )}
            <Badge
              variant="secondary"
              className={`text-xs ${sourceColor[job.source] ?? ""}`}
            >
              {job.source}
            </Badge>
          </div>
        </div>

        <div className="mt-space-2 flex flex-wrap items-center gap-x-space-3 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {job.location} · {job.mode}
          </span>
          <span>{job.experience} yrs</span>
          <span>{job.salaryRange}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {posted}
          </span>
        </div>

        <div className="mt-space-3 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => onView(job)}>
            <Eye className="mr-1.5 h-3.5 w-3.5" />
            View
          </Button>
          <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            onClick={() => onToggleSave(job.id)}
          >
            {isSaved ? (
              <BookmarkCheck className="mr-1.5 h-3.5 w-3.5" />
            ) : (
              <Bookmark className="mr-1.5 h-3.5 w-3.5" />
            )}
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Apply
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
