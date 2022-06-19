import abi from "../settings/abi.json";
import { useWeb3Contract } from "react-moralis";
import { IContractAddrs } from "../context/AuctionContext";

const useAuctionCalls = (addrs: IContractAddrs, chainId: string | null) => {
  console.log(addrs, "addrs")
  const { runContractFunction: getAuctionState } = useWeb3Contract({
    abi: abi,
    contractAddress: chainId ? addrs[chainId] : undefined,
    functionName: "s_auctionState",
  });
  return { getAuctionState };
};

export default useAuctionCalls;
