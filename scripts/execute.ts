// @ts-ignore
import { ethers } from "hardhat"
import {
  FUNC,
  PROPOSAL_DESCRIPTION,
} from "../helper-hardhat-config"

export async function execute(functionToCall: string, args: any[], propsosalDesc: string) {
  const campaign = await ethers.getContract("Campaign")
  const encodedFunctionCall = campaign.interface.encodeFunctionData(functionToCall, args)
  const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(propsosalDesc))
  // could also use ethers.utils.id(PROPOSAL_DESCRIPTION)

  const governor = await ethers.getContract("GovernorContract")

  console.log("Executing...")
  // this will fail on a testnet because you need to wait for the MIN_DELAY!
  const executeTx = await governor.execute(
    [campaign.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  )
  await executeTx.wait(1)
  const balance = await campaign.getBalance();
  console.log(`balance is ${balance}`);
  
}

execute(FUNC, [], PROPOSAL_DESCRIPTION)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })