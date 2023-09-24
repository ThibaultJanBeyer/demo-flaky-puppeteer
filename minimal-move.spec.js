const baseUrl = `file://${process.cwd()}`;
const wait = (time) => new Promise((res) => setTimeout(() => res("ok"), time));
jest.setTimeout(60000);

const steps = 10;

const moveSelect = async (page, x, y, distance = 200) => {
  const mouse = page.mouse;
  await mouse.move(x, y);
  await mouse.down();
  await mouse.move(x + distance, y + distance, { steps });
  await mouse.up();
};

describe("Drag N Drop", () => {
  it("The items should be immediately draggable", async () => {
    await page.goto(`${baseUrl}/minimal-move.html`);
    const { itemVect } = await page.evaluate(() => ({
      itemVect: window.getItemVect("2"),
    }));

    await moveSelect(page, itemVect.x, itemVect.y, 100);

    const { movingIt } = await page.evaluate(() => ({
      movingIt: window.movingIt,
    }));
    expect(movingIt).toEqual(10);
  });

  it("The items should be draggable after selection", async () => {
    await page.goto(`${baseUrl}/minimal-move.html`);

    await moveSelect(page, 1, 1, 500);

    const { movingIt, itemVect3 } = await page.evaluate(() => ({
      itemVect3: window.getItemVect(3),
      movingIt: window.movingIt,
    }));

    expect(movingIt).toEqual(steps);

    await moveSelect(page, itemVect3.x, itemVect3.y, 100);

    const { movingIt2 } = await page.evaluate(() => ({
      movingIt2: window.movingIt,
    }));

    expect(movingIt).toEqual(steps);
    expect(movingIt2).toEqual(steps * 2);
  });
});
