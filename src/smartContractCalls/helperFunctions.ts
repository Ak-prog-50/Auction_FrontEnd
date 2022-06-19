import React from "react";
import { TAuctionStateSetter, TGetAuctionState } from "../@auctionTypes";

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

export { fetchData };
