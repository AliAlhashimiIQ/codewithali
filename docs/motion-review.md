# Motion polish review

This records the first motion pass. The subsequent layout and demo changes are documented in [clarity-review.md](clarity-review.md).

Scope: the existing homepage hero illustration, section entrances, service-card feedback, links and native FAQ disclosures. Used the installed `better-ui` animation, entrance/exit and performance references, and `better-accessibility` motion requirements. The existing layout, offer, WhatsApp logic and themes remain in place.

## Changes

- Hero: one 3.05-second ad → page → message sequence on entering view, with a keyboard-accessible replay button. A cursor and click ring illustrate the CTA; they do not send a message. The sequence settles on the existing static illustration.
- Entrances: semantic groups, 100ms staggering, 300ms easing, 12px movement and 4px blur. Arabic text remains joined. Sections animate once and remain readable if scripts fail.
- Feedback: hover-capable pointers get small icon/arrow movements and card elevation; press feedback uses 0.96 scale. Native FAQ disclosure gets a progressive CSS height/opacity transition where supported.
- Reduced motion: skip automatic motion, cancel active animations immediately when preferences change, and expose the complete static content. Backgrounding or leaving the hero ends the sequence. Keyboard focus cancels a section reveal containing that focus.
- Runtime: native Web Animations API and IntersectionObserver; no new libraries, animation render loops, scroll trapping or persistent compositing layers.

## Verification

- Production build and TypeScript: passed.
- Targeted ESLint on changed TSX and the motion test: passed. Existing unrelated prototype lint issues are unchanged.
- `TEST_URL=http://127.0.0.1:3001 npm run test:motion`: desktop/mobile replay, interrupted replay, resting states, no measured layout shift above 0.01, runtime preference changes, no-JavaScript WhatsApp fallback and keyboard FAQ behavior.
- `TEST_URL=http://127.0.0.1:3001 npm run test:conversion`: existing service/audit/WhatsApp flows and four interactive sectors passed. All five viewport/theme/motion accessibility scans passed with no runtime errors.
- Visual inspection: actual rendered sequence sampled at 500, 1300, 2550 and 3100ms, plus desktop/light and mobile/dark recordings. Real-device frame-rate profiling and manual screen-reader speech output were not performed.

## Verdict

Approve for this motion scope. No actionable UI-polish findings remain in the inspected states. Conversion lift is not established by animation or automated testing; use real enquiry data after deployment.
