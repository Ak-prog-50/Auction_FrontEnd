import { IAuctionProps } from "../../containers/AuctionOpen";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useNotification } from "web3uikit";
import abi from "../../settings/abi.json";
import { parseEther } from "@ethersproject/units";

const PlaceBid = ({ addrs, chainId, auctionState }: IAuctionProps) => {
  const dispatch = useNotification();
  const handleSuccess = () => {
    dispatch({
      type: "info",
      title: "Transaction Confirmed!",
      position: "topR",
    });
  };

  const handleError = () => {
    dispatch({
      type: "error",
      title: "Tranaction Rejected!",
      position: "topR",
    });
  };

  const options = (evt: any) => {
    const bid: number = evt.target[0].value;
    const bidString: string = bid.toString();
    return {
      abi: abi,
      contractAddress: chainId ? addrs[chainId] : undefined,
      functionName: "placeBid",
      params: {
        _bid: parseEther(bidString),
      },
    } 
  }
  

  const {
    fetch: placeBid,
    isFetching,
    isLoading,
  } = useWeb3ExecuteFunction();

  return (
    <div className="block w-full">
      {isLoading || isFetching ? (
        <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
      ) : (
        <form
          onSubmit={async (event: any) => {
            event.preventDefault();
            await placeBid({
              params: options(event),
              onSuccess: handleSuccess,
              onError: (err) => {
                console.log(`\nError in placeBid tx: ${err}`);
                handleError();
              },
            });
          }}
        >
          <label
            htmlFor="placeBid"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Your Email
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
              disabled={isFetching || isLoading}
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
