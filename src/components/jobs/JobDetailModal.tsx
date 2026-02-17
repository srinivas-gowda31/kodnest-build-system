import { Job } from "@/data/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, MapPin } from "lucide-react";

interface JobDetailModalProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JobDetailModal = ({ job, open, onOpenChange }: JobDetailModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{job.title}</DialogTitle>
          <DialogDescription className="text-sm">
            {job.company} · {job.location} · {job.mode}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-space-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
            <span>·</span>
            <span>{job.experience} yrs</span>
            <span>·</span>
            <span>{job.salaryRange}</span>
          </div>

          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map((s) => (
                <Badge key={s} variant="secondary" className="text-xs">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Description
            </p>
            <p className="text-sm leading-relaxed text-foreground">{job.description}</p>
          </div>

          <Button className="w-full" asChild>
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Apply Now
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
