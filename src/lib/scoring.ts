import { Job } from "@/data/jobs";

export interface JobTrackerPreferences {
  roleKeywords: string[];
  preferredLocations: string[];
  preferredMode: string[];
  experienceLevel: string;
  skills: string[];
  minMatchScore: number;
}

export const DEFAULT_PREFERENCES: JobTrackerPreferences = {
  roleKeywords: [],
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: "",
  skills: [],
  minMatchScore: 40,
};

// localStorage key constant
export const PREFS_STORAGE_KEY = "jobTrackerPreferences";

/**
 * Calculate match score for a job based on user preferences
 * Rules:
 * +25 if any roleKeyword in job title (case-insensitive)
 * +15 if any roleKeyword in job description
 * +15 if job location matches preferredLocations
 * +10 if job mode matches preferredMode
 * +10 if job experience matches experienceLevel
 * +15 if overlap between job skills and user skills
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 * Cap at 100
 */
export function calculateMatchScore(
  job: Job,
  preferences: JobTrackerPreferences
): number {
  let score = 0;

  // +25 if any roleKeyword in job title (case-insensitive)
  if (preferences.roleKeywords.length > 0) {
    const titleLower = job.title.toLowerCase();
    const hasKeywordInTitle = preferences.roleKeywords.some((keyword) =>
      titleLower.includes(keyword.toLowerCase())
    );
    if (hasKeywordInTitle) score += 25;
  }

  // +15 if any roleKeyword in job description
  if (preferences.roleKeywords.length > 0) {
    const descLower = job.description.toLowerCase();
    const hasKeywordInDesc = preferences.roleKeywords.some((keyword) =>
      descLower.includes(keyword.toLowerCase())
    );
    if (hasKeywordInDesc) score += 15;
  }

  // +15 if job location matches preferredLocations
  if (
    preferences.preferredLocations.length > 0 &&
    preferences.preferredLocations.includes(job.location)
  ) {
    score += 15;
  }

  // +10 if job mode matches preferredMode
  if (
    preferences.preferredMode.length > 0 &&
    preferences.preferredMode.includes(job.mode)
  ) {
    score += 10;
  }

  // +10 if job experience matches experienceLevel
  if (
    preferences.experienceLevel &&
    job.experience === preferences.experienceLevel
  ) {
    score += 10;
  }

  // +15 if overlap between job skills and user skills
  if (preferences.skills.length > 0) {
    const userSkillsLower = preferences.skills.map((s) => s.toLowerCase());
    const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
    const overlap = userSkillsLower.some((userSkill) =>
      jobSkillsLower.includes(userSkill)
    );
    if (overlap) score += 15;
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source is LinkedIn
  if (job.source === "LinkedIn") {
    score += 5;
  }

  // Cap at 100
  return Math.min(score, 100);
}

/**
 * Get color for match score badge
 */
export function getScoreBadgeColor(score: number): string {
  if (score >= 80) return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
  if (score >= 60) return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
  if (score >= 40) return "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200";
  return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
}

/**
 * Save preferences to localStorage
 */
export function savePreferences(preferences: JobTrackerPreferences): void {
  localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(preferences));
}

/**
 * Load preferences from localStorage
 */
export function loadPreferences(): JobTrackerPreferences {
  const stored = localStorage.getItem(PREFS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_PREFERENCES;
    }
  }
  return DEFAULT_PREFERENCES;
}
