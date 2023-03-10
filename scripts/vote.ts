import * as fs from "fs"
// @ts-ignore
import { HardhatRuntimeEnvironment } from "hardhat/types"
import '@nomiclabs/hardhat-ethers'
import { network, ethers, hardhatArguments } from "hardhat"
import hre from 'hardhat'
import { proposalsFile, developmentChains, VOTING_PERIOD, VOTEWAY, RESAON } from "../helper-hardhat-config"
import { moveBlocks } from "../utils/move-blocks"


async function voteMain(voteWay: number, reason: string) {
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
  // Get the last proposal for the network. You could also change it for your index
  const proposalId = proposals[network.config.chainId!].at(-1);
  console.log(`proposal ID is ${proposalId}`)
  // 0 = Against, 1 = For, 2 = Abstain for this example
  await vote(proposalId, voteWay, reason)
}

// 0 = Against, 1 = For, 2 = Abstain for this example
export async function vote(proposalId: string, voteWay: number, reason: string) {
  console.log("Voting...")
  const governor = await ethers.getContract("GovernorContract")
  const [owner, addr1, addr2] = await ethers.getSigners();
  
  // const voteTx = await governor.connect(addr1).castVoteWithReason(proposalId, voteWay, reason)
  const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason)
  const voteTxReceipt = await voteTx.wait(1)
  console.log(voteTxReceipt.events[0].args.reason)
  const proposalState = await governor.state(proposalId)
  console.log(`Current Proposal State: ${proposalState}`)
  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_PERIOD + 1)
  }
  
}

voteMain(VOTEWAY, RESAON)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })