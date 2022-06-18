import { useWeb3Contract } from "react-moralis";
import { IAuctionProps } from "../containers/AuctionOpen";
import abi from "../settings/abi.json";
import approveABI from "../settings/approveABI.json";
import increaseAllowanceABI from "../settings/increaseAllowanceABI.json";
import { NFT_ADDR, ERC20_ADDR, NFT_TOKEN_ID } from "../settings/constants";
import { useNotification } from "web3uikit";
import { parseEther } from "@ethersproject/units";

const AdminButtons = ({ addrs, chainId, auctionState, isOwner }: any) => {
  const dispatch = useNotification();
  const handleSuccess = () => {
    dispatch({
      type: "info",
      title: "Transaction Confirmed!",
      position: "topR",
    });
  };

  const handleError = (errorMsg?: string) => {
    dispatch({
      type: "error",
      title: errorMsg || "Tranaction Rejected!",
      position: "topR",
    });
  };

  const {
    runContractFunction: startRegistering,
    isFetching: fetchingRegistering,
    isLoading: loadingRegistering,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: chainId ? addrs[chainId] : undefined,
    functionName: "startRegistering",
  });

  const {
    runContractFunction: increaseAllowance,
    isFetching: fetchingAllowance,
    isLoading: loadingAllowance,
  } = useWeb3Contract({
    abi: increaseAllowanceABI,
    contractAddress: ERC20_ADDR,
    functionName: "increaseAllowance",
    params: {
      spender: chainId ? addrs[chainId] : undefined,
      addedValue: parseEther("100")
    }
  });

  const {
    runContractFunction: approveNFT,
    isFetching: fetchingapprove,
    isLoading: loadingapprove,
  } = useWeb3Contract({
    abi: approveABI,
    contractAddress: NFT_ADDR,
    functionName: "approve",
    params: {
      to: chainId ? addrs[chainId] : undefined,
      tokenId: NFT_TOKEN_ID
    }
  });

  const {
    runContractFunction: openAuction,
    isFetching: fetchingOpenAuction,
    isLoading: loadingOpenAuction,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: chainId ? addrs[chainId] : undefined,
    functionName: "openAuction",
  });

  const {
    runContractFunction: endAuction,
    isFetching: fetchingEndAuction,
    isLoading: loadingEndAuction,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: chainId ? addrs[chainId] : undefined,
    functionName: "endAuction",
  });

  const initSetup = async () => {
    try {
      if (auctionState !== 1) {
        await startRegistering({
          onError: (err: Error) => {
            throw(`\nError in start Registering tx: ${err}`);
          },
        });
      }
      // check if the allowance has already been made ( optional )
      await increaseAllowance({
        onError: (err: Error) => {
          throw(`\nError in increaseAllowance tx: ${err}`);
        },
      });
      await approveNFT({
        onSuccess: handleSuccess,
        onError: (err: Error) => {
          throw(`\nError in approveNFT tx: ${err}`);
        },
      });
    } catch (err) {
      console.error("\nError in initial Setup:", err);
      handleError();
    }
  };

  return (
    <div className="mx-7 mt-12">
      <button
        type="button"
        className="block w-1/3 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
        onClick={() => {
          if (!isOwner) {
            handleError("Only owner can call admin functions!");
            return;
          }
          initSetup();
        }}
        disabled={
          fetchingRegistering ||
          loadingRegistering ||
          fetchingAllowance ||
          loadingAllowance ||
          fetchingapprove ||
          loadingapprove
        }
      >
        {fetchingRegistering ||
        loadingRegistering ||
        fetchingAllowance ||
        loadingAllowance ||
        fetchingapprove ||
        loadingapprove ? (
          <div className="animate-spin spinner-border h-5 w-5 border-b-2 rounded-full"></div>
        ) : (
          <span>Start Registering & Approve Transfers</span>
        )}
      </button>

      <button
        type="button"
        className="block w-1/3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={async () => {
          if (!isOwner) {
            handleError("Only owner can call admin functions!");
            return;
          }
          await openAuction({
            onSuccess: handleSuccess,
            onError: () => handleError(),
          });
        }}
      >
        {loadingOpenAuction || fetchingOpenAuction ? (
          <div className="animate-spin spinner-border h-5 w-5 border-b-2 rounded-full"></div>
        ) : (
          <span>Open Auction</span>
        )}
      </button>

      <button
        type="button"
        className="block w-1/3 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={async () => {
          if (!isOwner) {
            handleError("Only owner can call admin functions!");
            return
          }
          await endAuction({
            onSuccess: handleSuccess,
            onError: () => handleError(),
          });
        }}
      >
        {loadingEndAuction || fetchingEndAuction ? (
          <div className="animate-spin spinner-border h-5 w-5 border-b-2 rounded-full"></div>
        ) : (
          <span>End Auction</span>
        )}
      </button>
    </div>
  );
};

export default AdminButtons;
