import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { use, useEffect, useState } from "react";
import Moralis from "moralis-v1";
import { Fascinate } from "@next/font/google";

export default function AcceptFunding() {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
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
  const campaignAbi = obj;
  const [contributorAddr, setcontributorAddr] = useState("0");

  const [disable, setDisable] = useState(true);

  const {
    runContractFunction: acceptFunding,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract();

  const { runContractFunction: addCont } = useWeb3Contract();

  async function _acceptFunding() {
    const options = {
      abi: campaignAbi,
      contractAddress: campaignAddress,
      functionName: "acceptFunding",
      params: { contributor: contributorAddr },
    };

    const options1 = {
      abi: governorAbi,
      contractAddress: governorAddress,
      functionName: "addCont",
      params: { contributor: contributorAddr },
    };

    const accept = await acceptFunding({
      params: options,
      onSuccess: handleSuccess,
      onError: (error) => console.log(error),
    });

    console.log(accept);

    await addCont({
      params: options1,
      onSuccess: handleSuccess,
      onError: (error) => console.log(error),
    });
  }

  const handleChange = (event) => {
    // Get input value from "event"
    setcontributorAddr(event.target.value);
    console.log(event.target.value, "event value");
    // if (event.target.value.length == 0 || parseFloat(event.target.value) <= 0) {
    //   setDisable(true);
    // } else {
    //   setDisable(false);
    // }
  };

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
    } catch (error) {
      console.log(error);
    }
  };

  // function setAmountVal() {
  //   let gg = document.getElementById("fundAmount").value;
  //   setAmount(gg.toString());
  //   console.log(`before ${fundAmount}`);
  // }

  return (
    <div className="container mx-auto px-4">
      {campaignAddress ? (
        <div>
          <form>
            <label htmlFor="fname">Enter amount</label>
            <br />
            <input
              className="bg-white py-2 px-4 border-2"
              type="text"
              id="fundAmount"
              placeholder="Min 0.1"
              onChange={handleChange}
            />
          </form>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-auto rounded my-2 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={async function () {
              //   setAmountVal();
              await _acceptFunding();
            }}
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              "Accept Funding"
            )}
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
