import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Circle,
  Copy,
  Check,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { getTestsPassed, allTestsPassed } from "@/lib/testing";
import { toast } from "@/hooks/use-toast";

interface ProofState {
  lovableLink: string;
  githubLink: string;
  deployedUrl: string;
}

const PROOF_KEY = "jobTrackerProof";

const STEPS = [
  { id: 1, name: "Project Structure & Components", description: "Core application layout and component hierarchy" },
  { id: 2, name: "Job Matching & Scoring", description: "Intelligent match score algorithm" },
  { id: 3, name: "Preferences System", description: "User preferences persistence and management" },
  { id: 4, name: "Save Job Feature", description: "Bookmark and save jobs functionality" },
  { id: 5, name: "Status Tracking", description: "Job application status (Applied/Rejected/Selected)" },
  { id: 6, name: "Daily Digest Engine", description: "Top 10 job recommendations daily" },
  { id: 7, name: "Test Checklist", description: "All 10 verification tests passed" },
  { id: 8, name: "Ready to Ship", description: "Artifacts collected and validated" },
];

export default function Proof() {
  const [proofState, setProofState] = useState<ProofState>(() => {
    const stored = localStorage.getItem(PROOF_KEY);
    return stored ? JSON.parse(stored) : { lovableLink: "", githubLink: "", deployedUrl: "" };
  });

  const [copied, setCopied] = useState(false);
  const testsPassed = getTestsPassed();
  const allTestsPassed_ = allTestsPassed();
  const totalTests = 10;

  // Determine completed steps
  const getCompletedSteps = (): number => {
    let completed = 0;
    if (proofState.lovableLink) completed++; // Step 1-2
    if (proofState.githubLink) completed++; // Step 3-5
    if (proofState.deployedUrl) completed++; // Step 6
    if (testsPassed > 0) completed++; // Step 7
    if (allTestsPassed_ && proofState.lovableLink && proofState.githubLink && proofState.deployedUrl) {
      completed = 8; // All complete
    }
    return completed;
  };

  const completedSteps = getCompletedSteps();
  const isShipped = allTestsPassed_ && proofState.lovableLink && proofState.githubLink && proofState.deployedUrl;

  // Get status badge
  const getStatusBadge = () => {
    if (isShipped) return { label: "Shipped", variant: "default" as const, color: "bg-green-100 text-green-800" };
    if (completedSteps > 0) return { label: "In Progress", variant: "secondary" as const, color: "bg-blue-100 text-blue-800" };
    return { label: "Not Started", variant: "outline" as const, color: "bg-slate-100 text-slate-800" };
  };

  const status = getStatusBadge();

  const handleInputChange = (field: keyof ProofState, value: string) => {
    const newState = { ...proofState, [field]: value };
    setProofState(newState);
    localStorage.setItem(PROOF_KEY, JSON.stringify(newState));
  };

  const validateUrl = (url: string): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleCopySubmission = async () => {
    const submission = `------------------------------------------
Job Notification Tracker — Final Submission

Lovable Project:
${proofState.lovableLink}

GitHub Repository:
${proofState.githubLink}

Live Deployment:
${proofState.deployedUrl}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
------------------------------------------`;

    try {
      await navigator.clipboard.writeText(submission);
      setCopied(true);
      toast({ title: "Copied to clipboard!", description: "Final submission ready to share." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const allLinksValid =
    validateUrl(proofState.lovableLink) &&
    validateUrl(proofState.githubLink) &&
    validateUrl(proofState.deployedUrl);

  const canShip = allLinksValid && allTestsPassed_;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Proof of Work
              </h1>
              <p className="text-slate-600">
                Project 1 — Job Notification Tracker
              </p>
            </div>
            <Badge className={`${status.color} text-sm px-3 py-1`}>
              {status.label}
            </Badge>
          </div>
        </div>

        {/* Shipped Success Message */}
        {isShipped && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Project 1 Shipped Successfully.</strong> All deliverables validated and ready for production.
            </AlertDescription>
          </Alert>
        )}

        {/* Step Completion Summary */}
        <Card className="mb-6 border-slate-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Step Completion Summary
            </h2>
            <div className="space-y-3">
              {STEPS.map((step) => {
                const isCompleted = step.id <= completedSteps;
                return (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="pt-1">
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-300 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${isCompleted ? "text-green-700" : "text-slate-600"}`}>
                        Step {step.id}: {step.name}
                      </p>
                      <p className="text-sm text-slate-500">{step.description}</p>
                    </div>
                    <div className="text-xs font-medium text-slate-500 pt-1">
                      {isCompleted ? "Completed" : "Pending"}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Overall Progress</p>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full transition-all duration-300"
                        style={{ width: `${(completedSteps / 8) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      {completedSteps}/8
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tests Progress */}
        <Card className="mb-6 border-slate-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Test Checklist Progress
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Tests Passed</p>
                <p className="text-3xl font-bold text-slate-900">
                  {testsPassed}
                  <span className="text-lg text-slate-500 font-normal"> / {totalTests}</span>
                </p>
              </div>
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  allTestsPassed_ ? "bg-green-100" : "bg-amber-100"
                }`}
              >
                <span
                  className={`text-3xl font-bold ${
                    allTestsPassed_ ? "text-green-700" : "text-amber-700"
                  }`}
                >
                  {Math.round((testsPassed / totalTests) * 100)}%
                </span>
              </div>
            </div>
            {!allTestsPassed_ && (
              <Alert className="mt-4 border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  Complete all <strong>10 test items</strong> before shipping.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </Card>

        {/* Artifact Collection */}
        <Card className="mb-6 border-slate-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Artifact Collection
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Provide all required links. Each must be a valid URL.
            </p>

            <div className="space-y-5">
              {/* Lovable Project Link */}
              <div>
                <label className="text-sm font-medium text-slate-900 block mb-2">
                  Lovable Project Link
                </label>
                <Input
                  type="url"
                  placeholder="https://lovable.dev/project/..."
                  value={proofState.lovableLink}
                  onChange={(e) => handleInputChange("lovableLink", e.target.value)}
                  className={`${
                    proofState.lovableLink && !validateUrl(proofState.lovableLink)
                      ? "border-red-300 focus-visible:ring-red-200"
                      : "border-slate-300"
                  }`}
                />
                {proofState.lovableLink && validateUrl(proofState.lovableLink) && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Valid URL
                  </p>
                )}
                {proofState.lovableLink && !validateUrl(proofState.lovableLink) && (
                  <p className="text-xs text-red-600 mt-1">Invalid URL format</p>
                )}
              </div>

              {/* GitHub Repository Link */}
              <div>
                <label className="text-sm font-medium text-slate-900 block mb-2">
                  GitHub Repository Link
                </label>
                <Input
                  type="url"
                  placeholder="https://github.com/user/job-tracker"
                  value={proofState.githubLink}
                  onChange={(e) => handleInputChange("githubLink", e.target.value)}
                  className={`${
                    proofState.githubLink && !validateUrl(proofState.githubLink)
                      ? "border-red-300 focus-visible:ring-red-200"
                      : "border-slate-300"
                  }`}
                />
                {proofState.githubLink && validateUrl(proofState.githubLink) && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Valid URL
                  </p>
                )}
                {proofState.githubLink && !validateUrl(proofState.githubLink) && (
                  <p className="text-xs text-red-600 mt-1">Invalid URL format</p>
                )}
              </div>

              {/* Deployed URL */}
              <div>
                <label className="text-sm font-medium text-slate-900 block mb-2">
                  Deployed URL (Vercel or equivalent)
                </label>
                <Input
                  type="url"
                  placeholder="https://job-tracker.vercel.app"
                  value={proofState.deployedUrl}
                  onChange={(e) => handleInputChange("deployedUrl", e.target.value)}
                  className={`${
                    proofState.deployedUrl && !validateUrl(proofState.deployedUrl)
                      ? "border-red-300 focus-visible:ring-red-200"
                      : "border-slate-300"
                  }`}
                />
                {proofState.deployedUrl && validateUrl(proofState.deployedUrl) && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Valid URL
                  </p>
                )}
                {proofState.deployedUrl && !validateUrl(proofState.deployedUrl) && (
                  <p className="text-xs text-red-600 mt-1">Invalid URL format</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Ship Validation Status */}
        <Card className={`mb-6 border-slate-200 shadow-sm ${isShipped ? "border-green-200 bg-green-50" : ""}`}>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Ship Validation Requirements
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                {allLinksValid ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-300 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${allLinksValid ? "text-green-700" : "text-slate-600"}`}>
                    All 3 links provided with valid URLs
                  </p>
                  <p className="text-xs text-slate-500">
                    Lovable, GitHub, and Deployed URL required
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {allTestsPassed_ ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-300 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${allTestsPassed_ ? "text-green-700" : "text-slate-600"}`}>
                    All 10 test checklist items passed
                  </p>
                  <p className="text-xs text-slate-500">
                    {allTestsPassed_ ? "✓ All tests verified" : `${testsPassed}/10 tests completed`}
                  </p>
                </div>
              </div>
            </div>

            {canShip && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Ready to ship!</strong> All validation requirements met. Project is production-ready.
                </AlertDescription>
              </Alert>
            )}

            {!canShip && (
              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <strong>Not ready yet.</strong>{" "}
                  {!allLinksValid && "Complete all artifact links."}{" "}
                  {!allTestsPassed_ && `Pass all ${totalTests} test items.`}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </Card>

        {/* Copy Submission Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleCopySubmission}
            disabled={!allLinksValid}
            className={`gap-2 px-6 py-2 text-base ${
              allLinksValid
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Final Submission
              </>
            )}
          </Button>
        </div>

        {/* Info Box */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="p-4">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  What is Proof of Work?
                </p>
                <p className="text-sm text-blue-800">
                  This page validates that your Job Notification Tracker project meets all
                  production standards. Complete the test checklist, provide artifact links,
                  and the system confirms you're ready to ship.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
