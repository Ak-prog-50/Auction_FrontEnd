import React from "react";
import { TAuctionStateSetter } from "../@auctionTypes";


const fetchData = async (
  setAuctionState: TAuctionStateSetter,
  getAuctionState: ({ throwOnError, onComplete, onError, onSuccess, params } :any | undefined) => Promise<number>
) => {
  const auctionState = await getAuctionState({
    onSuccess: (auctionState: any) => console.log(auctionState, "auctionState"),
    onError: (err: Error) =>
      console.error("error in fetching auctionstate", err),
  });
  setAuctionState(auctionState as number);
};

export { fetchData }
