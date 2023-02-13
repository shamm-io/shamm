import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import {
  useContract,
  useNetwork,
  useProvider,
  createClient,
  configureChains,
} from "wagmi";
import {
  developmentChains1,
  VOTING_DELAY,
  proposalsFile,
  FUNC,
  PROPOSAL_DESCRIPTION,
} from "../../shamm_2/helper-hardhat-config";
import * as fs from "fs";
// import { moveBlocks } from "../../shamm_2/utils/move-blocks";

export default function Propose() {
  const { chainId: chainIdHex } = useMoralis();
  // const { chain, chains } = useNetwork();
  const chainId = parseInt(chainIdHex);
  // const provider = useProvider({
  //   chainId: chainId,
  // });
  // const client = createClient({
  //   provider,
  //   webSocketProvider,
  // });
  const governorAddress =
    chainId in contractAddresses ? contractAddresses[chainId][4][0] : null;
  const campaignAddress =
    chainId in contractAddresses ? contractAddresses[chainId][1][0] : null;

  try {
    var governorAbi = JSON.parse(abi[chainId][4]); // Here I am parsing String-Abi into JSON
    var campaignAbi = JSON.parse(abi[chainId][1]);
  } catch (ex) {
    console.error(ex);
  }

  const {
    runContractFunction: proposeFunction,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract();

  const campaign = useContract({
    address: campaignAddress,
    abi: campaignAbi,
  });

  async function _propose(args, functionToCall, proposalDescription) {
    // const campaign = ethers.getContract(campaignAddress);

    const encodedFunctionCall = campaign.interface.encodeFunctionData(
      functionToCall,
      args
    );
    console.log(encodedFunctionCall);

    const options = {
      abi: governorAbi,
      contractAddress: governorAddress,
      functionName: "propose",
      params: {
        targets: [campaignAddress],
        values: [0],
        calldatas: [encodedFunctionCall],
        description: proposalDescription,
      },
    };

    console.log(
      `Proposing ${functionToCall} on ${campaign.address} with ${args}`
    );
    console.log(`Proposal Description:\n  ${proposalDescription}`);

    const proposeTx = await proposeFunction({
      params: options,
      onSuccess: handleSuccess,
      onError: (error) => console.log(error),
    });

    console.log(proposeTx);

    // addProposal();

    // If working on a development chain, we will push forward till we get to the voting period.
    // if (developmentChains1.includes(31337)) {
    //   await moveBlocks(VOTING_DELAY + 1);
    // }

    /**@dev calling {storePropsalId} here: */
    // save the proposalId:
    // storeProposalId(proposalId);
  }

  const addProposal = async (proposalId) => {
    const response = await fetch("/api/proposals", {
      method: "POST",
      body: proposalId,
      headers: { "Content-Type": "application/text" },
    });
    const data = await response.json();
    console.log(data);
  };

  // async function moveBlocks(amount) {
  //   console.log("Moving blocks...");
  //   for (let index = 0; index < amount; index++) {
  //     await provider.request({
  //       method: "evm_mine",
  //       params: [],
  //     });
  //   }
  //   console.log(`Moved ${amount} blocks`);
  // }

  /**@dev Defining {storePropsalId} here: */
  // function to store proposalID:
  // function storeProposalId(proposalId) {
  //   // const chainId = network.config.chainId.toString();
  //   let proposals;

  //   if (fs.existsSync(proposalsFile)) {
  // proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
  //   } else {
  //     proposals = {};
  //     proposals[chainId] = [];
  //   }
  //   proposals[chainId].push(proposalId.toString());
  //   fs.writeFileSync(proposalsFile, JSON.stringify(proposals), "utf8");
  // }

  const handleSuccess = async (tx) => {
    try {
      const proposeReciept = await tx.wait(1);
      const proposalId = proposeReciept.events[0].args.proposalId;
      addProposal(proposalId);
      console.log(`Proposed with proposal ID:\n  ${proposalId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {campaignAddress ? (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto my-2"
            onClick={async function () {
              await _propose([], FUNC, PROPOSAL_DESCRIPTION);
            }}
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              "Propose"
            )}
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
