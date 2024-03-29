import { useNotification } from "web3uikit";
import { useContext } from "react";
import { AuctionContext, IAuctionContext } from "../../context/AuctionContext";
import useAuctionCalls from "../../hooks/useAuctionCalls";
import { placeBidExecute } from "../../helperFunctions/contractQueries";
import Spinner from "../Spinner";
import { handleSuccess } from "../../helperFunctions/notificationHandlers";
import { getERC20Addr } from "../../helperFunctions/auctionFactoryQueries";
import { useMoralis } from "react-moralis";

const PlaceBid = () => {
  const { addrs, chainId } = useContext(AuctionContext) as IAuctionContext
  const {account} = useMoralis()
  const dispatch = useNotification();
  const { placeBid, fetchingPlaceBid, loadingPlaceBid, increaseAllowance } = useAuctionCalls(addrs, chainId)
  const auctionAddress = chainId ? addrs[chainId] : undefined;

  return (
    <div className="block w-full">
      {fetchingPlaceBid || loadingPlaceBid ? (
        <Spinner dimensions="lg" />
      ) : (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            // increase Allowance only if it is not already increased
            const erc20Addr = await getERC20Addr(account as string, auctionAddress as string);
            const tx: any = await increaseAllowance(erc20Addr, dispatch);
            tx && await tx?.wait(1)
            await placeBidExecute(event, placeBid, auctionAddress, dispatch)
          }}
        >
          <label
            htmlFor="placeBid"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Your Bid
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
            <input
              type="number"
              step="any"
              id="placeBid"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bid Amount in ETH"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={fetchingPlaceBid || loadingPlaceBid}
            >
              Bid
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PlaceBid;
