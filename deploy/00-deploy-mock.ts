import { HardhatRuntimeEnvironment } from "hardhat/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { DeployFunction } from "hardhat-deploy/types"
import '@nomiclabs/hardhat-ethers' 


const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;

const deployMockV3Aggregator: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId;

  if (developmentChains.includes(network.name)) {
    console.log("local net detected, deploying mocks...");
    await deploy("MockV3Aggregator", {
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    });

    log("Mocks deployed");
    log("--------------------------------------------------");
  }
};
export default deployMockV3Aggregator
deployMockV3Aggregator.tags = ["all", "mocks"]
