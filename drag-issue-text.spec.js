const baseUrl = `file://${process.cwd()}`;
const wait = (time) => new Promise((res) => setTimeout(() => res("ok"), time));
jest.setTimeout(60000);

const moveSelect = async (page, x, y, distance = 200) => {
  const mouse = page.mouse;
  await mouse.move(x, y);
  await wait(100);
  await mouse.down();
  await wait(100);
  await mouse.move(x + distance, y + distance, { steps: 10 });
  await wait(100);
  await mouse.up();
  await wait(100);
};

describe("Drag Issue With Text", () => {
  it("When dragging twice over text, puppeteer breaks", async () => {
    await page.goto(`${baseUrl}/drag-issue-text.html`);
    await moveSelect(page, 3, 3, 500);
    await moveSelect(page, 3, 3, 500);
    const { callbacks } = await page.evaluate(() => ({ callbacks }));
    console.log(callbacks);
    await wait(10000);
    expect(callbacks[0]).toMatchObject(callbacks[1]);
  });
});
