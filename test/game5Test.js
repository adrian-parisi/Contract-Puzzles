const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Game5", function () {
  it("should be a winner", async function () {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    const [signer] = await ethers.getSigners();

    // good luck
    let luckyWallet = null;
    let address = null;
    do {
      luckyWallet = await ethers.Wallet.createRandom().connect(ethers.provider);
      address = await luckyWallet.getAddress();
    } while (!address.startsWith('0x00'));

    // We found our lucky wallet, now send some ethers so that it can execute the contract function.
    await signer.sendTransaction({ value: ethers.utils.parseUnits('10'), to: luckyWallet.getAddress() });
    await game.connect(luckyWallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
