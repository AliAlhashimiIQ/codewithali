# Phone layout review

Scope: the Arabic homepage on phone widths, including hero, interactive example, services, process, enquiry and sticky contact action. Applied the installed better-layout and better-ui skills. Kept the light-only color scheme and the existing offer and enquiry behavior.

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| Medium | `src/app/globals.css` | The hero occupied about 1201px at 390px width. Stacked actions and a tall illustration pushed the visual story down the page. | Centered introduction, shorter copy and action labels, adjacent actions where they fit, and a compact light browser preview with an inset ad and overlapping message. Hero height is about 873px, a 27% reduction. | Bring the explanation and example closer to the visitor's first view; group each action with its context. |
| Medium | `src/components/conversion-story.css` | A 130px illustration sat beside narrow copy. Four separate cards selected the industry. | Full-width copy and a 220px illustration, with an inset industry selector. Controls retain labels, touch targets and selected-state cues. | Give the demonstration enough visual space without squeezing the Arabic text. |
| Medium | `src/app/page.tsx`, `src/app/globals.css` | Three repetitive service cards and a large dark process section created a long phone page. | Services share an icon column and text edge; the process uses a light vertical timeline. At 390px, these sections decreased from about 1592px/923px to 1256px/596px. | Reduce repeated decoration and make scanning easier while retaining service scope and terms. |
| Low | `src/app/globals.css`, `src/components/conversion-story.css` | Enlarged text could crowd the navigation and industry buttons. | Navigation wraps; the industry grid adapts to rem-based minimum widths. | Allow text growth without overlap or hiding controls. |

## Verification

- Production build, TypeScript, targeted ESLint and `git diff --check` passed.
- Production conversion suite passed: service choice, expanded service scope, audit validation, exact WhatsApp destination/message, four interactive industries, focus return and axe WCAG A/AA scans. Resting contrast scans now await entrance/disclosure animations instead of sampling transitional opacity.
- Motion suite passed: bounded hero replay, interrupted replay, stable layout, reduced-motion changes, keyboard FAQs and no-JavaScript WhatsApp fallback.
- Touch emulation at 390×844 passed: hero example link, clinic selection, selected treatment in preview, edit, service/sector handoff, optional disclosure and WhatsApp navigation. External navigation was intercepted; no message was sent.
- Layout inspected at 320, 360, 390, 430, 760, 768 and 1440px, including a device preference for dark mode. The page remains light, with no horizontal page overflow. Enlarged text was checked at 200% on phone and desktop.
- Actual browser screenshots and a phone recording were captured. Browser emulation is not a physical-device performance test; manual screen-reader speech output and conversion lift were not verified.

Approve for the inspected phone layout and interaction scope. Existing lint findings in unused prototype pages remain outside this work.
