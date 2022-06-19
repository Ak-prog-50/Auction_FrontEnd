import { useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";
import abi from "../../settings/abi.json";
import { useContext } from "react";
import { AuctionContext, IAuctionContext } from "../../context/AuctionContext";
import { handleError, handleSuccess } from "../../helperFunctions/notificationHandlers";

const EnterAuction = () => {
  const { addrs, chainId, auctionState } = useContext(AuctionContext) as IAuctionContext;
  const dispatch = useNotification();

  const {
    runContractFunction: enter,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: chainId ? addrs[chainId] : undefined,
    functionName: "enter",
  });
  return (
    <>
      <button
        type="button"
        className="block w-full py-2 px-4 text-lg font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        onClick={async () => {
          await enter({
            onSuccess: () => handleSuccess(dispatch),
            onError: (err) => {
              console.error(`\nError in enter tx: ${err}`);
              handleError(dispatch);
            },
          });
        }}
        disabled={isFetching || isLoading}
      >
        {isLoading || isFetching ? (
          <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
        ) : (
          <div>Enter Auction</div>
        )}
      </button>
    </>
  );
};

export default EnterAuction;
