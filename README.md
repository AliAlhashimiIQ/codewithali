# CodeWithAli

Arabic, right-to-left marketing site for Ali's landing-page, business-website and website-repair services. Built with Next.js 16.4.2, React 19.3, TypeScript and Framer Motion.

The main page includes service scope, interactive examples for four industries, project terms, FAQs and a WhatsApp enquiry composer. Examples are fictional demonstrations, not client results. No message is sent automatically.

## Development

Validated with Node.js 24.19.0 and npm 11.9.0.

```bash
npm ci
npm run dev
```

Use `localhost` for local development. This Next.js version blocks HMR requests from unconfigured development origins such as `127.0.0.1`; a page can render without becoming interactive. Use the documented `allowedDevOrigins` setting if another development host is needed.

```bash
npm run build
npm run start
```

The production build includes TypeScript checks. Arabic and Latin font subsets are served from `public/fonts`; their OFL licenses are included. They were sourced from the Fontsource packages `@fontsource/ibm-plex-sans-arabic@5.3.0` and `@fontsource/noto-kufi-arabic@5.3.0`.

## Conversion checks

With a server running:

```bash
npm run test:conversion
# Against production on another port:
TEST_URL=http://127.0.0.1:3001 npm run test:conversion
```

The script uses `/usr/bin/chromium` when available. Otherwise install Playwright Chromium with `npx playwright install chromium`, or set `CHROMIUM_PATH` to your browser. It verifies service selections, free-review intent, validation, WhatsApp payload, keyboard entry, four interactive sectors, narrow and short viewports, light/dark themes, reduced motion and axe accessibility checks. WhatsApp navigation is intercepted; no message or remote enquiry is sent.

`npm run lint` still reports pre-existing issues in the unused `landing-page.tsx`, `landing-page-light.tsx` and `readme-version.tsx` prototypes. The updated live-page files and verification script pass targeted lint.

## Measuring enquiries

The page emits a local `codewithali:conversion` CustomEvent with only `event` and `source`:

- `enquiry_start`: a service, enquiry intent or call to action is selected.
- `whatsapp_click`: a valid enquiry opens WhatsApp.

These are integration hooks, not a deployed analytics service. Connect an approved analytics provider to receive them. Do not attach visitor-entered URLs or messages to analytics events. Deduplicate enquiry starts per session in reporting; intent can change more than once.

A WhatsApp click is not a confirmed enquiry, booking or sale. Compare click-throughs with actual conversations and qualified leads before making conversion claims. No Meta Pixel/CAPI credentials, ad-account connection or lead-verification backend is configured.

See [the conversion and interface review](docs/conversion-review.md) for changes, evidence and remaining limits.

## Motion

The hero plays one three-second ad → page → conversation illustration as it enters the viewport. “أعد المشهد” replays it. Service cards and section headings reveal once; button feedback and native FAQ transitions remain brief. There are no new dependencies, scroll locks or continuous decorative loops.

`npm run test:motion` checks replay interruptions, completed/static states, layout stability, live reduced-motion changes, no-JavaScript fallback and keyboard FAQ behavior. Use the same `TEST_URL` and `CHROMIUM_PATH` settings as the conversion checks. See [motion review](docs/motion-review.md).
