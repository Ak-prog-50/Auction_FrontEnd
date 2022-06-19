import React from "react";
import { TAuctionStateSetter, TGetAuctionState } from "../@auctionTypes";
import { getAddress } from "@ethersproject/address";
import { handleWarning } from "./notificationHandlers";

const fetchData = async (
  setAuctionState: TAuctionStateSetter,
  getAuctionState: TGetAuctionState
) => {
  await getAuctionState({
    onSuccess: (auctionState: any) => {
      console.log(auctionState, "auctionState");
      setAuctionState(auctionState as number)
    },
    onError: (err: Error) =>
      console.error("error in fetching auctionstate", err),
  });
};


const checkOwnership = async (getOwner: any, account: string, dispatch: any, setIsOwner: any ) => {
  const owner = await getOwner({
    onError: (err: Error) => console.error("Error in getOwner", err),
  });
  if (getAddress(owner as string) !== getAddress(account as string)) {
    handleWarning(dispatch, "You are not the owner of this contract. Only owner can call admin functions!");
  } else {
    setIsOwner(true);
  }
};

export { fetchData, checkOwnership };
