import { TNotificationDispatch } from "../@auctionTypes";
import { handleError, handleSuccess } from "./notificationHandlers";
import auctionFactoryAbi from "../settings/auctionFactoryAbi.json";
import { AUCTION_FACTORY_ADDRESS } from "../settings/constants";
import { BigNumber, ethers } from "ethers";
import auctionAbi from "../settings/abi.json";

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
    onSuccess: () => handleSuccess(dispatch, "Your Auction will be creaetd shortly!"),
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

const getAuctionsByAddressQuery = async (accountAddress: string | null) => {
  if (!accountAddress) return;
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const auctionFactoryContract = new ethers.Contract(
    AUCTION_FACTORY_ADDRESS,
    auctionFactoryAbi,
    provider
  );
  let auctions: string[] = [];
  try {
    const auctionInfoList = await auctionFactoryContract.getAuctionsByAddress(accountAddress);
    auctions = auctionInfoList.map((auctionInfo: any) => auctionInfo.auction);
  } catch (error) {
    console.error("Error in getAuctionsByAddressQuery: ", error);
  }
  return auctions;
};

const filterAuction = async (accountAddress: string, auctionAddress: string) => {
  if (!accountAddress) return;
  let auctionInfo: any[] = [];
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const auctionFactoryContract = new ethers.Contract(
    AUCTION_FACTORY_ADDRESS,
    auctionFactoryAbi,
    provider
  );
  try {
    const auctionInfoList: [] = await auctionFactoryContract.getAuctionsByAddress(accountAddress);
    // filter auctioninfo list by auctionaddress
    auctionInfo = auctionInfoList.filter((auctionInfo: any) => auctionInfo.auction === auctionAddress);
  } catch (error) {
    console.error("Error in getAuctionsByAddressQuery: ", error);
  }
  return auctionInfo;
}

const getERC20Addr = async (accountAddress: string, auctionAddress: string) => {
  const auctionOwner = await getContractOwner(auctionAddress);
  const auctionInfo = await filterAuction(auctionOwner, auctionAddress);
  if (!auctionInfo) return;
  return auctionInfo[0]?.auctionToken;
}

const getNFTAddr = async (accountAddress: string, auctionAddress: string) => {
  const auctionOwner = await getContractOwner(auctionAddress);
  console.log(auctionOwner, "auctionOwner");
  const auctionInfo = await filterAuction(auctionOwner, auctionAddress);
  if (!auctionInfo) return;
  return auctionInfo[0]?.auctionNFT;
}

const getContractOwner = async (contractAddr: string) => {
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const contract = new ethers.Contract(
    contractAddr,
    auctionAbi,
    provider
  );
  let owner: string = "";
  try {
    owner = await contract.owner();
  } catch (error) {
    console.error("Error in getContractOwner: ", error);
  }
  return owner;
}

export {
  createAuctionExecute,
  isAuctionNameTakenQuery,
  getAuctionsByAddressQuery,
  getERC20Addr,
  getNFTAddr,
};
