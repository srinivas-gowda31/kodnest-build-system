import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-space-3 py-space-5">
      <div className="max-w-2xl text-center">
        <h1 className="mb-space-2">Stop Missing The Right Jobs.</h1>
        <p className="mx-auto text-base text-muted-foreground">
          Precision-matched job discovery delivered daily at 9AM.
        </p>
        <Button
          size="lg"
          className="mt-space-4"
          onClick={() => navigate("/settings")}
        >
          Start Tracking
        </Button>
      </div>
    </div>
  );
};

export default Index;
