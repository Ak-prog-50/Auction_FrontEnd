import React from "react";
import { PayloadType } from "web3uikit/dist/components/Notification/types";

export type TAuctionStateSetter = React.Dispatch<React.SetStateAction<number>>;

export type THighestBidAmountSetter = React.Dispatch<React.SetStateAction<string>>;

export type THighestBidderSetter = React.Dispatch<React.SetStateAction<string>>;

export type TIsOwnerSetter = React.Dispatch<React.SetStateAction<boolean>>;

export type TGetAuctionState = ({
  throwOnError,
  onComplete,
  onError,
  onSuccess,
  params: fetchParams,
}: any) => Promise<number>;

export type TGetOwner = ({
  throwOnError,
  onComplete,
  onError,
  onSuccess,
  params: fetchParams,
}: any) => Promise<string>;

export type TGetHighestBid = ({
  throwOnError,
  onComplete,
  onError,
  onSuccess,
  params: fetchParams,
}: any) => Promise<IHighestBid>;

export type TNotificationDispatch = (props: PayloadType) => void;
export interface IContractAddrs {
  [key: string]: string;
}

export interface IHighestBid {
  highestBidder: string;
  highestBid: number;
}
