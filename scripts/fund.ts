// @ts-ignore
import { ethers, getNamedAccounts } from "hardhat"

async function main() {

  // @ts-ignore
  const { deployer } = await getNamedAccounts()
  const campaign = await ethers.getContract("Campaign", deployer);
  console.log(`Got contract campaign at ${campaign.address}`);
  const balance = await campaign.getBalance();
  console.log(`balance is ${balance}`);
  console.log("Funding contract...");
  const transactionResponse = await campaign.acceptFunding({
    value: ethers.utils.parseEther("0.1"),
  });
  await transactionResponse.wait();
  console.log("Funded!");
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })