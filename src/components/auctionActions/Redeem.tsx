import { useMoralis } from "react-moralis";
import { getAddress } from "@ethersproject/address";
import { useNotification } from "web3uikit";
import {
  handleError,
  handleSuccess,
} from "../../helperFunctions/notificationHandlers";

const Redeem = ({ redeem, isFetching, isLoading, highestBidder }: any) => {
  const dispatch = useNotification();
  const { account } = useMoralis();
  const accountChecksum = getAddress(account as string);
  const highestBidderChecksum = getAddress(highestBidder as string);
  return (
    <button
      type="button"
      className="block w-1/2 mt-4 mx-auto py-2 px-4 text-lg font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-purple-500 dark:border-grey-600 dark:text-white dark:hover:text-white dark:hover:bg-purple-600 dark:focus:ring-blue-500 dark:focus:text-white"
      onClick={async () => {
        if (highestBidderChecksum === accountChecksum) {
          await redeem({
            onSuccess: () => handleSuccess(dispatch),
            onError: (err: Error) => {
              console.log(`\nError in redeem tx: ${err}`);
              handleError(dispatch);
            },
          });
        } else {
          handleError("You are not the highest bidder!");
        }
      }}
      disabled={isFetching || isLoading}
    >
      {isLoading || isFetching ? (
        <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
      ) : (
        <span>Redeem NFT</span>
      )}
    </button>
  );
};

export default Redeem;
