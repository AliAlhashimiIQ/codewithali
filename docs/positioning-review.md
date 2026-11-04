# Business positioning review

## Scope and coverage

The live Arabic homepage now positions CodeWithAli around business automation, AI agents and receptionists, and custom business systems for businesses in Iraq. Websites and landing pages are a supporting service. The established Iraqi Arabic voice remains.

Inspected the homepage, its hero and four-sector interactive example, service disclosures, implementation steps, FAQs, enquiry composer, footer and server-rendered metadata. There are no additional live service routes or CMS strings. Unused prototype components and historical review documents are outside this content migration.

Stack: Next.js 16.4.2, React, TypeScript, existing CSS tokens and Framer Motion/WAAPI. Read `AGENTS.md`, the relevant installed Next.js documentation, and the installed `better-writing`, `better-interface`, accessibility, layout, typography, colors and UI skills. Existing project conventions are documented in README and the earlier motion, clarity and mobile reviews.

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Writing | All live copy, example data, accessible labels, validation messages, generated enquiries and metadata | Updated to the new offer; no outstanding content findings |
| Accessibility | Existing conversion and motion checks: keyboard service disclosures, focus recovery, demo states, form errors, no-JavaScript fallback and axe scans | Passed within automated/browser coverage; manual screen-reader speech not verified |
| Layout | Production Chromium at 320, 390, 430, 720, 768 and 1440px; 200% text at 390 and 1440px | No horizontal overflow; new content fits the existing structure |
| Typography | Rendered Arabic headlines, cards, labels and summaries on phone and desktop; expanded text | No new clipping found; fonts and type scale unchanged |
| Colors | Production axe contrast checks with light and dark device preferences; computed light-only color scheme | Passed scans; palette and theme rules unchanged |
| UI and motion | Hero replay/interruption, bounded completion, reduced-motion changes, direct anchors, all four interactive sectors | Passed existing motion suite; animation code, timings and artwork unchanged |

## Findings resolved

| Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| Medium | Writing | `src/app/page.tsx:234`, navigation, enquiry and footer | Site-building was the central promise and enquiry language | “نبني أنظمة. تخلّي شغلك أذكى.”, Iraqi business audience, operational problems and “نحچي عن شغلك” | The first impression and contact path now describe the requested business offer |
| Medium | Writing | `src/app/page.tsx:24` | Landing page, business website and repair packages | AI agents/receptionists, business automation, custom systems, then websites/landing pages | Services describe customer support, qualification, bookings, reminders, CRM/tool integrations, dashboards and internal applications |
| Medium | Writing | `src/components/hero-journey.tsx:204`, `src/components/conversion-story.tsx:70`, `src/components/conversion-examples.ts:19` | Ad → webpage → visitor message | Enquiry → organized request → staff follow-up, with sector-specific examples | Explains a business workflow without presenting fixed demo text as live AI or deployed client work |
| Medium | Writing | `src/app/page.tsx:90`, implementation steps and website review | Website-only project terms and delivery | Discovery, scope, integration checks, testing, human handoff, operating costs and agreed support | Helps an owner understand implementation and boundaries before discussing a project |
| Medium | Writing | `src/app/layout.tsx:14` | Website-only title and description | Business automation/AI metadata, Iraq targeting, canonical and matching Open Graph/Twitter descriptions | Search and sharing copy now matches the on-page offer |

No outstanding actionable findings within this scope.

## Preservation decisions

- No CSS, fonts, colors, breakpoints, illustration assets, motion controllers or animation parameters changed. No new visual section or dependency was added.
- The existing service card is rendered four times. The unchanged desktop grid places the three core offers first and the supporting website offer on the next row; the existing phone rows continue normally. Service icons reuse the same Lucide library, size and stroke.
- Hero and sector-demo changes are copy/data changes. Their animation sequence, replay, selection, editing and focus behavior remain intact.
- The existing free website review stays available as a supporting service for improving enquiry intake. Its required URL, validation and WhatsApp flow are preserved. The main business enquiry continues to accept visitors without a website.
- Business scope, revisions, payment milestones and support are defined in a written proposal, rather than applying old page-count packages to new automation projects.
- Example businesses remain explicitly fictional. The demo labels state that it is a simulation, not a connected AI system. Summaries do not claim a message was sent, a booking confirmed, stock checked or a real team contacted.
- No clients, testimonials, deployment history, performance statistics, prices or conversion guarantees were invented. AI/integration capabilities are proposed services, not claims of existing installations.

## Verification

Passed against the local production build at `http://127.0.0.1:3001`:

- `npm run build` — production compilation, TypeScript and static rendering.
- `npx eslint src/app/page.tsx src/app/layout.tsx src/components/hero-journey.tsx src/components/conversion-story.tsx src/components/conversion-examples.ts scripts/verify-conversion.mjs` — clean.
- `TEST_URL=http://127.0.0.1:3001 npm run test:conversion` — all four service selections; audit URL validation and error focus; exact WhatsApp payload/destination; all four demos; no overflow, axe findings or browser runtime errors across the suite's five viewport/preference combinations.
- `TEST_URL=http://127.0.0.1:3001 npm run test:motion` — desktop/phone replay and interruption, settled motion, stable hero layout, live reduced-motion changes, keyboard FAQ and no-JavaScript contact fallback.
- Additional Playwright checks — metadata and canonical URL, light-only rendering under a dark device preference, widths 320/390/430/768/1440 and 200% text at 390/1440. Screenshots visually reviewed for headline wrapping, service content and example summaries.
- Touch emulation at 390px — every sector's third option, summary/edit flow, service/sector transfer to the form, business enquiry with an empty optional website field, and exact WhatsApp payload. Navigation was intercepted; no message was sent.
- `git diff --check` and an unchanged-file check for all CSS, motion controller, illustration component and dependency manifests — passed.

Not verified: public deployment at `codewithali.tech`, real-device performance, manual screen-reader speech, or actual business conversion results. Full-repository lint retains the previously documented issues in unused prototypes; targeted changed-file lint passed. No external AI, booking, CRM or messaging integration is deployed by this content update.

## Verdict

Approve for the inspected content transformation and browser checks. Manual screen-reader and live-deployment verification remain outside this review.
