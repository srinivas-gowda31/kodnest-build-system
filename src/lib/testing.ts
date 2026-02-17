/**
 * Test Checklist Management
 * Tracks which tests have been verified before shipping
 */

export type TestItem = 
  | "preferences_persist"
  | "match_score"
  | "show_matches_toggle"
  | "save_job_persist"
  | "apply_new_tab"
  | "status_persist"
  | "status_filter"
  | "digest_top_10"
  | "digest_persist"
  | "no_console_errors";

export interface TestResult {
  id: TestItem;
  label: string;
  description: string;
  checked: boolean;
  howToTest: string;
}

const TEST_STATUS_KEY = "jobTrackerTestStatus";

const TEST_ITEMS: TestResult[] = [
  {
    id: "preferences_persist",
    label: "Preferences persist after refresh",
    description: "User preferences saved in /settings should load on page refresh",
    howToTest: "Go to /settings → Set preferences → Refresh (F5) → Check values are still there",
    checked: false,
  },
  {
    id: "match_score",
    label: "Match score calculates correctly",
    description: "Jobs show accurate match scores based on preferences",
    howToTest: "Check /dashboard → Jobs matching your preferences show higher scores",
    checked: false,
  },
  {
    id: "show_matches_toggle",
    label: '"Show only matches" toggle works',
    description: "Dashboard toggle filters jobs above threshold",
    howToTest: "Turn on toggle → Only jobs above min threshold appear → Turn off → All jobs return",
    checked: false,
  },
  {
    id: "save_job_persist",
    label: "Save job persists after refresh",
    description: "Saved jobs stay bookmarked after page refresh",
    howToTest: "Click Save on a job → Refresh → Verify it's still saved in /saved",
    checked: false,
  },
  {
    id: "apply_new_tab",
    label: "Apply opens in new tab",
    description: "Apply button correctly opens URL in new browser tab",
    howToTest: 'Click "Apply" button → Verify it opens in new tab (not current page)',
    checked: false,
  },
  {
    id: "status_persist",
    label: "Status update persists after refresh",
    description: "Job status (Applied/Rejected/Selected) persists after page reload",
    howToTest: "Change job status → Refresh page (F5) → Status should still be changed",
    checked: false,
  },
  {
    id: "status_filter",
    label: "Status filter works correctly",
    description: "Filter dropdown on /dashboard filters jobs by status",
    howToTest: "Mark jobs with different statuses → Use Status filter → Only selected statuses appear",
    checked: false,
  },
  {
    id: "digest_top_10",
    label: "Digest generates top 10 by score",
    description: "Digest shows top 10 jobs sorted by match score (highest first)",
    howToTest: "Go to /digest → Generate → Verify jobs are ranked by match score descending",
    checked: false,
  },
  {
    id: "digest_persist",
    label: "Digest persists for the day",
    description: "Generated digest stays available for the rest of the day",
    howToTest: "Generate digest → Refresh page → Same digest appears without regenerating",
    checked: false,
  },
  {
    id: "no_console_errors",
    label: "No console errors on main pages",
    description: "Open DevTools (F12) and check for JavaScript errors",
    howToTest: "F12 → Console tab → Navigate all pages → Should see no red error messages",
    checked: false,
  },
];

/**
 * Get all test items with their current status
 */
export function getTestItems(): TestResult[] {
  const stored = localStorage.getItem(TEST_STATUS_KEY);
  if (stored) {
    try {
      const statuses: Record<string, boolean> = JSON.parse(stored);
      return TEST_ITEMS.map((item) => ({
        ...item,
        checked: statuses[item.id] ?? false,
      }));
    } catch {
      return TEST_ITEMS;
    }
  }
  return TEST_ITEMS;
}

/**
 * Update test item status
 */
export function setTestStatus(testId: TestItem, checked: boolean): void {
  const stored = localStorage.getItem(TEST_STATUS_KEY);
  let statuses: Record<string, boolean> = {};

  if (stored) {
    try {
      statuses = JSON.parse(stored);
    } catch {
      statuses = {};
    }
  }

  statuses[testId] = checked;
  localStorage.setItem(TEST_STATUS_KEY, JSON.stringify(statuses));
}

/**
 * Get number of tests passed
 */
export function getTestsPassed(): number {
  return getTestItems().filter((item) => item.checked).length;
}

/**
 * Check if all tests are passed
 */
export function allTestsPassed(): boolean {
  return getTestsPassed() === TEST_ITEMS.length;
}

/**
 * Reset all test statuses
 */
export function resetTestStatus(): void {
  localStorage.removeItem(TEST_STATUS_KEY);
}
