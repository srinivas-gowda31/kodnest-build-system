import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "not-started" | "in-progress" | "shipped";
}

const statusLabels: Record<TopBarProps["status"], string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  shipped: "Shipped",
};

const statusStyles: Record<TopBarProps["status"], string> = {
  "not-started": "bg-muted text-muted-foreground",
  "in-progress": "bg-warning/15 text-warning-foreground",
  shipped: "bg-success/15 text-success",
};

const TopBar = ({
  projectName,
  currentStep,
  totalSteps,
  status,
}: TopBarProps) => {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-card px-space-3">
      <span className="text-sm font-medium text-foreground">{projectName}</span>

      <span className="text-sm text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>

      <Badge
        variant="secondary"
        className={`text-xs font-medium ${statusStyles[status]}`}
      >
        {statusLabels[status]}
      </Badge>
    </header>
  );
};

export default TopBar;
