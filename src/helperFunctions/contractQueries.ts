import {
  TAuctionStateSetter,
  TGenericContractFunc,
  TGetAuctionState,
  TGetHighestBid,
  TGetOwner,
  THighestBidAmountSetter,
  THighestBidderSetter,
  TIsOwnerSetter,
  TNotificationDispatch,
} from "../@auctionTypes";
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

export const fetchAuctionState = async (
  setAuctionState: TAuctionStateSetter,
  getAuctionState: TGetAuctionState
) => {
  await getAuctionState({
    onSuccess: (auctionState: number) => {
      console.info("auctionState", auctionState);
      setAuctionState(auctionState);
    },
    onError: (err: Error) =>
      console.error("\nError in fetching auctionstate", err),
  });
};

export const checkOwnership = async (
  getOwner: TGetOwner,
  account: string,
  dispatch: TNotificationDispatch,
  setIsOwner: TIsOwnerSetter
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
  redeem: TGenericContractFunc,
  auctionAddress: string | undefined,
  highestBidAmount: string,
  dispatch: TNotificationDispatch
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
  placeBid: TGenericContractFunc,
  auctionAddress: string | undefined,
  dispatch: TNotificationDispatch
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
  getHighestBid: TGetHighestBid,
  setHighestBidAmount: THighestBidAmountSetter,
  setHighestBidder: THighestBidderSetter
) => {
  const result = (await getHighestBid({
    onSuccess: (highestBid: IHighestBid) =>
      console.info("Highest Bid", highestBid),
    onError: (err: Error) =>
      console.error(`\nError in getting highestBid tx: ${err}`),
  })) as IHighestBid;

  setHighestBidAmount(formatEther(result.highestBid).toString());
  setHighestBidder(result.highestBidder);
};

export const initSetup = async (auctionState: number, startRegistering: TGenericContractFunc, increaseAllowance: TGenericContractFunc, approveNFT: TGenericContractFunc, dispatch: TNotificationDispatch) => {//!
  try {
    if (auctionState !== 1) {
      await startRegistering({
        onError: (err: Error) => {
          throw new Error(`\nError in start Registering tx: ${err}`);
        },
      });
    }
    // check if the allowance has already been made ( optional )
    await increaseAllowance({
      onError: (err: Error) => {
        throw new Error(`\nError in increaseAllowance tx: ${err}`);
      },
    });
    await approveNFT({
      onSuccess: () => handleSuccess(dispatch),
      onError: (err: Error) => {
        throw new Error(`\nError in approveNFT tx: ${err}`);
      },
    });
  } catch (err) {
    console.error("\nError in initial Setup:", err);
    handleError(dispatch);
  }
};