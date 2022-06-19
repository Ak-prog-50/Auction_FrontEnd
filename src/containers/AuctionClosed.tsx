import { useWeb3Contract, useMoralis } from "react-moralis";
import { IAuctionProps } from "./AuctionOpen";
import abi from "../settings/abi.json";
import { useContext, useEffect, useState } from "react";
import { formatEther, parseEther } from "@ethersproject/units";
import { useNotification } from "web3uikit";
import Redeem from "../components/auctionActions/Redeem";
import { AuctionContext, IAuctionContext } from "../context/AuctionContext"

interface highestBid {
  highestBidder: string;
  highestBid: number;
}

const AuctionClosed = () => {
  const { addrs, chainId, highestBidAmount, setHighestBidAmount, highestBidder, setHighestBidder } = useContext(AuctionContext) as IAuctionContext;
  // const [highestBidAmount, setHighestBidAmount] = useState("0.0");
  // const [highestBidder, setHighestBidder] = useState("");
  const { isWeb3Enabled } = useMoralis();
  const auctionAddress = chainId ? addrs[chainId] : undefined;

  const { runContractFunction: getHighestBid } = useWeb3Contract({
    abi: abi,
    contractAddress: auctionAddress,
    functionName: "s_highestBid",
  });

  const {
    runContractFunction: redeem,
    isFetching: fetchingRedeem,
    isLoading: loadingRedeem,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: auctionAddress,
    functionName: "redeem",
    msgValue: parseEther(highestBidAmount).toString(),
  });

  const fetchBidder = async () => {
    const result = (await getHighestBid({
      onSuccess: (highestBid: any) => console.log("Highest Bid", highestBid),
      onError: (err) => console.log(`\nError in getting highestBid tx: ${err}`),
    })) as highestBid;

    setHighestBidAmount(formatEther(result.highestBid).toString());
    setHighestBidder(result.highestBidder);
  };

  useEffect(() => {
    if (isWeb3Enabled) fetchBidder();
  }, [isWeb3Enabled]);

  return (
    <div className="w-8/12 m-auto py-16 min-h-full flex items-center justify-center min-w-max">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
        <div className="border-t border-gray-200 text-center pt-8">
          <h1 className="text-9xl font-bold text-purple-400">!</h1>
          <h1 className="text-6xl font-medium py-8">Auction is Closed</h1>

          <p className="text-2xl pb-8 px-12 font-medium">
            {/**//* Add another condition to check if the Sold event is emitted or highestbidder owns the nft */}

            {highestBidAmount === "0.0" ? (
              <span>
                No bids were placed. Please wait for the next auction to start.
              </span>
            ) : (
              <>
                <span>
                  The Highest Bid is {highestBidAmount} ETH. If you are the highest bidder, please
                  redeem your NFT.
                </span>
                <Redeem
                  redeem={redeem}
                  isFetching={fetchingRedeem}
                  isLoading={loadingRedeem}
                  highestBidder={highestBidder}
                />
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuctionClosed;
