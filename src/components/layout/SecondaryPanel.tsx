import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ExternalLink, Check, AlertCircle, Camera } from "lucide-react";

interface SecondaryPanelProps {
  stepTitle: string;
  stepDescription: string;
  prompt?: string;
  onCopy?: () => void;
  onBuild?: () => void;
  onWorked?: () => void;
  onError?: () => void;
  onScreenshot?: () => void;
}

const SecondaryPanel = ({
  stepTitle,
  stepDescription,
  prompt,
  onCopy,
  onBuild,
  onWorked,
  onError,
  onScreenshot,
}: SecondaryPanelProps) => {
  return (
    <aside className="flex flex-col gap-space-3">
      <div>
        <h3 className="text-lg text-foreground">{stepTitle}</h3>
        <p className="mt-space-1 text-sm text-muted-foreground leading-relaxed">
          {stepDescription}
        </p>
      </div>

      {prompt && (
        <Card>
          <CardContent className="p-space-2">
            <pre className="whitespace-pre-wrap font-body text-sm text-foreground leading-relaxed">
              {prompt}
            </pre>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-2">
        <Button variant="default" size="sm" onClick={onCopy}>
          <Copy className="h-4 w-4" />
          Copy Prompt
        </Button>
        <Button variant="outline" size="sm" onClick={onBuild}>
          <ExternalLink className="h-4 w-4" />
          Build in Lovable
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onWorked}>
            <Check className="h-4 w-4" />
            It Worked
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={onError}>
            <AlertCircle className="h-4 w-4" />
            Error
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={onScreenshot}>
          <Camera className="h-4 w-4" />
          Add Screenshot
        </Button>
      </div>
    </aside>
  );
};

export default SecondaryPanel;
