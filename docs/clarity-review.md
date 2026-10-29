# Homepage clarity and motion refinement

Scope: the live homepage from hero to enquiry, with emphasis on the industry example, service selection and explanatory motion. Applied the installed better-layout, better-writing and better-ui skills and the better-accessibility motion reference. Used the repository's existing typography, color tokens, illustrations and native controls. Repository guidance: AGENTS.md and the installed Next.js client/CSS documentation.

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| Medium | `src/components/conversion-story.tsx`, `conversion-story.css` | A 340svh desktop / 240svh phone scroll sequence moved through interest, clutter and clarity before enabling the example. Small text and multiple playback controls competed with the actual request. | One directly usable example, readable copy and options, three labeled steps, and a message preview with the actual selection. The illustration assembles once for 1.2 seconds. Sector art cross-fades in 150ms; message/check feedback settles within 400ms. | Put the customer's task before secondary presentation. Remove the extra scrolling and wait to interact. |
| Medium | `src/app/page.tsx` | Long service descriptions and all inclusions preceded the interactive demonstration. | Headline names the website service directly. Example precedes services. Scope summaries stay visible; native disclosures contain full inclusions and exclusions. | Explain the benefit, show it, then help the visitor choose. Lower the initial reading load while keeping full scope accessible. |
| Low | `src/components/hero-journey.tsx`, `src/app/motion.css` | Decorative animation lacked a persistent, plain-language overview. | Three numbered labels and coordinated progress lines explain seeing the ad, understanding the offer and starting contact. Removed the small orbit labels. | Every movement has a readable static counterpart. |
| Low | `src/app/globals.css`, `src/components/section-motion.tsx` | Large hero illustration, wrapping phone CTAs and flat process dividers weakened grouping. | More compact illustration, one full-width primary phone action, centered secondary link, and numbered process nodes with one-time connecting-line reveals. | Clearer action hierarchy and consistent group spacing. |

## Verification

- Production build including TypeScript passed; targeted ESLint and `git diff --check` passed.
- Production conversion checks: all service links preserve selection; service scope opens with the keyboard; audit URL validation and recovery work; outgoing WhatsApp number/message match the preview. External WhatsApp navigation is intercepted in tests.
- All four example industries: immediate interaction, selected option in message, inactive underlying controls, focus moved to edit then restored, three completed steps and message containment. Axe WCAG A/AA scans cover the open FAQ, open service disclosure and optional form fields.
- Production motion checks: bounded replay, interrupted replay, layout stability, live reduced-motion preference, complete static content, keyboard FAQs and no-JavaScript direct WhatsApp fallback.
- Browser coverage: 1440×1000, 390×844, 320×800, 720×500, light and dark. Additional layout inspection at 768px and 1024px; 200% root text size at 1440px. No page overflow or clipped message text observed. A rotated disclosure icon extends about 4px into the card's existing padding, with no content clipping.
- Inspected screenshots of desktop and mobile hero, service disclosure, interactive example and message preview; recordings show the actual production browser. No new dependencies or continuous decorative animation loop. Reduced-motion visitors get the complete static illustration and immediate state changes.

Approve for the inspected layout, writing and motion scope. Real-device performance and manual screen-reader speech output were not verified. This work does not establish a conversion lift; actual enquiry data is required for that. Existing lint issues in unused prototype pages are outside this change.
