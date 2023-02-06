// @ts-ignore
import { ethers, getNamedAccounts } from "hardhat"
import {ETHAMOUNT} from "../helper-hardhat-config"

async function fund(ethAmount: string) { 
  const [owner, addr1, addr2] = await ethers.getSigners();
  // @ts-ignore
  const { deployer } = await getNamedAccounts()
  const campaign = await ethers.getContract("Campaign", deployer);
  console.log(`Got contract campaign at ${campaign.address}`);
  const governortoken = await ethers.getContract("GovernanceToken", deployer);
  console.log(`Got contract governortoken at ${governortoken.address}`);
  const balance = await campaign.getBalance();
  console.log(`balance is ${balance}`);
  console.log("Funding contract...");
  // const transactionResponse = await campaign.connect(addr1).acceptFunding({
  //   value: ethers.utils.parseEther(ethAmount),
  // });
  const transactionResponse = await campaign.requestFunding({
    value: ethers.utils.parseEther(ethAmount),
  });
  await transactionResponse.wait();
  // if(transactionResponse == true){
  //   const tx = await governortoken._transfer(5);
  // }
  
  const governor = await ethers.getContract("GovernorContract", deployer);
  // const transactionResponse1 = await governor.connect(addr1).addCont();
  const transactionResponse1 = await governor.addCont();
  await transactionResponse1.wait();
  console.log("Funded!");
}


fund(ETHAMOUNT)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })