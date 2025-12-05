# Design Guidelines for Testing/Quiz Application

## Design Approach
**Selected Approach:** Design System + Custom Specifications

This is a utility-focused testing application requiring clarity, consistency, and efficiency. Base the design on **Material Design principles** for its clean component structure and strong information hierarchy, while incorporating the custom light green/mint aesthetic shown in the provided mockups.

## Core Design Principles
1. **Clarity First:** Every UI element must clearly communicate its purpose and state
2. **Minimal Distraction:** Clean, focused interface that keeps attention on test content
3. **Immediate Feedback:** Clear visual states for user actions (clicked, selected, completed)
4. **Consistent Patterns:** Same components behave identically across all pages

## Typography System

**Font Family:** Inter or Roboto via Google Fonts CDN

**Hierarchy:**
- Page Titles: text-2xl to text-3xl, font-semibold
- Section Headers: text-xl, font-medium
- Question Text: text-lg, font-normal
- Body/Instructions: text-base, font-normal
- Small Labels/Captions: text-sm, font-normal
- Button Text: text-base, font-medium

## Layout & Spacing System

**Spacing Units:** Use Tailwind spacing of 2, 4, 6, 8, 12, 16, 20, and 24

**Container Structure:**
- Full viewport application: min-h-screen with centered content
- Content containers: max-w-4xl for main quiz area, max-w-2xl for start code entry
- Consistent padding: p-6 to p-8 for main containers, p-4 for cards
- Gap spacing: gap-4 for form elements, gap-6 for section separation

**Grid Systems:**
- Question navigation grid: 5-6 columns on desktop (grid-cols-5 lg:grid-cols-6)
- Multiple choice options: Single column stack with full-width buttons
- Responsive: All grids collapse to 1-2 columns on mobile

## Component Library

### Start Code Input
- Six individual input boxes in a horizontal row
- Each box: Large square (w-12 h-12 to w-16 h-16), centered single digit
- Rounded corners (rounded-lg), visible borders
- Auto-focus progression between boxes
- Clear visual feedback for active/filled states

### Buttons
**Primary Button (Start Test, Submit):**
- Solid background, rounded-lg, px-8 py-3
- Medium font weight, clear hover state (slight scale or opacity change)
- Icon support (Heroicons) for return/navigation buttons

**Secondary/Outline Buttons:**
- Border style, transparent background
- Same sizing as primary

**Question Grid Buttons:**
- Compact squares (w-10 h-10 to w-12 h-12)
- Three states: unanswered, answered, for review
- Clear numerical labels

### Quiz Question Container
- Clean card design with subtle border or shadow
- Question number and text at top
- Answer options as full-width button-style selections
- Navigation controls at bottom (Previous/Next, Mark for Review)
- Generous padding (p-6 to p-8)

### Navigation Grid Panel
- Fixed or sticky position for easy access
- Grid of question numbers showing status
- Visual legend explaining status indicators
- Compact, scannable layout

### Timer/Break Page
- Large, prominent countdown display (text-4xl to text-5xl)
- Clear instruction text
- Resume/Continue button centered below

### Summary/Check Work Page
- Overview statistics (Questions Answered, Marked for Review, Unanswered)
- Question-by-question status list or grid
- Submit test button prominent at bottom

## Icons
Use **Heroicons** (outline variant) via CDN for:
- Return/Back arrows
- Help/Question mark
- Check marks for completed questions
- Clock for timer
- Grid view toggle

## Accessibility Requirements
- All input fields have proper labels (even if visually hidden)
- Keyboard navigation fully supported (Tab through inputs, arrow keys in grid)
- Focus states clearly visible with outline rings
- Color not sole indicator of state (use icons + text)
- Sufficient contrast ratios for all text

## Page-Specific Layouts

### Start Code Entry Page
- Vertically centered content in viewport
- Logo/Title at top
- Six-digit input grid center focus
- Help button positioned top-right or bottom-right
- Start Test button below inputs (disabled until all 6 digits entered)

### Quiz Page
- Header: Question navigation grid + timer
- Main: Question card centered
- Footer: Navigation controls
- Sidebar or collapsible panel for question overview

### Break Page
- Centered countdown timer
- Testing rules in readable text block below
- Single prominent Resume button

### Summary Page
- Statistics cards at top (3-column grid on desktop)
- Question status list/grid below
- Final Submit button at bottom with confirmation modal

## Animations
**Minimal animations only:**
- Smooth transitions between questions (fade or slide, 200-300ms)
- Button hover states (scale 1.02 or opacity change)
- Input focus rings (subtle glow)
- NO distracting scroll animations or complex transitions

## Mobile Responsiveness
- Question grids collapse to 3-4 columns on mobile
- Navigation becomes bottom sheet or hamburger menu
- Maintain fullscreen capability across devices
- Touch-friendly button sizes (minimum 44x44px)

## Images
**No hero images required.** This is a functional testing application.

**Optional small graphics:**
- Help/instruction illustrations (simple, icon-style)
- Success/completion checkmark graphics
- These should be minimal, supportive elements only