// @ts-nocheck
import { ethers, network } from "hardhat"
import fs from "fs"



const FRONTEND_ADDRESSES_FILE = "../shamm-fe/constants/contractAddresses.json"
const FRONTEND_ABI_FILE = "../shamm-fe/constants/abi.json"

module.exports = async function (){
    if(process.env.UPDATE_FRONTEND){
        console.log("updating frontend...")
        updateContractAddresses()
        updateAbi()
    }
}

async function updateAbi(){
    const campaign = await ethers.getContract("Campaign")
    fs.writeFileSync(FRONTEND_ABI_FILE, campaign.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {

    
    const campaign = await ethers.getContract("Campaign")
    const currentAddresses = JSON.parse(fs.readFileSync(FRONTEND_ADDRESSES_FILE, "utf-8"))
    const chainId = network.config.chainId?.toString();
    
    if(chainId in currentAddresses){
        
        if(!currentAddresses[chainId].includes(campaign.address)){
            currentAddresses[chainId].push(campaign.address)
        }

    }{
        currentAddresses[chainId] = [campaign.address]
    }

    fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(currentAddresses))
}

module.exports.tags = ["all", "update-FE"]