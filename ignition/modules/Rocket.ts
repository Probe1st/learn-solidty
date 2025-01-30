import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RocketModule = buildModule("Rocket", (m) => {
    const RocketContract = m.contract("Rocket", ['Saturn V']);

    m.call(RocketContract, 'launch', []);

    return { RocketContract };
});

export default RocketModule;
