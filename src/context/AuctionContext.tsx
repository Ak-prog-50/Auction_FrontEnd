import { createContext, useEffect, useState } from "react";
import abi from "../settings/abi.json";
import contractAddrs from "../settings/contractAddresses.json";
import { useMoralis } from "react-moralis";
import { TAuctionStateSetter, TGetAuctionState } from "../@auctionTypes";
import { fetchData } from "../smartContractCalls/helperFunctions";
import useAuctionCalls from "../smartContractCalls/useAuctionCalls";
interface contractAddrsInterface {
  [key: string]: string;
}

export interface IAuctionContext {
  addrs: contractAddrsInterface;
  chainId: string | null;
  abi: object | undefined;
  auctionState: number;
  setAuctionState: TAuctionStateSetter;
  highestBidAmount: string;
  setHighestBidAmount: React.Dispatch<React.SetStateAction<string>>;
  highestBidder: string;
  setHighestBidder: React.Dispatch<React.SetStateAction<string>>;
}

const intialState : IAuctionContext = {
  addrs: contractAddrs,
  chainId: null,
  abi,
  auctionState: 0,
  setAuctionState: () => {},
  highestBidAmount: "0.0",
  setHighestBidAmount: () => {},
  highestBidder: "",
  setHighestBidder: () => {},
};

export const AuctionContext = createContext<IAuctionContext>(intialState);

const AuctionProvider = (props: any) => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = chainIdHex ? parseInt(chainIdHex, 16).toString() : null;
  const addrs: contractAddrsInterface = contractAddrs;
  const [auctionState, setAuctionState] = useState(intialState.auctionState);
  const [highestBidAmount, setHighestBidAmount] = useState(intialState.highestBidAmount);
  const [highestBidder, setHighestBidder] = useState(intialState.highestBidder);

  const { getAuctionState } = useAuctionCalls()

  useEffect(() => {
    if (isWeb3Enabled) fetchData(setAuctionState, getAuctionState as TGetAuctionState);
  }, [isWeb3Enabled, auctionState])
  

  return (
    <AuctionContext.Provider
      value={{
        addrs,
        chainId,
        abi,
        auctionState,
        setAuctionState,
        highestBidAmount,
        setHighestBidAmount,
        highestBidder,
        setHighestBidder,
      }}
    >
      <>{props.children}</>
    </AuctionContext.Provider>
  );
};

export default AuctionProvider;
