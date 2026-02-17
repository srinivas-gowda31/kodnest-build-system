import { Mail } from "lucide-react";

const Digest = () => (
  <div className="flex flex-1 flex-col items-center justify-center px-space-3 py-space-5 text-center">
    <Mail className="mb-space-3 h-12 w-12 text-muted-foreground/40" />
    <h2>No digests yet.</h2>
    <p className="mt-space-1 text-sm text-muted-foreground">
      Your daily 9AM job digest will be displayed here.
    </p>
  </div>
);

export default Digest;
