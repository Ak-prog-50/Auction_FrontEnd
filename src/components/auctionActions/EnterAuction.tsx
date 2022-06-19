import { useNotification } from "web3uikit";
import { useContext } from "react";
import { AuctionContext, IAuctionContext } from "../../context/AuctionContext";
import { handleError, handleSuccess } from "../../helperFunctions/notificationHandlers";
import useAuctionCalls from "../../hooks/useAuctionCalls";
import Spinner from "../Spinner";

const EnterAuction = () => {
  const { addrs, chainId } = useContext(AuctionContext) as IAuctionContext;
  const dispatch = useNotification();
  const { enterAuction, fetchingEnter, loadingEnter } = useAuctionCalls(addrs, chainId)

  return (
    <>
      <button
        type="button"
        className="block w-full py-2 px-4 text-lg font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        onClick={async () => {
          await enterAuction({
            onSuccess: () => handleSuccess(dispatch),
            onError: (err) => {
              console.error(`\nError in enter tx: ${err}`);
              handleError(dispatch);
            },
          });
        }}
        disabled={fetchingEnter || loadingEnter}
      >
        {fetchingEnter || loadingEnter ? (
          <Spinner dimensions="lg" />
        ) : (
          <div>Enter Auction</div>
        )}
      </button>
    </>
  );
};

export default EnterAuction;
