'use client';

import { useState, useEffect, useMemo } from "react";
import { Mail, Copy, Send, RefreshCw, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { jobs } from "@/data/jobs";
import {
  loadPreferences,
  generateDigest,
  loadTodayDigest,
  saveDigest,
  formatDigestAsText,
  JobDigest,
  getScoreBadgeColor,
} from "@/lib/scoring";

const Digest = () => {
  const [digest, setDigest] = useState<JobDigest | null>(null);
  const [preferences, setPreferences] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load preferences and existing digest on mount
  useEffect(() => {
    const prefs = loadPreferences();
    setPreferences(prefs);

    const existingDigest = loadTodayDigest();
    if (existingDigest) {
      setDigest(existingDigest);
    }

    setLoading(false);
  }, []);

  // Check if preferences are set
  const preferencesSet = useMemo(() => {
    if (!preferences) return false;
    return (
      preferences.roleKeywords.length > 0 ||
      preferences.preferredLocations.length > 0 ||
      preferences.preferredMode.length > 0 ||
      preferences.experienceLevel ||
      preferences.skills.length > 0
    );
  }, [preferences]);

  const handleGenerateDigest = () => {
    if (!preferences || !preferencesSet) return;

    setLoading(true);
    const newDigest = generateDigest(jobs, preferences);
    saveDigest(newDigest);
    setDigest(newDigest);
    setLoading(false);
  };

  const handleCopyToClipboard = () => {
    if (!digest) return;
    const text = formatDigestAsText(digest);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailDraft = () => {
    if (!digest) return;
    const text = formatDigestAsText(digest);
    const subject = encodeURIComponent("My 9AM Job Digest");
    const body = encodeURIComponent(text);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-space-3 py-space-5">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // No preferences set
  if (!preferencesSet) {
    return (
      <div className="mx-auto w-full max-w-2xl px-space-3 py-space-4">
        <h2 className="mb-space-3">Daily Job Digest</h2>
        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <a href="/settings" className="font-semibold hover:underline">
              Set your preferences
            </a>
            {" "}to generate a personalized digest.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // No digest generated yet - show button to generate
  if (!digest) {
    return (
      <div className="mx-auto w-full max-w-2xl px-space-3 py-space-4">
        <h2 className="mb-space-3">Daily Job Digest</h2>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-space-5 text-center">
            <Mail className="mb-space-3 h-12 w-12 text-muted-foreground/40" />
            <h3 className="font-semibold">No Digest Generated Yet</h3>
            <p className="mt-space-2 max-w-sm text-sm text-muted-foreground">
              Generate today's personalized digest to see your top 10 matching jobs.
            </p>
            <Button
              onClick={handleGenerateDigest}
              className="mt-space-3"
              size="lg"
              disabled={loading}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {loading ? "Generating..." : "Generate Today's 9AM Digest"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No matches found
  if (digest.jobs.length === 0) {
    return (
      <div className="mx-auto w-full max-w-2xl px-space-3 py-space-4">
        <h2 className="mb-space-3">Daily Job Digest</h2>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No matching roles today. Check again tomorrow.
          </AlertDescription>
        </Alert>
        <div className="mt-space-3">
          <Button onClick={handleGenerateDigest} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
        </div>
      </div>
    );
  }

  // Digest exists with jobs
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto w-full max-w-2xl px-space-3 py-space-4">
      <h2 className="mb-space-3">Daily Job Digest</h2>

      {/* Email-style layout */}
      <div className="rounded-lg bg-slate-50 dark:bg-slate-950 p-space-4">
        <Card className="border-none shadow-none">
          <CardContent className="p-space-4">
            {/* Header */}
            <div className="mb-space-4 text-center">
              <h3 className="text-2xl font-bold">Top 10 Jobs For You</h3>
              <p className="mt-1 text-sm text-muted-foreground">9AM Digest — {today}</p>
            </div>

            <Separator className="my-space-4" />

            {/* Jobs List */}
            <div className="space-y-space-3">
              {digest.jobs.map((job, index) => (
                <div key={job.id} className="space-y-1 pb-space-3">
                  <div className="flex items-start justify-between gap-space-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        #{index + 1}
                      </p>
                      <h4 className="font-semibold">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge
                      className={`shrink-0 text-xs font-semibold ${getScoreBadgeColor(
                        job.matchScore
                      )}`}
                    >
                      {job.matchScore}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-space-2 gap-y-0.5 text-xs text-muted-foreground">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.experience}</span>
                  </div>

                  <div className="pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="text-xs"
                    >
                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply
                      </a>
                    </Button>
                  </div>

                  {index < digest.jobs.length - 1 && (
                    <Separator className="my-space-2" />
                  )}
                </div>
              ))}
            </div>

            <Separator className="my-space-4" />

            {/* Footer */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                This digest was generated based on your preferences.
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Demo Mode: Daily 9AM trigger simulated manually.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="mt-space-4 flex flex-wrap gap-space-2">
        <Button onClick={handleCopyToClipboard} variant="outline">
          <Copy className="mr-2 h-4 w-4" />
          {copied ? "Copied!" : "Copy to Clipboard"}
        </Button>
        <Button onClick={handleEmailDraft} variant="outline">
          <Send className="mr-2 h-4 w-4" />
          Create Email Draft
        </Button>
        <Button onClick={handleGenerateDigest} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Regenerate
        </Button>
      </div>
    </div>
  );
};

export default Digest;
