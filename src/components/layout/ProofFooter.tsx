import { Check } from "lucide-react";

interface ProofItem {
  label: string;
  completed: boolean;
}

interface ProofFooterProps {
  items: ProofItem[];
  onToggle?: (index: number) => void;
}

const ProofFooter = ({ items, onToggle }: ProofFooterProps) => {
  return (
    <footer className="border-t border-border bg-card px-space-3 py-space-3">
      <div className="flex flex-wrap items-center gap-space-3">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => onToggle?.(index)}
            className="group flex items-center gap-2 text-sm transition-all duration-base ease-system"
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-sm border transition-all duration-base ease-system ${
                item.completed
                  ? "border-success bg-success text-success-foreground"
                  : "border-border bg-transparent text-transparent"
              }`}
            >
              <Check className="h-3 w-3" />
            </span>
            <span
              className={
                item.completed
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
              }
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </footer>
  );
};

export default ProofFooter;
