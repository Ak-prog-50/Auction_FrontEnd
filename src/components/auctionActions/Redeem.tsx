import { useMoralis } from "react-moralis";
import { getAddress } from "@ethersproject/address";
import { useNotification } from "web3uikit";
import { handleError } from "../../helperFunctions/notificationHandlers";
import useAuctionCalls from "../../hooks/useAuctionCalls";
import { useContext } from "react";
import { AuctionContext, IAuctionContext } from "../../context/AuctionContext";
import { redeemExecute } from "../../helperFunctions/contractQueries";
import Spinner from "../Spinner";

const Redeem = () => {
  const dispatch = useNotification();
  const { account } = useMoralis();
  const { addrs, chainId, highestBidAmount, highestBidder } = useContext(
    AuctionContext
  ) as IAuctionContext;
  const auctionAddress = chainId ? addrs[chainId] : undefined;

  const { redeem, fetchingRedeem, loadingRedeem } = useAuctionCalls(
    addrs,
    chainId
  );
  const accountChecksum = getAddress(account as string);
  const highestBidderChecksum = getAddress(highestBidder as string);
  return (
    <button
      type="button"
      className="block w-1/2 mt-4 mx-auto py-2 px-4 text-lg font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-purple-500 dark:border-grey-600 dark:text-white dark:hover:text-white dark:hover:bg-purple-600 dark:focus:ring-blue-500 dark:focus:text-white"
      onClick={async () => {
        if (highestBidderChecksum === accountChecksum) {
          await redeemExecute(
            redeem,
            auctionAddress,
            highestBidAmount,
            dispatch
          );
        } else {
          handleError(dispatch, "You are not the highest bidder!");
        }
      }}
      disabled={fetchingRedeem || loadingRedeem}
    >
      {fetchingRedeem || loadingRedeem ? (
        <Spinner dimensions={8} />
      ) : (
        <span>Redeem NFT</span>
      )}
    </button>
  );
};

export default Redeem;
