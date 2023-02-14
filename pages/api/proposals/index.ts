// import { proposalsFile } from '../../../constants/proposals.json';
import { useMoralis } from "react-moralis";
import * as fs from "fs";
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res:NextApiResponse) {
  const proposalsFile = 'proposals.json';
  let proposals: any;
  //   const { chainId: chainIdHex } = useMoralis();
  //   const chainId = parseInt(chainIdHex);
  
  if (req.method === "GET") {
    proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
    res.status(200).json(proposals);
  } else if (req.method === "POST") {
    var chainId = "31337";
    
    const proposal = req.body;
    const newProposal = proposal;
    console.log(newProposal);
    if (fs.existsSync(proposalsFile)) {
      proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
    } else {
      proposals = { };
      proposals[chainId] = [];
    }
    proposals[chainId].push(newProposal);
    fs.writeFileSync(proposalsFile, JSON.stringify(proposals), "utf8");
    res.status(201).json(newProposal);
  }

  // const data = req.body;
  // fs.writeFileSync('../../../proposals.json', JSON.stringify(data), 'utf-8');
  // res.status(201).send(data);
}
