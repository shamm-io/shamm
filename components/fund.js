import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import Moralis from "moralis-v1";

export default function Fund() {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const campaignAddress =
    chainId in contractAddresses ? contractAddresses[chainId][1][0] : null;

  try {
    var obj = JSON.parse(abi[chainId][1]); // Here I am parsing String-Abi into JSON
  } catch (ex) {
    console.error(ex);
  }
  // const [amount, setAmount] = useState("0");
  console.log(obj);
  const campaignAbi = obj;
  const [fundAmount, setFundAmount] = useState("0");

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
    <div className="p-5">
      {campaignAddress ? (
        <div>
          <form>
            <label for="fname">Enter amount</label>
            <br />
            <input
              className="bg-slate-200 py-2 px-4 rounded"
              type="number"
              id="fundAmount"
              placeholder="0.1"
              onChange={handleChange}
            />
          </form>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto my-2"
            onClick={async function () {
              //   setAmountVal();
              await requestFunding({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            disabled={isLoading || isFetching}
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
