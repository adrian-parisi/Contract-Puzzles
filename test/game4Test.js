const { assert } = require("chai");

describe("Game4", function () {
  it("should be a winner", async function () {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    const address = await ethers.provider.getSigner(0).getAddress();
    await game.write(address);
    await game.win(address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
