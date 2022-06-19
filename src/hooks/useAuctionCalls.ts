import abi from "../settings/abi.json";
import { useWeb3Contract, useWeb3ExecuteFunction } from "react-moralis";
import { IContractAddrs } from "../context/AuctionContext";
import increaseAllowanceABI from "../settings/increaseAllowanceABI.json";
import approveABI from "../settings/approveABI.json";
import { ERC20_ADDR, NFT_ADDR, NFT_TOKEN_ID } from "../settings/constants";
import { parseEther } from "@ethersproject/units";

const useAuctionCalls = (addrs: IContractAddrs, chainId: string | null) => {
  const auctionAddress = chainId ? addrs[chainId] : undefined;
  
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
    fetch: redeem,
    isFetching: fetchingRedeem,
    isLoading: loadingRedeem,
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
    runContractFunction: increaseAllowance,
    isFetching: fetchingAllowance,
    isLoading: loadingAllowance,
  } = useWeb3Contract({
    abi: increaseAllowanceABI,
    contractAddress: ERC20_ADDR,
    functionName: "increaseAllowance",
    params: {
      spender: auctionAddress,
      addedValue: parseEther("100"),
    },
  });

  const {
    runContractFunction: approveNFT,
    isFetching: fetchingApprove,
    isLoading: loadingApprove,
  } = useWeb3Contract({
    abi: approveABI,
    contractAddress: NFT_ADDR,
    functionName: "approve",
    params: {
      to: auctionAddress,
      tokenId: NFT_TOKEN_ID,
    },
  });

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
    redeem,
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
