import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
const baseURL = process.env.TEST_URL || "http://localhost:3000";

(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROMIUM_PATH ||
      (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(baseURL, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      window.conversionEvents = [];
      window.addEventListener("codewithali:conversion", (event) =>
        window.conversionEvents.push(event.detail),
      );
    });
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .locator(".skip-link")
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.keyboard.press("Enter");
    assert.equal(
      await page
        .locator("#main")
        .evaluate((el) => el === document.activeElement),
      true,
    );
    // Every service must survive navigation into the enquiry and its message.
    for (const card of await page.locator(".service-card").all()) {
      const name = await card.locator("h3").innerText();
      const scope = card.locator("details");
      assert.equal(await scope.evaluate((el) => el.open), false);
      await scope.locator("summary").focus();
      await page.keyboard.press("Enter");
      assert.equal(await scope.evaluate((el) => el.open), true);
      await card.locator(".service-boundary").waitFor({ state: "visible" });
      assert.equal(await card.locator(".service-boundary").isVisible(), true);
      await card.locator("a").click();
      await page.waitForFunction(
        (value) => document.querySelector("#service").value === value,
        name,
      );
      assert.ok(
        (await page.locator(".message-bubble").innerText()).includes(name),
      );
    }
    await page.getByRole("link", { name: "اطلب تدقيق مجاني" }).click();
    assert.equal(await page.locator('input[value="audit"]').isChecked(), true);
    await page.getByRole("button", { name: "افتح رسالتي على واتساب" }).click();
    assert.ok(
      (await page.locator("#website-error").innerText()).includes("أضف رابط"),
    );
    assert.equal(
      await page
        .locator("#website")
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.locator("#website").fill("not a website");
    await page.getByRole("button", { name: "افتح رسالتي على واتساب" }).click();
    assert.ok(
      (await page.locator("#website-error").innerText()).includes(
        "رابط موقع صحيح",
      ),
    );
    await page.locator("#website").fill("example.com");
    await page.locator(".extra-details summary").click();
    await page.locator("#sector").selectOption("عيادة");
    await page.locator("#project-details").fill("أريد أوضّح خدمات العيادة");
    const expected = await page.locator(".message-bubble").innerText();
    const events = await page.evaluate(() => window.conversionEvents);
    assert.ok(events.some((event) => event.event === "enquiry_start"));
    assert.ok(
      events.every(
        (event) => Object.keys(event).sort().join(",") === "event,source",
      ),
    );
    assert.ok(!JSON.stringify(events).includes("example.com"));
    let outgoing;
    // Intercept before navigation: tests must never send a message or contact WhatsApp.
    await page.route("https://wa.me/**", (route) => {
      outgoing = route.request().url();
      return route.fulfill({
        status: 200,
        body: "WhatsApp navigation intercepted",
      });
    });
    await page.getByRole("button", { name: "افتح رسالتي على واتساب" }).click();
    await page.waitForURL("https://wa.me/**");
    const url = new URL(outgoing);
    assert.equal(url.pathname, "/9647700683686");
    assert.equal(url.searchParams.get("text"), expected);
    assert.ok(expected.includes("تدقيق موقعي المجاني"));
    console.log(
      "PASS: three services, audit intent, required/invalid URL, focus recovery, exact WhatsApp message and destination.",
    );

    for (const [width, height, colorScheme, reducedMotion] of [
      [1440, 1000, "light", "no-preference"],
      [390, 844, "light", "no-preference"],
      [320, 800, "light", "reduce"],
      [390, 844, "dark", "reduce"],
      [720, 500, "light", "reduce"],
    ]) {
      const p = await browser.newPage({
        viewport: { width, height },
        colorScheme,
        reducedMotion,
      });
      p.on("pageerror", (error) => errors.push(error.message));
      await p.goto(baseURL, { waitUntil: "networkidle" });
      await p.evaluate(() => document.fonts.ready);
      await p.addScriptTag({
        path: fileURLToPath(import.meta.resolve("axe-core")),
      });
      // Scan resting page plus opened FAQ, optional inputs, and the interactive demo.
      await p
        .locator("#faq details")
        .first()
        .evaluate((el) => {
          el.open = true;
        });
      await p.locator(".extra-details").evaluate((el) => {
        el.open = true;
      });
      await p.locator(".cstory-order").waitFor({ state: "visible" });
      await p.waitForTimeout(500);
      for (const label of ["عيادة", "متجر", "عقارات", "شركة"]) {
        await p
          .locator(".cstory-sectorPicker")
          .getByRole("button", { name: new RegExp(label) })
          .click();
        await p.waitForTimeout(700);
        const choice = p.locator(".cstory-options button").nth(1);
        const choiceText = await choice.innerText();
        await choice.click();
        await p.locator(".cstory-order").click();
        assert.equal(await p.locator(".cstory-message").isVisible(), true);
        assert.ok((await p.locator(".cstory-message > p").innerText()).includes(choiceText));
        assert.equal(await p.locator(".cstory-composition").evaluate(el => el.inert), true);
        const edit = p.getByRole("button", { name: "عدّل الاختيار" });
        await p.waitForFunction(() => document.activeElement === document.querySelector(".cstory-messageBottom button"));
        assert.equal(await edit.evaluate(el => el === document.activeElement), true);
        assert.equal(await p.locator('.cstory-steps li[data-complete="true"]').count(), 3);
        const messageFits = await p.locator(".cstory-message").evaluate(el => {
          const parent = el.parentElement.getBoundingClientRect();
          const rect = el.getBoundingClientRect();
          return rect.width <= parent.width && el.scrollWidth <= el.clientWidth;
        });
        assert.ok(messageFits, `Message overflow at ${width}/${label}`);
        await p.getByRole("button", { name: "عدّل الاختيار" }).click();
        await p.waitForFunction(() => document.activeElement === document.querySelector(".cstory-order"));
        assert.equal(await p.locator(".cstory-order").evaluate(el => el === document.activeElement), true);
      }
      await p.locator(".service-details").first().evaluate(el => { el.open = true; });
      // Measure the resting design, after any newly visible section or native
      // disclosure finishes. Sampling an entrance fade yields transient colors.
      await p.evaluate(async () => {
        await new Promise(requestAnimationFrame);
        await Promise.all(
          document.getAnimations().map(animation => animation.finished.catch(() => {})),
        );
      });
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        `Horizontal overflow at ${width}`,
      );
      const violations = await p.evaluate(async () =>
        (
          await axe.run(document, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
            },
          })
        ).violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      );
      if (violations.length)
        console.log(
          JSON.stringify({ width, colorScheme, violations }, null, 2),
        );
      assert.equal(
        violations.length,
        0,
        `Accessibility findings at ${width}/${colorScheme}`,
      );
      await p.close();
      console.log(
        `PASS: ${width}×${height}, ${colorScheme}, ${reducedMotion}: four demo sectors, message preview, reflow, accessibility scan.`,
      );
    }
    assert.deepEqual(errors, []);
    console.log("PASS: no browser runtime errors.");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
