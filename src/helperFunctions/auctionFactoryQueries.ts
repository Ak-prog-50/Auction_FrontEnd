import { useWeb3ExecuteFunction } from "react-moralis";
import { TNotificationDispatch } from "../@auctionTypes";
import { handleError, handleSuccess } from "./notificationHandlers";
import auctionFactoryAbi from "../settings/auctionFactoryAbi.json";
import { AUCTION_FACTORY_ADDRESS } from "../settings/constants";
import { BigNumber, ethers } from "ethers";

const createAuctionOptions = (argsArray: (FormDataEntryValue | BigNumber)[]) => {
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
  console.log(createAuctionOptions(argsArray))
  await createAuction({
    params: createAuctionOptions(argsArray),
    onSuccess: () => handleSuccess(dispatch, "New Auction is Created"),
    onError: (err: Error) => {
      console.error(`\nError in createAuction tx:`, err);
      handleError(dispatch);
    },
  });
};

const isAuctionNameAvailableQuery = async (isAuctionNameAvailable: any, bytes32NameString: string) => {
  let result;
  await isAuctionNameAvailable({
    params: {
      abi: auctionFactoryAbi,
      contractAddress: AUCTION_FACTORY_ADDRESS,
      functionName: "s_auctionNameTaken",
      params: {
        _bytes32NameString: ethers.utils.hexValue(bytes32NameString),
      }
    },
    onSuccess: (result: any) => {
      console.log(`\nResult of isAuctionNameAvailableQuery:`, result);
      result = result;
    },
    onError: (err: Error) => {
      console.error(`\nError in isAuctionNameAvailableQuery:`, err);
    }
  })
  return result;
}

export { createAuctionExecute, isAuctionNameAvailableQuery };