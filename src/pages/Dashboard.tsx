import { Briefcase } from "lucide-react";

const Dashboard = () => (
  <div className="flex flex-1 flex-col items-center justify-center px-space-3 py-space-5 text-center">
    <Briefcase className="mb-space-3 h-12 w-12 text-muted-foreground/40" />
    <h2>No jobs yet.</h2>
    <p className="mt-space-1 text-sm text-muted-foreground">
      In the next step, you will load a realistic dataset.
    </p>
  </div>
);

export default Dashboard;
