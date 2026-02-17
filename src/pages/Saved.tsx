import { Bookmark } from "lucide-react";

const Saved = () => (
  <div className="flex flex-1 flex-col items-center justify-center px-space-3 py-space-5 text-center">
    <Bookmark className="mb-space-3 h-12 w-12 text-muted-foreground/40" />
    <h2>No saved jobs.</h2>
    <p className="mt-space-1 text-sm text-muted-foreground">
      Jobs you bookmark will appear here for easy access.
    </p>
  </div>
);

export default Saved;
