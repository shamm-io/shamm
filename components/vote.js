import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import {
  developmentChains1,
  VOTING_DELAY,
  // proposalsFile,
  FUNC,
  PROPOSAL_DESCRIPTION,
} from "../helpers/helper";
import * as fs from "fs";

export default function vote() {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const chainIdStr = chainId.toString();

  var proposals;

  const campaignAddress =
    chainId in contractAddresses ? contractAddresses[chainId][1][0] : null;
  const governorAddress =
    chainId in contractAddresses ? contractAddresses[chainId][4][0] : null;

  try {
    var governorAbi = JSON.parse(abi[chainId][4]);
    var obj = JSON.parse(abi[chainId][1][0]); // Here I am parsing String-Abi into JSON
  } catch (ex) {
    console.error(ex);
  }
  // console.log(obj);

  // const [proposals, setProposals] = useState({});

  const {
    runContractFunction: castVoteWithReason,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract();

  const { runContractFunction: state } = useWeb3Contract();

  async function voteMain(voteWay, reason) {
    await fetchProposals();
    console.log(proposals);
    // const cart = ["apple", "banana", "pear"];
    // const last = cart.at(-1);
    // console.log(last);
    // const proposalss = JSON.parse(proposals[chainId].at(-1).toString());
    // console.log(proposalss);
    // Get the last proposal for the network. You could also change it for your index
    const proposalId = proposals[chainIdStr].at(-1);
    console.log(`proposal ID is ${proposalId}`);

    const options = {
      abi: governorAbi,
      contractAddress: governorAddress,
      functionName: "castVoteWithReason",
      params: {
        proposalId: proposalId,
        support: voteWay,
        reason: reason,
      },
    };
    await castVoteWithReason({
      params: options,
      onSuccess: handleSuccess,
      onError: (error) => console.log(error),
    });

    // await moveBlocks(1);
  }

  const handleSuccess = async (tx) => {
    try {
      const voteTxReceipt = await tx.wait(1);
      console.log(voteTxReceipt.events[0].args.reason);
      console.log(voteTxReceipt.events[0].args.support);
      const options1 = {
        abi: governorAbi,
        contractAddress: governorAddress,
        functionName: "state",
        params: {
          proposalId: proposalId,
        },
      };
      const proposalState = await state({ params: options1 });
      console.log(`Proposal state:\n  ${proposalState}`);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProposals = async () => {
    const response = await fetch("/api/proposals", {
      method: "GET",
    });
    proposals = await response.json();

    console.log(proposals);
  };

  // const moveBlocks = async (amount) => {
  //   const response = await fetch("/api/evm/moveBlocks", {
  //     method: "POST",
  //     body: amount,
  //     headers: { "Content-Type": "text/plain" },
  //   });
  //   const data = await response.text();
  //   console.log(data);
  // };

  return (
    <div className="container mx-auto px-4">
      {campaignAddress ? (
        <div>
          <form>
            {/* <input
              className="bg-white py-2 px-4 border-2"
              type="number"
              id="fundAmount"
              placeholder="Min 0.1"
            /> */}
          </form>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-auto rounded my-2 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={async function () {
              // 0 = Against, 1 = For, 2 = Abstain for this example
              voteMain(1, "xyz");
            }}
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              "Vote"
            )}
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
