import { useWeb3ExecuteFunction } from "react-moralis";

const useAuctionFactoryCalls = () => {
  const {
    fetch: createAuction,
    isFetching: fetchingCreateAuction,
    isLoading: loadingCreateAuction,
  } = useWeb3ExecuteFunction();

  return {
    createAuction,
    fetchingCreateAuction,
    loadingCreateAuction,
  };
};

export default useAuctionFactoryCalls;
