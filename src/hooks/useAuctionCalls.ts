import abi from "../settings/abi.json";
import {
  useWeb3Contract,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { IContractAddrs, TNotificationDispatch } from "../@auctionTypes";
import increaseAllowanceABI from "../settings/increaseAllowanceABI.json";
import approveABI from "../settings/approveABI.json";
import { NFT_TOKEN_ID } from "../settings/constants";
import { parseEther } from "@ethersproject/units";
import { handleSuccess } from "../helperFunctions/notificationHandlers";

const useAuctionCalls = (addrs: IContractAddrs, chainId: string | null) => {
  const auctionAddressPre = window.location.pathname.split("/")[1];
  const auctionAddress = auctionAddressPre ? auctionAddressPre : undefined;

  const { runContractFunction: getAuctionState } = useWeb3Contract({
    abi: abi,
    contractAddress: auctionAddress,
    functionName: "s_auctionState",
  });

  const { runContractFunction: getOwner } = useWeb3Contract({
    abi: abi,
    contractAddress: auctionAddress,
    functionName: "owner",
  });

  const { runContractFunction: getHighestBid } = useWeb3Contract({
    abi: abi,
    contractAddress: auctionAddress,
    functionName: "s_highestBid",
  });

  const {
    runContractFunction: enterAuction,
    isFetching: fetchingEnter,
    isLoading: loadingEnter,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: auctionAddress,
    functionName: "enter",
  });

  const {
    fetch: redeem,
    isFetching: fetchingRedeem,
    isLoading: loadingRedeem,
  } = useWeb3ExecuteFunction();

  const {
    fetch: placeBid,
    isFetching: fetchingPlaceBid,
    isLoading: loadingPlaceBid,
  } = useWeb3ExecuteFunction();

  const {
    runContractFunction: startRegistering,
    isFetching: fetchingRegistering,
    isLoading: loadingRegistering,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: auctionAddress,
    functionName: "startRegistering",
  });

  const {
    fetch: increaseAllowanceFetch,
    isFetching: fetchingAllowance,
    isLoading: loadingAllowance,
  } = useWeb3ExecuteFunction();

  const increaseAllowance = async (erc20Addr: string, dispatch: TNotificationDispatch) => {
    await increaseAllowanceFetch({
      params: {
        abi: increaseAllowanceABI,
        contractAddress: erc20Addr,
        functionName: "increaseAllowance",
        params: {
          spender: auctionAddress,
          addedValue: parseEther("100"),
        },
      },
      onSuccess: () => handleSuccess(dispatch, "Allowance will be increased! Please wait to place the Bid."),
      onError: (err: Error) => {
        throw new Error(`\nError in increaseAllowance tx: ${err}`);
      }
    });
  };

  const {
    fetch: approveNFTFetch,
    isFetching: fetchingApprove,
    isLoading: loadingApprove,
  } = useWeb3ExecuteFunction();

  const approveNFT = async (nftAddress: string, dispatch: TNotificationDispatch) => {
    await approveNFTFetch({
      params: {
        abi: approveABI,
        contractAddress: nftAddress,
        functionName: "approve",
        params: {
          to: auctionAddress,
          tokenId: NFT_TOKEN_ID,
        },
      },
      onSuccess: () => handleSuccess(dispatch),
      onError: (err: Error) => {
        throw new Error(`\nError in approveNFT tx: ${err}`);
      }
    });
  };

  const {
    runContractFunction: openAuction,
    isFetching: fetchingOpenAuction,
    isLoading: loadingOpenAuction,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: auctionAddress,
    functionName: "openAuction",
  });

  const {
    runContractFunction: endAuction,
    isFetching: fetchingEndAuction,
    isLoading: loadingEndAuction,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: auctionAddress,
    functionName: "endAuction",
  });

  return {
    getAuctionState,
    getOwner,
    getHighestBid,
    enterAuction,
    fetchingEnter,
    loadingEnter,
    redeem,
    placeBid,
    fetchingPlaceBid,
    loadingPlaceBid,
    fetchingRedeem,
    loadingRedeem,
    startRegistering,
    fetchingRegistering,
    loadingRegistering,
    increaseAllowance,
    fetchingAllowance,
    loadingAllowance,
    approveNFT,
    fetchingApprove,
    loadingApprove,
    openAuction,
    fetchingOpenAuction,
    loadingOpenAuction,
    endAuction,
    fetchingEndAuction,
    loadingEndAuction,
  };
};

export default useAuctionCalls;
