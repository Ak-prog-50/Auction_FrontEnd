import { TNotificationDispatch } from "../@auctionTypes";
import { handleError, handleSuccess } from "./notificationHandlers";
import auctionFactoryAbi from "../settings/auctionFactoryAbi.json";
import { AUCTION_FACTORY_ADDRESS } from "../settings/constants";
import { BigNumber, ethers } from "ethers";

const createAuctionOptions = (
  argsArray: (FormDataEntryValue | BigNumber)[]
) => {
  return {
    abi: auctionFactoryAbi,
    contractAddress: AUCTION_FACTORY_ADDRESS,
    functionName: "createAuction",
    params: {
      _auctionName: argsArray[0],
      _NFTName: argsArray[1],
      _nftAddress: argsArray[2],
      _coinName: argsArray[3],
      _coinSymbol: argsArray[4],
      _coinMaxTokens: argsArray[5],
    },
  };
};

const createAuctionExecute = async (
  argsArray: (FormDataEntryValue | BigNumber)[],
  createAuction: any,
  dispatch: TNotificationDispatch
) => {
  console.log(createAuctionOptions(argsArray));
  await createAuction({
    params: createAuctionOptions(argsArray),
    onSuccess: () => handleSuccess(dispatch, "New Auction is Created"),
    onError: (err: Error) => {
      console.error(`\nError in createAuction tx:`, err);
      handleError(dispatch);
    },
  });
};

const isAuctionNameTakenQuery = async (bytes32NameString: string) => {
  console.log("Getting provider");
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  console.log("Getting contract");
  const auctionFactoryContract = new ethers.Contract(
    AUCTION_FACTORY_ADDRESS,
    auctionFactoryAbi,
    provider
  );
  let isTaken;
  try {
    isTaken = await auctionFactoryContract.s_auctionNameTaken(
      bytes32NameString
    );
  } catch (error) {
    console.error("Error in isAuctionNameAvailableQuery: ", error);
  }
  return isTaken;
};

const getAuctionsByAddressQuery = async (address: string | null) => {
  if (!address) return;
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const auctionFactoryContract = new ethers.Contract(
    AUCTION_FACTORY_ADDRESS,
    auctionFactoryAbi,
    provider
  );
  let auctions: string[] = [];
  try {
    const auctionNamesBytes32: string =
      await auctionFactoryContract.s_auctionNamesByAddress(address);
    // auctions = await Promise.all(
    //   auctionNamesBytes32.map(async (auctionName: string) => {
    //     const auction = await auctionFactoryContract.s_auctionsMappedByName(auctionName);
    //     return auction;
    //   }));
    console.log("here")
    const auctionInfo = await auctionFactoryContract.s_auctionsMappedByName(
      auctionNamesBytes32
    );
    auctions.push(auctionInfo.auction);
    console.log("auctions: here", auctions);
  } catch (error) {
    console.error("Error in getAuctionsByAddressQuery: ", error);
  }
  return auctions;
};

export {
  createAuctionExecute,
  isAuctionNameTakenQuery,
  getAuctionsByAddressQuery,
};
