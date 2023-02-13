import { proposalsFile } from '../../../../shamm_2/helper-hardhat-config';
import { useMoralis } from "react-moralis";
import * as fs from "fs";
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res:NextApiResponse) {
  // const proposalsFile = "../../shamm_2/proposals.json";
  //   const { chainId: chainIdHex } = useMoralis();
  //   const chainId = parseInt(chainIdHex);

  if (req.method === "GET") {
    res.status(200).json(proposalsFile);
  } else if (req.method === "POST") {
    var chainId = '31337';
    let proposals: any;
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
}
