import { AuctionContext, IAuctionContext } from "../context/AuctionContext";
import { useContext, useEffect } from "react";
import { mapAuctionState } from "../helperFunctions/utils";
import { useMoralis } from "react-moralis";
import useAuctionCalls from "../hooks/useAuctionCalls";
import { fetchBidder } from "../helperFunctions/contractQueries";
import { TGetHighestBid } from "../@auctionTypes";

// add highest bid from context
const InfoCards = () => {
  const { auctionState, highestBidAmount, setHighestBidAmount, setHighestBidder, addrs, chainId } = useContext(
    AuctionContext
  ) as IAuctionContext;

  const { isWeb3Enabled } = useMoralis()
  const { getHighestBid } = useAuctionCalls(addrs, chainId);
  
  useEffect(() => {
    if (isWeb3Enabled)
      fetchBidder(getHighestBid as TGetHighestBid, setHighestBidAmount, setHighestBidder);
  }, [isWeb3Enabled]);

  return (
    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 mt-12">
      <div className="shadow-lg bg-red-400 border-l-8 hover:bg-red-500 mb-2 p-2 md:w-1/4 mx-2">
        <div className="p-4 flex flex-col">
          <a href="#" className="no-underline text-white text-2xl">
            {mapAuctionState(auctionState)}
          </a>
          <a
            href="https://www.etherscan.io"
            className="no-underline text-white text-lg"
          >
            Auction State
          </a>
        </div>
      </div>

      <div className="shadow bg-blue-400 border-l-8 hover:bg-blue-500 mb-2 p-2 md:w-1/4 mx-2">
        <div className="p-4 flex flex-col">
          <a href="#" className="no-underline text-white text-2xl">
            {highestBidAmount} ETH
          </a>
          <a
            href="https://www.etherscan.io"
            className="no-underline text-white text-lg"
          >
            Highest Bid
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
