// import { proposalsFile } from '../../../constants/proposals.json';
// import {moveBlocks} from 'your-backend-address/utils/move-blocks'
import { useMoralis } from "react-moralis";
import * as fs from "fs";
import type { NextApiRequest, NextApiResponse } from 'next'
// import { VOTING_PERIOD} from '/your-backend-address/helper-hardhat-config'

export default function handler(req: NextApiRequest, res:NextApiResponse) {
  
  let proposals: any;
  //   const { chainId: chainIdHex } = useMoralis();
  //   const chainId = parseInt(chainIdHex);
  
  if (req.method === "GET") {
    
    // res.status(200).json(moveBlocks);
  } else if (req.method === "POST") {
    
    const amount = req.body;
    const newamount = amount;
    console.log(amount);
    // moveBlocks(VOTING_PERIOD + amount);
  }

  // const data = req.body;
  // fs.writeFileSync('../../../proposals.json', JSON.stringify(data), 'utf-8');
  // res.status(201).send(data);
}
