# CodeWithAli conversion and interface review

## Scope and coverage

Reviewed and improved the active `/` landing page from first impression through service selection, free review, interactive industry examples and the WhatsApp handoff. Next.js 16.4.2, React 19.3, TypeScript, existing CSS tokens and Framer Motion. Read `AGENTS.md`, `README.md` and the installed Jakub Krehel `better-*` skills. No separate design-system document was found.

The strategy comes from the conversation **تجهيز خدمات وأسعار المواقع**: clinics, stores, property businesses and companies running ads; three scoped services; written terms; 50/50 payment; customer-owned accounts; bounded revisions and support. Suggested internal pricing stays private and is not published as an agreed price.

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | `page.tsx`, demo controls, labels, skip link, validation focus, axe scans in five viewport/theme/motion combinations | Implemented fixes; tested states pass automated checks. Manual screen-reader testing not performed. |
| Layout | Desktop/mobile screenshots; 1440, 390, 320 and 720px viewports; short-screen demo | Main enquiry remains usable; narrow and short-screen fallback verified. |
| Writing | Hero, service scope, FAQs, free review, composer and actual outgoing message | Unsupported claims removed; offer and handoff agree. |
| Typography | Local fonts, heading/body hierarchy, Arabic RTL and mixed-direction URL input | Original Arabic families retained and self-hosted; readable rendered states inspected. |
| Colors | Light/dark rendered axe scans, including demo selections and opened disclosures | Contrast failures in demo labels corrected. |
| UI | Hero, service selection, example state changes, reduced motion, enquiry and message preview | Updated visual hierarchy; native form controls; immediate feedback without artificial typing. |

Boundary: legacy `index.html`, `public/index.html`, `landing-page.tsx`, `landing-page-light.tsx` and `readme-version.tsx` are not the active App Router homepage and were not redesigned. External WhatsApp behavior after navigation, real ad traffic, actual enquiries and paid conversions were not tested.

## Findings and implemented fixes

Locations below refer to the resulting implementation. “Before” records the original behavior inspected.

| Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| HIGH | Writing | `src/app/page.tsx:216` | Hard-coded 0.9/5.2-second race, 92/34 PageSpeed scores and a calculator asserting 50% waste and 40% recovery | Replaced with a clearly illustrative ad → page → enquiry visual; retained fictional interactive examples | Simulated values presented as financial/performance evidence mislead visitors. |
| HIGH | Writing | `src/app/page.tsx:152` | “Free audit” CTA led to a default paid landing-page enquiry | Separate audit intent, required website, explicit review request and matching preview | A promised action must match the message the visitor sends. |
| HIGH | Accessibility | `src/components/conversion-story.css:873` | Faded scene and stage numbers measured at 2.17:1 and 2.83:1; eyebrow number at 2.96:1 | Removed text opacity; rechecked rendered light/dark pairs | Failing labels violated applicable WCAG 1.4.3 thresholds. |
| HIGH | Accessibility | `src/app/page.tsx:527` | Custom package radios lacked native arrow-key behavior; helper tried to focus a nonexistent `url` ID | Native select and radios, bound labels, inline validation with real input ref | Predictable keyboard interaction and focus recovery. |
| MEDIUM | Writing | `src/app/page.tsx:24`, `src/app/page.tsx:73` | Automatic bilingual/CAPI promises, short delivery promises and “most requested” badge lacked supporting scope | Explicit inclusions/exclusions, one language, written delivery agreement, terms and ownership FAQs | Aligns expectations with the service plan and removes unsupported social proof. |
| MEDIUM | Layout | `src/components/conversion-story.tsx:16`, `src/components/conversion-story.css:876` | A fixed sticky story and mobile track height persisted on constrained/reduced-motion layouts | Direct interactive layout for short/narrow screens; auto track height | Keeps the demo and its controls reachable without a long empty scroll area. |
| MEDIUM | UI | `src/app/page.tsx:216`, `src/app/globals.css` | Technical simulations dominated the offer; multiple continuous animation loops | Clear service-led hero, deliberate green/cream surfaces, short entrance animation and retained controllable example | Makes the next action visible while preserving the site's interactive character. |
| MEDIUM | Typography | `src/app/fonts.css:1`, `src/app/layout.tsx` | Browser fetched Arabic fonts from Google | Local licensed WOFF2 subsets, `font-display: swap`, no external font request | Consistent typography in this environment and one fewer third-party dependency. |

## Verification

- `npm run build`: passed, including TypeScript and static generation.
- `npm run test:conversion`: passed against development; final validation also run against production with `TEST_URL=http://127.0.0.1:3001`.
- Three service links: selected service survives the jump to the enquiry and appears in its message.
- Audit flow: missing/invalid URLs show recovery instructions and focus the field; valid request preserves Arabic details and opens the verified WhatsApp number with the exact preview text. Navigation intercepted before contacting WhatsApp.
- Four industry examples: select sector and option, show generated message, return to editing.
- Browser checks: 1440×1000 light; 390×844 light; 320×800 reduced motion; 390×844 dark/reduced motion; 720×500 reduced motion. No horizontal page overflow or page runtime errors in these checks.
- Axe WCAG A/AA scans with FAQ and optional form fields opened: passed in those five combinations. This is automated coverage, not a full accessibility certification.
- Keyboard entry through skip link and error focus: checked. Full assistive-technology speech output and actual browser text zoom remain **Not verified**; the 720px view exercises a narrower layout, not a claim of full zoom testing.
- Targeted ESLint on changed live TSX files and the verification script: passed.
- Repository-wide `npm run lint`: still fails on 8 pre-existing errors and 22 warnings in unused prototype components. These are outside the active page redesign.
- `git diff --check`: passed.

## Conversion measurement and next evidence

A good interface cannot establish a conversion lift without live traffic. The site now emits `codewithali:conversion` events for enquiry starts and WhatsApp clicks, with no visitor-entered data. No analytics provider is connected by this change. Connect the events to an approved analytics service and compare landing-page visits, WhatsApp clicks, received conversations, qualified leads and projects won. Keep clicks distinct from messages actually sent.

Use genuine, approved project screenshots and client outcomes for future proof. No testimonials, customer counts, scarcity claims or performance results were invented. Keep the current page as a baseline, test one offer/CTA change at a time, and compare equivalent traffic sources. Deployment and real-world conversion performance remain unverified.

## Verdict

**Approve for the reviewed homepage scope:** no confirmed HIGH interface findings remain in the tested states. This verdict excludes the legacy prototypes and does not claim manual screen-reader, real-device, live-traffic or conversion-rate validation. Changes are prepared locally; no production website was published.
