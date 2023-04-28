// import { proposalsFile } from '../../../constants/proposals.json';
<<<<<<< HEAD
import {moveBlocks} from '/media/ammar/f6fd3fc1-648c-48e5-9742-961001a92010/ammar/Documents/SHAMM/shamm_2/utils/move-blocks'
import { useMoralis } from "react-moralis";
import * as fs from "fs";
import type { NextApiRequest, NextApiResponse } from 'next'
import { VOTING_PERIOD} from '/media/ammar/f6fd3fc1-648c-48e5-9742-961001a92010/ammar/Documents/SHAMM/shamm_2/helper-hardhat-config'
=======
// import {moveBlocks} from 'your-backend-address/utils/move-blocks'
import { useMoralis } from "react-moralis";
import * as fs from "fs";
import type { NextApiRequest, NextApiResponse } from 'next'
// import { VOTING_PERIOD} from 'your-backend-address/helper-hardhat-config'
>>>>>>> d8b2ea5d631549d9a6a21d4d96c32086ea4ac0a0

export default function handler(req: NextApiRequest, res:NextApiResponse) {
  // const moveTime = '/media/ammar/f6fd3fc1-648c-48e5-9742-961001a92010/ammar/Documents/SHAMM/shamm_2/utils';
  let proposals: any;
  //   const { chainId: chainIdHex } = useMoralis();
  //   const chainId = parseInt(chainIdHex);
  
  if (req.method === "GET") {
    
    res.status(200).json("moveBlocks");
  } else if (req.method === "POST") {
    
    // const amount = req.body;
    // const newamount = amount;
    // console.log(amount);
    // moveBlocks(VOTING_PERIOD + amount);
  }

  // const data = req.body;
  // fs.writeFileSync('../../../proposals.json', JSON.stringify(data), 'utf-8');
  // res.status(201).send(data);
}
