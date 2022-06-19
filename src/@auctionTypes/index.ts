import React from "react";

export type TAuctionStateSetter = React.Dispatch<React.SetStateAction<number>>;

export type TGetAuctionState = ({
  throwOnError,
  onComplete,
  onError,
  onSuccess,
  params: fetchParams,
}: any) => Promise<number>;

export interface IContractAddrs {
  [key: string]: string;
}

export interface IHighestBid {
  highestBidder: string;
  highestBid: number;
}
