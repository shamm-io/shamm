export interface networkConfigItem {
    ethUsdPriceFeed?: string
    name?: string
    blockConfirmations?: number
  }
  
  export interface networkConfigInfo {
    [key: string]: networkConfigItem
  }
  
  export const networkConfig: networkConfigInfo = {
    // 5: {
    //   name: "goerli",
    //   ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    // },
    localhost: {},
    hardhat: {},
    goerli: {
      blockConfirmations: 6,
      ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e"
    },
  }
  
  export const developmentChains = ["hardhat", "localhost"]
  export const proposalsFile = "proposals.json"
  
  // Governor Values
  export const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
  export const MIN_DELAY = 300 // 1 hour - after a vote passes, you have 1 hour before you can enact
  // export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
  export const VOTING_PERIOD = 5 // blocks
  export const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active
  export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"
  
  export const FUNC = "withdraw"
  export const PROPOSAL_DESCRIPTION = "Proposal #14 withdraw fundsss"
  export const ETHAMOUNT = "0.1"
  export const VOTEWAY = 1
  export const RESAON = "requirements satisfied"
  export const INTERVAL = 120