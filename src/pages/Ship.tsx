import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";
import { allTestsPassed, getTestsPassed } from "@/lib/testing";

export default function Ship() {
  const navigate = useNavigate();
  const testsPassed = getTestsPassed();
  const isUnlocked = allTestsPassed();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 text-slate-600"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>

        {!isUnlocked ? (
          // LOCKED STATE
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Lock className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Ship is Locked
              </h1>
              <p className="text-slate-600">
                Complete all test checks before shipping to production
              </p>
            </div>

            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Shipping disabled.</strong> {testsPassed} of 10 tests have
                been completed. Pass all tests to unlock shipping.
              </AlertDescription>
            </Alert>

            <Card className="border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 mb-4">
                What's Remaining?
              </h2>
              <p className="text-slate-600 mb-4">
                You have {10 - testsPassed} test{10 - testsPassed !== 1 ? "s" : ""} left to verify before you can
                ship this release.
              </p>
              <p className="text-sm text-slate-500 mb-6">
                Go to the Test Checklist page to review and complete the
                remaining tests.
              </p>
              <Button
                onClick={() => navigate("/jt/07-test")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Go to Test Checklist
              </Button>
            </Card>

            <Card className="border-slate-200 p-6 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-3">
                Why This Exists
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>Prevents accidental deployments of incomplete features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>Ensures all critical features have been manually tested</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>Provides a clear checklist before going live</span>
                </li>
              </ul>
            </Card>
          </div>
        ) : (
          // UNLOCKED STATE
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 animate-pulse">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Ready to Ship ✓
              </h1>
              <p className="text-slate-600">
                All {testsPassed} tests are complete. This release is production-ready.
              </p>
            </div>

            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>All systems go!</strong> You have completed all required
                tests and are cleared to deploy this release.
              </AlertDescription>
            </Alert>

            <Card className="border-slate-200 p-6 bg-gradient-to-r from-green-50 to-emerald-50">
              <h2 className="font-semibold text-slate-900 mb-4">
                Deployment Checklist
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">Local testing complete</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">
                    All features verified and working
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">
                    No critical console errors
                  </span>
                </li>
              </ul>
            </Card>

            <Card className="border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">
                Next Steps
              </h3>
              <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
                <li>Push committed code to repository</li>
                <li>Build for production: npm run build</li>
                <li>Deploy to production server</li>
                <li>Monitor application logs for errors</li>
                <li>Confirm features working in production</li>
              </ol>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/jt/07-test")}
                className="flex-1"
              >
                Review Tests
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
