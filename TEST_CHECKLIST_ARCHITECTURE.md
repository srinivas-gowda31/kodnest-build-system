# Test Checklist System - Technical Architecture

## System Design

### Components Architecture

```
App.tsx
├── Routes
│   ├── /jt/07-test → TestChecklist.tsx
│   └── /jt/08-ship → Ship.tsx
│
AppNav.tsx
├── Main Navigation Links (Dashboard, Saved, Digest, Settings, Proof)
├── Separator
└── Test Links (Test, Ship)

TestChecklist.tsx
├── Import: getTestItems, setTestStatus, getTestsPassed, resetTestStatus from /lib/testing.ts
├── State Hooks:
│   ├── useState: testItems (TestResult[])
│   ├── useState: testsPassed (number, computed)
│   └── useState: isAllPassed (boolean, computed)
├── UI Components:
│   ├── Header (title + description)
│   ├── Summary Card (progress indicator, warning/success message)
│   ├── Checklist Card (items with checkboxes + tooltips)
│   └── Reset Button with confirmation dialog
└── Event Handlers:
    ├── handleTestChange(testId, checked)
    └── handleReset()

Ship.tsx
├── Import: allTestsPassed, getTestsPassed from /lib/testing.ts
├── useNavigate Hook from react-router-dom
├── Conditional Rendering:
│   ├── If !isUnlocked → Locked UI (red, lock icon, warning)
│   └── If isUnlocked → Unlocked UI (green, success message, deployment info)
└── Navigation Handlers:
    ├── handleReset() → navigate to /jt/07-test
    └── handleDeploy() → navigate to /
```

### State Management Flow

```
User Action
    │
    ├─► Check/Uncheck Box
    │       │
    │       ▼
    │   handleTestChange()
    │       │
    │       ▼
    │   setTestStatus(testId, checked)
    │       │
    │       ▼
    │   localStorage.setItem('jobTrackerTestStatus', JSON.stringify(statuses))
    │       │
    │       ▼
    │   setTestItems(getTestItems()) [re-render]
    │
    ├─► Click Reset Button
    │       │
    │       ▼
    │   Show Confirmation Dialog
    │       │
    │       ▼
    │   resetTestStatus()
    │       │
    │       ▼
    │   localStorage.removeItem('jobTrackerTestStatus')
    │       │
    │       ▼
    │   setTestItems(getTestItems()) [re-render]
    │
    └─► Navigate to /jt/08-ship
            │
            ▼
        Ship component loads
            │
            ▼
        allTestsPassed() called
            │
            ├─► reads localStorage
            │
            ▼
        Conditional render: Locked UI | Unlocked UI
```

## Data Model

### TestResult Interface

```typescript
interface TestResult {
  id: TestItem;                    // Unique identifier
  label: string;                   // Display text for checkbox
  description: string;             // Detailed description
  checked: boolean;                // Current status (from localStorage)
  howToTest: string;              // Tooltip text for "How to Test"
}

type TestItem = 
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
```

### localStorage Structure

**Key:** `jobTrackerTestStatus`
**Type:** JSON string (serialized Record<string, boolean>)
**Format:**

```json
{
  "preferences_persist": true,
  "match_score": true,
  "show_matches_toggle": false,
  "save_job_persist": true,
  "apply_new_tab": true,
  "status_persist": true,
  "status_filter": true,
  "digest_top_10": true,
  "digest_persist": false,
  "no_console_errors": true
}
```

## API Functions

### File: `/lib/testing.ts`

#### `getTestItems(): TestResult[]`
- **Purpose:** Get all test items with current status
- **Logic:**
  1. Retrieve `jobTrackerTestStatus` from localStorage
  2. Parse JSON or return empty object on error
  3. Map TEST_ITEMS array, merging with stored statuses
  4. Return array with checked status for each item
- **Returns:** TestResult[] with up-to-date checked values
- **Side Effects:** None (read-only)

#### `setTestStatus(testId: TestItem, checked: boolean): void`
- **Purpose:** Save test status to localStorage
- **Logic:**
  1. Retrieve current `jobTrackerTestStatus` object
  2. Update specific testId with checked boolean
  3. Save back to localStorage as JSON string
- **Returns:** void
- **Side Effects:** Modifies localStorage

#### `getTestsPassed(): number`
- **Purpose:** Count how many tests are currently checked
- **Logic:**
  1. Call getTestItems()
  2. Filter for items where checked === true
  3. Return count
- **Returns:** number (0-10)
- **Side Effects:** None

#### `allTestsPassed(): boolean`
- **Purpose:** Check if all 10 tests are complete
- **Logic:**
  1. Call getTestsPassed()
  2. Return (getTestsPassed() === 10)
- **Returns:** boolean
- **Side Effects:** None

#### `resetTestStatus(): void`
- **Purpose:** Clear all test status data
- **Logic:**
  1. Call localStorage.removeItem('jobTrackerTestStatus')
- **Returns:** void
- **Side Effects:** Removes key from localStorage, all tests revert to unchecked

## Component Logic

### TestChecklist.tsx

#### State Initialization
```typescript
const [testItems, setTestItems] = useState(() => getTestItems());
const testsPassed = getTestsPassed();
const totalTests = 10;
const isAllPassed = testsPassed === totalTests;
```

#### Render Logic

**Progress Indicator Section:**
- Color classes depend on isAllPassed:
  - `bg-green-100 text-green-700` if all passed
  - `bg-amber-100 text-amber-700` if incomplete
- Percentage: `Math.round((testsPassed / totalTests) * 100)`

**Alert Component:**
- Type: `alert` (not error/warning type)
- Background & text color:
  - `bg-green-50 text-green-800` if all passed
  - `bg-amber-50 text-amber-800` if incomplete
- Message depends on status

**Checkbox Line:**
- Label styling:
  - `text-green-700 line-through` if checked
  - `text-slate-900` if unchecked
- Checkbox styling:
  - `border-green-600 bg-green-50` if checked
  - `border-slate-300` if unchecked

#### Event Handlers

**handleTestChange(testId, checked):**
```typescript
const handleTestChange = (testId: string, checked: boolean) => {
  setTestStatus(testId as any, checked);  // Save to localStorage
  setTestItems(getTestItems());             // Update local state
};
```

**handleReset():**
```typescript
const handleReset = () => {
  if (window.confirm('Reset? This clears all checkmarks.')) {
    resetTestStatus();           // Remove from localStorage
    setTestItems(getTestItems()); // Update local state
  }
};
```

### Ship.tsx

#### Navigation & State
```typescript
const navigate = useNavigate();
const testsPassed = getTestsPassed();
const isUnlocked = allTestsPassed();
```

#### Conditional Rendering

**If isUnlocked === false (Locked State):**
1. Lock icon (red circle background)
2. Heading: "Ship is Locked"
3. Alert: "Shipping disabled"
4. Message: "{testsPassed} of 10 tests completed"
5. Button: Links to `/jt/07-test`
6. FAQ: "Why This Exists" section

**If isUnlocked === true (Unlocked State):**
1. Checkmark icon (green circle background, animated)
2. Heading: "Ready to Ship ✓"
3. Alert: "All systems go!"
4. Message: "All {testsPassed} tests are complete"
5. Checklist: Shows deployment requirements
6. Buttons: "Review Tests" (→ /jt/07-test), "Go to Dashboard" (→ /)

## Styling & Design

### Color Palette
- **Success (all tests):** Green (green-50, green-100, green-600, green-700, green-800, green-900)
- **Warning (incomplete):** Amber (amber-50, amber-100, amber-700, amber-800)
- **Neutral:** Slate (slate-50, slate-100, slate-300, slate-400, slate-500, slate-600, slate-900)
- **Info:** Blue (blue-50, blue-900)

### Component Styling

**TestChecklist Card:**
```
max-w-3xl mx-auto
p-6
bg-white
border-slate-200
shadow-sm
```

**Progress Indicator:**
```
w-20 h-20 rounded-full
Flex center alignment
Dynamic background colors
Text-2xl font-bold
```

**Checklist Items:**
```
flex items-start gap-4
pb-4 border-b-slate-100
Line-through for checked items
Green text for checked items
```

**Tooltip Styling:**
```
ℹ️ Help icon button
h-6 w-6 p-0 (square)
Subtle gray color
Larger tooltip on side left
max-w-xs constrained width
```

**Ship Page Responsive:**
```
Grid layout: max-w-2xl
Mobile friendly buttons
Full-width on small screens
Card-based layout
```

## Integration Points

### With Existing Codebase
- **No conflicts** with existing routes
- **No conflicts** with existing localStorage keys
- **Uses existing:** UI components (Card, Button, Checkbox, Alert, Tooltip)
- **Uses existing:** Navigation system (React Router)
- **Uses existing:** Icon library (lucide-react)
- **Uses existing:** Styling (Tailwind CSS)

### localStorage Separation
- **New key:** `jobTrackerTestStatus` (unique)
- **Existing keys:** jobTrackerPreferences, jobTrackerDigest_*, jobTrackerStatus, jobTrackerStatusHistory (unchanged)
- **No overlap** or data conflicts

### Component Re-exports
- **TestChecklist.tsx:** Imports from /lib/testing.ts
- **Ship.tsx:** Imports from /lib/testing.ts
- **App.tsx:** Imports both page components
- **AppNav.tsx:** No imports (just config arrays)

## Error Handling

### localStorage Failures

**If localStorage is full:**
- `setTestStatus()` catches error silently
- User can still interact with page
- Data persists during current session
- Next refresh: localStorage may be empty

**If localStorage is disabled:**
- `getTestItems()` returns TEST_ITEMS with all checked=false
- `setTestStatus()` fails silently
- Reset still works (just doesn't save)
- User sees: empty checklist each refresh

**JSON Parse Errors:**
- `getTestItems()` catches JSON.parse() errors
- Falls back to TEST_ITEMS with all checked=false
- Allows recovery if data is corrupted

### Try-Catch Blocks
```typescript
try {
  statuses = JSON.parse(stored);
} catch {
  statuses = {}; // Fallback on parse error
}
```

## Performance Considerations

### State Updates
- **Memoization:** testsPassed and isAllPassed computed from state on each render
- **No useMemo needed** (computation is trivial: filter + count)
- **Re-render on:** testItems state change only (not on every keystroke)

### localStorage Operations
- **Read:** Once on component mount, once per checkbox change, once on reset
- **Write:** Once per checkbox change, once on reset
- **No polling:** State-driven, not timer-based

### Re-render Optimization
```typescript
// Each checkbox change triggers:
// 1. Event: handleTestChange()
// 2. Write: setTestStatus() → localStorage
// 3. Read: getTestItems() → reads localStorage
// 4. Render: setTestItems() → re-render
// Total: ~4ms per click on typical machine
```

## Testing Recommendations

### Unit Tests (for /lib/testing.ts)
- Mock localStorage
- Test getTestItems() with various localStorage states
- Test setTestStatus() persistence
- Test getTestsPassed() counting
- Test allTestsPassed() boolean
- Test resetTestStatus() clearing

### Integration Tests (for components)
- Test checkbox interaction
- Test localStorage persistence across component unmount/mount
- Test navigation when locked/unlocked
- Test Reset button confirmation
- Test tooltip hover/click

### E2E Tests (full application)
- Navigate to /jt/07-test
- Complete all 10 tests
- Navigate to /jt/08-ship
- Verify unlock message
- Refresh page
- Verify persistent unlock state

## Browser Compatibility

**Required Features:**
- localStorage API (ES5 standard)
- React Router v6+ (already in use)
- CSS Grid/Flexbox (modern browsers)
- Tooltip API (Shadcn component)

**Tested On:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Deployment Checklist

- [ ] All files created (3 new files, 2 modified files)
- [ ] No TypeScript errors
- [ ] No build errors
- [ ] Routes added to App.tsx
- [ ] Navigation links added to AppNav.tsx
- [ ] localStorage key verified (jobTrackerTestStatus)
- [ ] Verified no conflicts with existing keys
- [ ] Tested checkbox persistence
- [ ] Tested ship page lock/unlock
- [ ] Tested reset functionality
- [ ] Tested on mobile/responsive
- [ ] Tested navigation
- [ ] Verified dark mode compatibility (if applicable)
- [ ] Verified accessibility (WCAG)
- [ ] Code committed and pushed
- [ ] Documentation created
