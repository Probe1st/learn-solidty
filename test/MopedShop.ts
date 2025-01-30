// import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { assert, expect } from "chai";
import { ethers } from "hardhat";

// async function main() {
//     const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//     const MopedShopContractFactory = await ethers.getContractFactory(
//         "MopedShop",
//     );

//     const MopedShopContract = MopedShopContractFactory.attach(contractAddress);

//     const result = MopedShopContract.getBalance();
//     console.log(result)
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });

describe("MopedShop", function () {
    it("get balance", async function () {
        const shop = await ethers.deployContract("MopedShop");
        expect(await shop.getBalance()).to.equal(0, "balance should be 0");
    });

    it("get buyer with incorrect address", async function () {
        const shop = await ethers.deployContract("MopedShop");

        expect(
            await shop.getBuyer("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"),
        ).to.equal(false, "Address is not a buyer");
    });

    it("add the buyer and the checking him", async function () {
        const shop = await ethers.deployContract("MopedShop");

        await shop.addBuyer("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");

        expect(
            await shop.getBuyer("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"),
        ).to.equal(true, "Address must be the buyer");
    });

    it("Add the buyer. Check the buyer. Pay for the moped. Check balance. Debit money from the contract to the owner's account", async function () {
        const shop = await ethers.deployContract("MopedShop");
        const buyer = await ethers.getSigner(
            "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        );
        const owner = await ethers.getSigner(
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        );

        await shop.addBuyer(
            buyer?.address ?? "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        );

        assert.equal(
            await shop.getBuyer(
                buyer?.address ?? "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
            ),
            true,
            "The user didn't become a buyer",
        );

        assert.equal(
            await shop.getBalance(),
            BigInt(0),
            "The balance should be 0",
        );

        await buyer?.sendTransaction({
            to: await shop.getAddress(),
            value: 2000000000000000000n,
        });

        assert.equal(
            (await shop.getBalance()) == (await shop.price()),
            true,
            "The Balance isn't equal to the price",
        );

        await shop.withDrawAll();

        assert.equal(
            await shop.getBalance(),
            BigInt(0),
            "The Balance should be 0",
        );

        console.log(
            (await ethers.provider.getBalance(owner.address))
        );
        // assert.equal(owner))
    });
});
