import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuctionContext, IAuctionContext } from "../context/AuctionContext";
import { mapAuctionState } from "../helperFunctions/utils";

const AuctionState = () => {
  const { auctionState } = useContext(AuctionContext) as IAuctionContext;
  const location = useLocation()
  if (location.pathname === "/") return null;
  return (
    <div>
      <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
        Auction State: {mapAuctionState(auctionState)}
      </span>
    </div>
  );
};

export default AuctionState;
