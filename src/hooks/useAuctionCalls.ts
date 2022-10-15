import abi from "../settings/abi.json";
import { useMoralis, useWeb3Contract, useWeb3ExecuteFunction } from "react-moralis";
import { IContractAddrs } from "../@auctionTypes";
import increaseAllowanceABI from "../settings/increaseAllowanceABI.json";
import approveABI from "../settings/approveABI.json";
import { NFT_TOKEN_ID } from "../settings/constants";
import { parseEther } from "@ethersproject/units";
import { getERC20Addr, getNFTAddr } from "../helperFunctions/auctionFactoryQueries";

const useAuctionCalls = (addrs: IContractAddrs, chainId: string | null) => {
  const auctionAddressPre = window.location.pathname.split('/')[1];
  const auctionAddress = auctionAddressPre ? auctionAddressPre : undefined;
  const { account } = useMoralis()
  let erc20Addr: string = "";
  let nftAddress: string = "";

  (async function() {
    erc20Addr = await getERC20Addr(account as string, auctionAddress as string);
    nftAddress = await getNFTAddr(account as string, auctionAddress as string);
    console.log("erc20Addr", erc20Addr);
    console.log("nftAddress", nftAddress);
  }())

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
    contractAddress: chainId ? addrs[chainId] : undefined,
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
    runContractFunction: increaseAllowance,
    isFetching: fetchingAllowance,
    isLoading: loadingAllowance,
  } = useWeb3Contract({
    abi: increaseAllowanceABI,
    contractAddress: "0x362B6379eF8E5346D9355c15D3E0130FC4DFFF40",
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
    contractAddress: "0xaF25478773754c446E2226cF997245f8bA271DF3",
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
