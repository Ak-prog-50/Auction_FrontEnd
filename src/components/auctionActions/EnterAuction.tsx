import { useWeb3Contract, useChain } from "react-moralis";
import abi from "../../settings/abi.json";
import contractAddrs from "../../settings/contractAddresses.json";
import Alert from "../Alert";

interface contractAddrsInterface {
  [key: string]: string,
}

const EnterAuction = () => {
  const addrs: contractAddrsInterface = contractAddrs;
  const { chainId: chainIdHex } = useChain();
  const chainId = chainIdHex ? parseInt(chainIdHex, 16).toString() : null;
  const { error, runContractFunction, isFetching, isLoading } =
    useWeb3Contract({
      abi: abi,
      contractAddress: chainId ? addrs[chainId] : undefined,
      functionName: "enter",
    });
  return (
    <>
      {error && <Alert errorMsg={error.message} errorName={error.name} />}
      <button
        type="button"
        className="block w-full py-2 px-4 text-lg font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        onClick={async () => {
          console.log(chainId)
          await runContractFunction();
          error && console.log(error);
        }}
        disabled={isFetching || isLoading}
      >
        Enter Auction
      </button>
    </>
  );
};

export default EnterAuction;
