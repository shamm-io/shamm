// @ts-ignore
import { ethers, network } from "hardhat"
import {
  developmentChains,
  VOTING_DELAY,
  proposalsFile,
  FUNC,
  PROPOSAL_DESCRIPTION,
} from "../helper-hardhat-config"
import * as fs from "fs"
import { moveBlocks } from "../utils/move-blocks"
 
export async function propose(args: any[], functionToCall: string, proposalDescription: string) {
  const governor = await ethers.getContract("GovernorContract")
  const campaign = await ethers.getContract("Campaign")
  // const gg = await ethers.utils.getAddress(governor.getCampOwner())
  // console.log(typeof args)
  // const arg = [gg]
  const encodedFunctionCall = campaign.interface.encodeFunctionData(functionToCall, args)
  console.log(`Proposing ${functionToCall} on ${campaign.address} with ${args}`)
  console.log(`Proposal Description:\n  ${proposalDescription}`)
  const proposeTx = await governor.propose(
    [campaign.address],
    [0],
    [encodedFunctionCall],
    proposalDescription
  )
  // If working on a development chain, we will push forward till we get to the voting period.
  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1)
  }
  const proposeReceipt = await proposeTx.wait(1)
  const proposalId = proposeReceipt.events[0].args.proposalId
  console.log(`Proposed with proposal ID:\n  ${proposalId}`)

  const proposalState = await governor.state(proposalId)
  const proposalSnapShot = await governor.proposalSnapshot(proposalId)
  const proposalDeadline = await governor.proposalDeadline(proposalId)
  // save the proposalId
  storeProposalId(proposalId);

  // The state of the proposal. 1 is not passed. 0 is passed.
  console.log(`Current Proposal State: ${proposalState}`)
  // What block # the proposal was snapshot
  console.log(`Current Proposal Snapshot: ${proposalSnapShot}`)
  // The block number the proposal voting expires
  console.log(`Current Proposal Deadline: ${proposalDeadline}`)
}

function storeProposalId(proposalId: any) {
  const chainId = network.config.chainId!.toString();
  let proposals:any;

  if (fs.existsSync(proposalsFile)) {
      proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
  } else {
      proposals = { };
      proposals[chainId] = [];
  }   
  proposals[chainId].push(proposalId.toString());
  fs.writeFileSync(proposalsFile, JSON.stringify(proposals), "utf8");
}

propose([],FUNC, PROPOSAL_DESCRIPTION)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })