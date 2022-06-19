import { TAuctionStateSetter, TGetAuctionState } from "../@auctionTypes";
import { getAddress } from "@ethersproject/address";
import {
  handleError,
  handleSuccess,
  handleWarning,
} from "./notificationHandlers";
import abi from "../settings/abi.json";
import { parseEther } from "@ethersproject/units";
import { IHighestBid } from "../@auctionTypes";
import { formatEther } from "@ethersproject/units";

export const fetchData = async (
  setAuctionState: TAuctionStateSetter,
  getAuctionState: TGetAuctionState
) => {
  await getAuctionState({
    onSuccess: (auctionState: any) => {
      console.info("auctionState", auctionState);
      setAuctionState(auctionState as number);
    },
    onError: (err: Error) =>
      console.error("\nError in fetching auctionstate", err),
  });
};

export const checkOwnership = async (
  getOwner: any,
  account: string,
  dispatch: any,
  setIsOwner: any
) => {
  const owner = await getOwner({
    onError: (err: Error) => console.error("Error in getOwner", err),
  });
  if (getAddress(owner as string) !== getAddress(account as string)) {
    handleWarning(
      dispatch,
      "You are not the owner of this contract. Only owner can call admin functions!"
    );
  } else {
    setIsOwner(true);
  }
};

const getRedeemOptions = (
  auctionAddress: string | undefined,
  highestBidAmount: string
) => {
  return {
    abi: abi,
    contractAddress: auctionAddress,
    functionName: "redeem",
    msgValue: parseEther(highestBidAmount).toString(),
  };
};

export const redeemExecute = async (
  redeem: any,
  auctionAddress: string | undefined,
  highestBidAmount: string,
  dispatch: any
) => {
  await redeem({
    params: getRedeemOptions(auctionAddress, highestBidAmount),
    onSuccess: () => handleSuccess(dispatch),
    onError: (err: Error) => {
      console.error(`\nError in redeem tx: ${err}`);
      handleError(dispatch);
    },
  });
};

const placeBidOptions = (evt: any, auctionAddress: string | undefined) => {
  const bid: number = evt.target[0].value;
  const bidString: string = bid.toString();
  return {
    abi: abi,
    contractAddress: auctionAddress,
    functionName: "placeBid",
    params: {
      _bid: parseEther(bidString),
    },
  };
};

export const placeBidExecute = async (
  evt: any,
  placeBid: any,
  auctionAddress: string | undefined,
  dispatch: any
) => {
  await placeBid({
    params: placeBidOptions(evt, auctionAddress),
    onSuccess: () => handleSuccess(dispatch),
    onError: (err: Error) => {
      console.error(`\nError in placeBid tx: ${err}`);
      handleError(dispatch);
    },
  });
};

export const fetchBidder = async (
  getHighestBid: any,
  setHighestBidAmount: any,
  setHighestBidder: any
) => {
  const result = (await getHighestBid({
    onSuccess: (highestBid: any) => console.info("Highest Bid", highestBid),
    onError: (err: Error) =>
      console.error(`\nError in getting highestBid tx: ${err}`),
  })) as IHighestBid;

  setHighestBidAmount(formatEther(result.highestBid).toString());
  setHighestBidder(result.highestBidder);
};
