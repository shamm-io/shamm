// @ts-ignore
import { ethers, getNamedAccounts } from "hardhat"
import {ETHAMOUNT} from "../helper-hardhat-config"

async function fund(ethAmount: string) { 

  // @ts-ignore
  const { deployer } = await getNamedAccounts()
  const campaign = await ethers.getContract("Campaign", deployer);
  console.log(`Got contract campaign at ${campaign.address}`);
  const balance = await campaign.getBalance();
  console.log(`balance is ${balance}`);
  console.log("Funding contract...");
  const transactionResponse = await campaign.acceptFunding({
    value: ethers.utils.parseEther(ethAmount),
  });
  await transactionResponse.wait();
  console.log("Funded!");
}


fund(ETHAMOUNT)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })