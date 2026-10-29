import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";

const baseURL = process.env.TEST_URL || "http://localhost:3000";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH ||
    (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
  args: ["--no-sandbox"],
});
const errors = [];
try {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    const page = await browser.newPage({ viewport });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      window.motionLayoutShift = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          if (!entry.hadRecentInput) window.motionLayoutShift += entry.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto(baseURL, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const hero = page.locator(".hero-visual");
    await hero.scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () =>
        document.querySelector(".hero-visual").dataset.journeyState ===
        "complete",
    );
    const before = await hero.evaluate((el) => ({
      width: el.offsetWidth,
      height: el.offsetHeight,
    }));
    await page.evaluate(() => {
      window.motionLayoutShift = 0;
    });
    await page.getByRole("button", { name: "أعد المشهد" }).click();
    await page.waitForFunction(() =>
      document
        .querySelector(".hero-visual")
        .getAnimations({ subtree: true })
        .some((a) => a.playState === "running"),
    );
    // Replaying mid-sequence must replace, not accumulate, animation work.
    const initialCount = await hero.evaluate(
      (el) => el.getAnimations({ subtree: true }).length,
    );
    await page.getByRole("button", { name: "أعد المشهد" }).click();
    assert.ok(
      (await hero.evaluate(
        (el) => el.getAnimations({ subtree: true }).length,
      )) <=
        initialCount + 1,
    );
    await page.waitForFunction(
      () =>
        document.querySelector(".hero-visual").dataset.journeyState ===
        "complete",
    );
    assert.equal(
      await hero.evaluate(
        (el) =>
          el
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length,
      ),
      0,
    );
    assert.deepEqual(
      await hero.evaluate((el) => ({
        width: el.offsetWidth,
        height: el.offsetHeight,
      })),
      before,
    );
    assert.ok(
      (await page.evaluate(() => window.motionLayoutShift)) < 0.01,
      "Sequence shifted page layout",
    );
    assert.equal(
      await page
        .locator(".journey-message")
        .evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    await page.getByRole("button", { name: "أعد المشهد" }).click();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(
      () =>
        document.querySelector(".hero-visual").getAnimations({ subtree: true })
          .length === 0,
    );
    assert.equal(
      await page.getByRole("button", { name: "أعد المشهد" }).isVisible(),
      false,
    );
    assert.equal(
      await page
        .locator(".journey-message")
        .evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    await page.locator("#services").scrollIntoViewIfNeeded();
    for (const card of await page.locator(".service-card").all()) {
      assert.equal(
        await card.evaluate((el) => getComputedStyle(el).opacity),
        "1",
      );
    }
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    const question = page.locator("#faq summary").first();
    await question.focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator("#faq details").first().evaluate(el => el.open), true);
    assert.equal(await question.evaluate(el => el === document.activeElement), true);
    await page.keyboard.press("Space");
    assert.equal(await page.locator("#faq details").first().evaluate(el => el.open), false);
    await page.close();
    console.log(
      `PASS ${viewport.width}px: replay, interruption, settles once, no layout shift, live reduced-motion preference and visible services.`,
    );
  }
  const reduced = await browser.newPage({
    viewport: { width: 320, height: 800 },
    reducedMotion: "reduce",
  });
  await reduced.goto(baseURL + "/#book", { waitUntil: "networkidle" });
  assert.equal(
    await reduced
      .locator(".hero-visual")
      .evaluate((el) => el.getAnimations({ subtree: true }).length),
    0,
  );
  const submit = reduced.getByRole("button", {
    name: "افتح رسالتي على واتساب",
  });
  await submit.scrollIntoViewIfNeeded();
  assert.equal(await submit.isVisible(), true);
  await reduced.close();

  const staticPage = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  await staticPage.goto(baseURL, { waitUntil: "networkidle" });
  await staticPage.waitForTimeout(800);
  assert.equal(await staticPage.locator("h1").isVisible(), true);
  assert.equal(
    await staticPage
      .locator(".journey-message")
      .evaluate((el) => getComputedStyle(el).opacity),
    "1",
  );
  assert.equal(
    await staticPage
      .getByRole("link", { name: "افتح واتساب مع علي" })
      .isVisible(),
    true,
  );
  await staticPage.close();
  assert.deepEqual(errors, []);
  console.log(
    "PASS: reduced-motion initial load, direct enquiry anchor, no-JavaScript content and WhatsApp fallback; no runtime errors.",
  );
} finally {
  await browser.close();
}
