import React from "react";
import TopBar from "./TopBar";
import ContextHeader from "./ContextHeader";
import ProofFooter from "./ProofFooter";

interface ProofItem {
  label: string;
  completed: boolean;
}

interface PageLayoutProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "not-started" | "in-progress" | "shipped";
  headline: string;
  subtext: string;
  proofItems: ProofItem[];
  onProofToggle?: (index: number) => void;
  primaryContent: React.ReactNode;
  secondaryContent: React.ReactNode;
}

const PageLayout = ({
  projectName,
  currentStep,
  totalSteps,
  status,
  headline,
  subtext,
  proofItems,
  onProofToggle,
  primaryContent,
  secondaryContent,
}: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar
        projectName={projectName}
        currentStep={currentStep}
        totalSteps={totalSteps}
        status={status}
      />

      <ContextHeader headline={headline} subtext={subtext} />

      <div className="flex flex-1 flex-col lg:flex-row">
        <main className="flex-1 p-space-3 lg:w-[70%]">
          {primaryContent}
        </main>

        <aside className="border-t border-border p-space-3 lg:w-[30%] lg:border-l lg:border-t-0">
          {secondaryContent}
        </aside>
      </div>

      <ProofFooter items={proofItems} onToggle={onProofToggle} />
    </div>
  );
};

export default PageLayout;
