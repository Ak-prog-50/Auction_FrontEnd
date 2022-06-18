import abi from "../settings/abi.json";
import { useWeb3Contract } from "react-moralis";
import { useContext } from "react";
import { AuctionContext, IAuctionContext } from "../context/AuctionContext";

const useAuctionCalls = () => {
  const { addrs, chainId } = useContext(AuctionContext) as IAuctionContext;
  const { runContractFunction: getAuctionState } = useWeb3Contract({
    abi: abi,
    contractAddress: chainId ? addrs[chainId] : undefined,
    functionName: "s_auctionState",
  });
  return { getAuctionState };
};

export default useAuctionCalls;
