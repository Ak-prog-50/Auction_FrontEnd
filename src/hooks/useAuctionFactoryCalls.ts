import { useWeb3Contract, useWeb3ExecuteFunction } from "react-moralis";
import auctionFactoryAbi from "../settings/auctionFactoryAbi.json";
import { AUCTION_FACTORY_ADDRESS } from "../settings/constants";

const useAuctionFactoryCalls = () => {
  const { fetch: isAuctionNameAvailable } = useWeb3ExecuteFunction();

  const {
    fetch: createAuction,
    isFetching: fetchingCreateAuction,
    isLoading: loadingCreateAuction,
  } = useWeb3ExecuteFunction();

  return {
    createAuction,
    fetchingCreateAuction,
    loadingCreateAuction,
    isAuctionNameAvailable,
  };
};

export default useAuctionFactoryCalls;
