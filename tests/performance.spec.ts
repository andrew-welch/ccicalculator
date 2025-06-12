const { test, expect } = require("@playwright/test")

test("has the correct title", async ({ page }) => {
  await page.goto("http://localhost:3000")

  // evaluate the largest contentful paint
  const largestContentfulPaint = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((l) => {
        const entries = l.getEntries()
        // the last entry is the largest contentful paint
        const largestPaintEntry = entries.at(-1)
        resolve(largestPaintEntry.startTime)
      }).observe({
        type: "largest-contentful-paint",
        buffered: true,
      })
    })
  })

  console.log(parseFloat(largestContentfulPaint))

  await expect(page).toHaveTitle('CCI Calculator')
})