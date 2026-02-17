import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, RotateCcw } from "lucide-react";
import {
  getTestItems,
  setTestStatus,
  getTestsPassed,
  resetTestStatus,
} from "@/lib/testing";

export default function TestChecklist() {
  const [testItems, setTestItems] = useState(() => getTestItems());
  const testsPassed = getTestsPassed();
  const totalTests = 10;

  const handleTestChange = (testId: string, checked: boolean) => {
    setTestStatus(testId as any, checked);
    setTestItems(getTestItems());
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Reset all test statuses? This will clear all checkmarks."
      )
    ) {
      resetTestStatus();
      setTestItems(getTestItems());
    }
  };

  const isAllPassed = testsPassed === totalTests;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Test Checklist
          </h1>
          <p className="text-slate-600">
            Verify all features before shipping to production
          </p>
        </div>

        {/* Results Summary */}
        <Card className="mb-6 border-slate-200 shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Tests Passed
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {testsPassed}
                  <span className="text-lg text-slate-500 font-normal">
                    {" "}
                    / {totalTests}
                  </span>
                </p>
              </div>
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  isAllPassed
                    ? "bg-green-100"
                    : "bg-amber-100"
                }`}
              >
                <span
                  className={`text-2xl font-bold ${
                    isAllPassed
                      ? "text-green-700"
                      : "text-amber-700"
                  }`}
                >
                  {Math.round((testsPassed / totalTests) * 100)}%
                </span>
              </div>
            </div>

            {!isAllPassed && (
              <Alert className="border-amber-200 bg-amber-50">
                <AlertDescription className="text-amber-800">
                  <strong>Not ready to ship.</strong> Resolve all test failures
                  before deploying to production.
                </AlertDescription>
              </Alert>
            )}

            {isAllPassed && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  <strong>All tests passed!</strong> Ready to ship to
                  production.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </Card>

        {/* Test Items */}
        <Card className="border-slate-200 shadow-sm">
          <div className="p-6 space-y-4">
            <TooltipProvider>
              {testItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox
                      id={item.id}
                      checked={item.checked}
                      onCheckedChange={(checked) =>
                        handleTestChange(item.id, checked as boolean)
                      }
                      className={`mt-1 ${
                        item.checked
                          ? "border-green-600 bg-green-50"
                          : "border-slate-300"
                      }`}
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={item.id}
                        className={`text-sm font-medium cursor-pointer block ${
                          item.checked
                            ? "text-green-700 line-through"
                            : "text-slate-900"
                        }`}
                      >
                        {item.label}
                      </label>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600 flex-shrink-0"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs">
                      <p className="text-xs">{item.howToTest}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </TooltipProvider>
          </div>
        </Card>

        {/* Reset Button */}
        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            onClick={handleReset}
            className="text-slate-600 border-slate-200 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Test Status
          </Button>
        </div>

        {/* Info Box */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <div className="p-4">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Use the "How to Test" tooltips (ⓘ icons)
              for step-by-step instructions on verifying each feature.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
