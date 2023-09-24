const baseUrl = `file://${process.cwd()}`;
const wait = (time) => new Promise((res) => setTimeout(() => res("ok"), time));
jest.setTimeout(60000);

const steps = 10;

const moveSelectTo = async (page, x, y, dX, dY, steps = 10) => {
  await page.mouse.move(x, y);
  await wait(100);
  await page.mouse.down();
  await wait(100);
  await page.mouse.move(dX, dY, { steps });
  await wait(100);
  await page.mouse.up();
  await wait(100);
};

describe("Document Scroll", () => {
  it("the document should be scroll-able", async () => {
    await page.goto(`${baseUrl}/doc-scroll.html`);
    const { docHeight } = await page.evaluate(() => ({
      docHeight: window.innerHeight,
    }));

    const { mouse } = page;
    await mouse.move(50, docHeight - 100);
    await mouse.down();
    await mouse.move(50, docHeight + 150, { steps: 150 });
    await mouse.up();

    const { selected } = await page.evaluate(() => ({
      selected: window.selected,
    }));

    const expected = [
      "item-161",
      "item-177",
      "item-193",
      "item-209",
      "item-225",
      "item-241",
      "item-257",
      "item-273",
      "item-289",
      "item-305",
      "item-321",
      "item-145",
    ];

    expect(selected.sort()).toEqual(expected.sort());
    expect(selected.length).toBeGreaterThan(8);
  });
});
