import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { use, useEffect, useState } from "react";
import Moralis from "moralis-v1";
import { Fascinate } from "@next/font/google";

export default function Fund() {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const campaignAddress =
    chainId in contractAddresses ? contractAddresses[chainId][1][0] : null;

  try {
    var obj = JSON.parse(abi[chainId][1][0]); // Here I am parsing String-Abi into JSON
  } catch (ex) {
    console.error(ex);
  }
  // const [amount, setAmount] = useState("0");
  console.log(obj);
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

  //   useEffect(() => {
  //     setFundAmount(amount);
  //     console.log(`after ${amount}`);
  //     // setAmountVal();
  //   }, [amount, fundAmount, requestFunding]);

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
      // updateUIValues();
      // handleNewNotification(tx);
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
              type="number"
              id="fundAmount"
              placeholder="Min 0.1"
              onChange={handleChange}
            />
          </form>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-auto my-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              "Fund"
            )}
          </button>
        </div>
      ) : (
        <div>No campaign detected</div>
      )}
    </div>
  );
}
