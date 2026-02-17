import { ShieldCheck } from "lucide-react";

const Proof = () => (
  <div className="flex flex-1 flex-col items-center justify-center px-space-3 py-space-5 text-center">
    <ShieldCheck className="mb-space-3 h-12 w-12 text-muted-foreground/40" />
    <h2>Proof of Work</h2>
    <p className="mt-space-1 text-sm text-muted-foreground">
      Artifacts and validation checkpoints will be collected here.
    </p>
  </div>
);

export default Proof;
