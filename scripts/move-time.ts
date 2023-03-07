import '@nomiclabs/hardhat-ethers'
import { ethers, network } from "hardhat"
import {
  developmentChains,
  VOTING_DELAY,VOTING_PERIOD,
  MIN_DELAY,
  proposalsFile,
  FUNC,
  PROPOSAL_DESCRIPTION,
} from "../helper-hardhat-config"
import * as fs from "fs"
import { moveBlocks } from "../utils/move-blocks"
import {moveTime} from '../utils/move-time'

export async function move(){
    // If working on a development chain, after proposing we will push forward till we get to the voting period.
    // if (developmentChains.includes(network.name)) {
    //     await moveBlocks(VOTING_DELAY + 1)
    //   }

    // If working on a development chain, after voting we will push forward to end the voting period.
    // if (developmentChains.includes(network.name)) {
    // await moveBlocks(VOTING_PERIOD + 1)
    // }

    // If working on a development chain, we will push forward till we get to the end of queueing period.
    // if (developmentChains.includes(network.name)) {
    //     await moveTime(MIN_DELAY + 1)
    //     await moveBlocks(1)
    //   }
}

move()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })