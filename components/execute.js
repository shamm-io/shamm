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
} from "../helpers/helper";

import { ethers } from "ethers";
// import { moveBlocks } from "../../shamm_2/utils/move-blocks";

export default function Execute() {
  const { chainId: chainIdHex } = useMoralis();

  const chainId = parseInt(chainIdHex);
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
    runContractFunction: execute,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract();

  const campaign = useContract({
    address: campaignAddress,
    abi: campaignAbi,
  });

  async function _execute(args, functionToCall, proposalDescription) {
    const encodedFunctionCall = campaign.interface.encodeFunctionData(
      functionToCall,
      args
    );
    console.log(encodedFunctionCall);
    const descriptionHash = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(proposalDescription)
    );

    const options = {
      abi: governorAbi,
      contractAddress: governorAddress,
      functionName: "execute",
      params: {
        targets: [campaignAddress],
        values: [0],
        calldatas: [encodedFunctionCall],
        descriptionHash: descriptionHash,
      },
    };

    console.log("Executing...");

    const executeTx = await execute({
      params: options,
      onSuccess: handleSuccess,
      onError: (error) => console.log(error),
    });

    console.log(executeTx);

    // If working on a development chain, we will push forward till we get to the voting period.
    // if (developmentChains1.includes(31337)) {
    //   await moveBlocks(VOTING_DELAY + 1);
    // }
  }

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      console.log("Executed successfully!");
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
              await _execute([], FUNC, PROPOSAL_DESCRIPTION);
            }}
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              "Execute"
            )}
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
