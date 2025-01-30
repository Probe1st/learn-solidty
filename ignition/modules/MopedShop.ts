// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MopedShopModule = buildModule("MopedShopModule", (m) => {
    const MopedShop = m.contract("MopedShop", []);

    return { MopedShop };
});

export default MopedShopModule;
