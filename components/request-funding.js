import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { use, useEffect, useState } from "react";
import Moralis from "moralis-v1";
import { Fascinate } from "@next/font/google";

export default function RequestFunding() {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const campaignAddress =
    chainId in contractAddresses ? contractAddresses[chainId][1][0] : null;

  try {
    var obj = JSON.parse(abi[chainId][1][0]); // Here I am parsing String-Abi into JSON
  } catch (ex) {
    console.error(ex);
  }
  // console.log(obj);
  const campaignAbi = obj;
  const [fundAmount, setFundAmount] = useState("0");

  const [disable, setDisable] = useState(true);

  const {
    runContractFunction: requestFunding,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: campaignAbi,
    contractAddress: campaignAddress,
    functionName: "requestFunding",
    params: {},
    msgValue: Moralis.Units.ETH(fundAmount),
  });

  const handleChange = (event) => {
    // Get input value from "event"
    setFundAmount(event.target.value);
    console.log(event.target.value, "event value");
    if (event.target.value.length == 0 || parseFloat(event.target.value) <= 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
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
          <form className="relative mb-4">
            <input
              className="bg-eerie-black w-full block outline-none placeholder:text-eerie-grey px-4 py-1.5 rounded-md"
              type="number"
              id="fundAmount"
              placeholder="Min 0.1"
              onChange={handleChange}
            />
            <span className='absolute top-[0.4em] right-4 text-eerie-grey'>ETH</span>
          </form>
          <button
            className="bg-money-green text-black px-8 py-2 rounded-md font-bold"
            onClick={async function () {
              //   setAmountVal();
              await requestFunding({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            disabled={isLoading || isFetching || disable}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              "Contribute"
            )}
          </button>
        </div>
      ) : (
        <div>No campaign detected</div>
      )}
    </div>
  );
}
