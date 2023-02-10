// @ts-nocheck
import { ethers, network } from "hardhat"
import fs from "fs"



const FRONTEND_ADDRESSES_FILE = "../shamm/constants/contractAddresses.json"
const FRONTEND_ABI_FILE = "../shamm/constants/abi.json"

module.exports = async function (){
    if(process.env.UPDATE_FRONTEND){
        console.log("updating frontend...")
        updateContractAddresses()
        updateAbi()
    }
}

async function updateAbi(){
    // const campaign = await ethers.getContract("Campaign")
    // fs.writeFileSync(FRONTEND_ABI_FILE, campaign.interface.format(ethers.utils.FormatTypes.json))

    const campaign = await ethers.getContract("Campaign")
    const governanceToken = await ethers.getContract("GovernanceToken")
    const timelock = await ethers.getContract("TimeLock")
    const governorCont = await ethers.getContract("GovernorContract")
    const currentAbis = JSON.parse(fs.readFileSync(FRONTEND_ABI_FILE, "utf-8"))
    const chainId = network.config.chainId?.toString();

    if(chainId in currentAbis){
        
        if(!(currentAbis[chainId][1].includes(campaign.interface.format(ethers.utils.FormatTypes.json)) && currentAbis[chainId][2].includes(governanceToken.interface.format(ethers.utils.FormatTypes.json)) && currentAbis[chainId][3].includes(timelock.interface.format(ethers.utils.FormatTypes.json)) && currentAbis[chainId][4].includes(governorCont.interface.format(ethers.utils.FormatTypes.json)))){
            currentAbis[chainId][1].push(campaign.interface.format(ethers.utils.FormatTypes.json))
            currentAbis[chainId][2].push(governanceToken.interface.format(ethers.utils.FormatTypes.json))
            currentAbis[chainId][3].push(timelock.interface.format(ethers.utils.FormatTypes.json))
            currentAbis[chainId][4].push(governorCont.interface.format(ethers.utils.FormatTypes.json))
        }

    }{
        currentAbis[chainId][1] = [campaign.interface.format(ethers.utils.FormatTypes.json)]
        currentAbis[chainId][2] = [governanceToken.interface.format(ethers.utils.FormatTypes.json)]
        currentAbis[chainId][3] = [timelock.interface.format(ethers.utils.FormatTypes.json)]
        currentAbis[chainId][4] = [governorCont.interface.format(ethers.utils.FormatTypes.json)]
    }

    fs.writeFileSync(FRONTEND_ABI_FILE, JSON.stringify(currentAbis))
}

async function updateContractAddresses() {

    
    const campaign = await ethers.getContract("Campaign")
    const governanceToken = await ethers.getContract("GovernanceToken")
    const timelock = await ethers.getContract("TimeLock")
    const governorCont = await ethers.getContract("GovernorContract")
    const currentAddresses = JSON.parse(fs.readFileSync(FRONTEND_ADDRESSES_FILE, "utf-8"))
    const chainId = network.config.chainId?.toString();
    
    if(chainId in currentAddresses){
        
        if(!(currentAddresses[chainId][1].includes(campaign.address) && currentAddresses[chainId][2].includes(governanceToken.address) && currentAddresses[chainId][3].includes(timelock.address) && currentAddresses[chainId][4].includes(governorCont.address))){
            currentAddresses[chainId][1].push(campaign.address)
            currentAddresses[chainId][2].push(governanceToken.address)
            currentAddresses[chainId][3].push(timelock.address)
            currentAddresses[chainId][4].push(governorCont.address)
        }

    }{
        currentAddresses[chainId][1] = [campaign.address]
        currentAddresses[chainId][2] = [governanceToken.address]
        currentAddresses[chainId][3] = [timelock.address]
        currentAddresses[chainId][4] = [governorCont.address]
    }

    fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(currentAddresses))
}

module.exports.tags = ["all", "update-FE"]