import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import {
  networkConfig,
  developmentChains,
  INTERVAL
} from "../helper-hardhat-config"

const deployCampaign: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()

  // const chainId = network.config.chainId;
   let ethUsdPriceFeedAddress;
  
  log("----------------------------------------------------")
  log("Deploying Campaign and waiting for confirmations...")
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address; 
  } else {
    ethUsdPriceFeedAddress = networkConfig[network.name]["ethUsdPriceFeed"];  
  }
  const campaign = await deploy("Campaign", {
    from: deployer,
    args: [ethUsdPriceFeedAddress, INTERVAL], 
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`Campaign at ${campaign.address}`)

  const args = [ethUsdPriceFeedAddress, INTERVAL]
  
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(campaign.address, args)
  }

  // const campaignContract = await ethers.getContractAt("Campaign", campaign.address)
  // const timeLock = await ethers.getContract("TimeLock")
  // const transferTx = await campaignContract.transferOwnership(timeLock.address)
  // await transferTx.wait(1)
}

export default deployCampaign
deployCampaign.tags = ["all", "campaign"]