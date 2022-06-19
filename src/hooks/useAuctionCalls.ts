import abi from "../settings/abi.json";
import { useWeb3Contract } from "react-moralis";
import { IContractAddrs } from "../context/AuctionContext";
import increaseAllowanceABI from "../settings/increaseAllowanceABI.json";
import approveABI from "../settings/approveABI.json";
import { ERC20_ADDR, NFT_ADDR, NFT_TOKEN_ID } from "../settings/constants";
import { parseEther } from "@ethersproject/units";

const useAuctionCalls = (addrs: IContractAddrs, chainId: string | null) => {
  const { runContractFunction: getAuctionState } = useWeb3Contract({
    abi: abi,
    contractAddress: chainId ? addrs[chainId] : undefined,
    functionName: "s_auctionState",
  });

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
      to: chainId ? addrs[chainId] : undefined,
      tokenId: NFT_TOKEN_ID,
    },
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

  return {
    getAuctionState,
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
