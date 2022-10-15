import { createContext, useEffect, useState } from "react";
import abi from "../settings/abi.json";
// import contractAddrs from "../settings/contractAddresses.json";
import { useMoralis } from "react-moralis";
import {
  TAuctionStateSetter,
  THighestBidAmountSetter,
  TGetAuctionState,
  THighestBidderSetter,
} from "../@auctionTypes";
import { fetchAuctionState } from "../helperFunctions/contractQueries";
import useAuctionCalls from "../hooks/useAuctionCalls";
import { IContractAddrs } from "../@auctionTypes";
export interface IAuctionContext {
  addrs: IContractAddrs;
  chainId: string | null;
  abi: object | undefined;
  auctionState: number;
  setAuctionState: TAuctionStateSetter;
  highestBidAmount: string;
  setHighestBidAmount: THighestBidAmountSetter;
  highestBidder: string;
  setHighestBidder: THighestBidderSetter;
  // locationPathName: string;
}

const intialStateValues = {
  // addrs: contractAddrs,
  abi,
  auctionState: 0,
  highestBidAmount: "0.0",
  highestBidder: "",
};

export const AuctionContext = createContext<IAuctionContext | null>(null);

const AuctionProvider = (props: any) => {
  const location = window.location;
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = chainIdHex ? parseInt(chainIdHex, 16).toString() : null;
  const addrs: IContractAddrs = { "80001": location.pathname.split("/")[1] };
  // const [locationPathName, setLocationPathName] = useState(location.pathname);
  const [auctionState, setAuctionState] = useState(
    intialStateValues.auctionState
  );
  const [highestBidAmount, setHighestBidAmount] = useState(
    intialStateValues.highestBidAmount
  );
  const [highestBidder, setHighestBidder] = useState(
    intialStateValues.highestBidder
  );

  const { getAuctionState } = useAuctionCalls(addrs, chainId);

  useEffect(() => {
    if (isWeb3Enabled)
      fetchAuctionState(setAuctionState, getAuctionState as TGetAuctionState);
  }, [isWeb3Enabled, auctionState]);

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
        // locationPathName,
      }}
    >
      <>{props.children}</>
    </AuctionContext.Provider>
  );
};

export default AuctionProvider;
