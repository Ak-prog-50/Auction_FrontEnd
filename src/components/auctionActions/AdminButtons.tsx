
import { useNotification } from "web3uikit";
import { useContext } from "react";
import { AuctionContext, IAuctionContext } from "../../context/AuctionContext";
import {
  handleError,
  handleSuccess,
} from "../../helperFunctions/notificationHandlers";
import useAuctionCalls from "../../hooks/useAuctionCalls";
import Spinner from "../Spinner";
import { initSetup } from "../../helperFunctions/contractQueries";

interface IAdminButtonsProps {
  isOwner: boolean
}

const AdminButtons = ({ isOwner }: IAdminButtonsProps) => {
  const { addrs, chainId, auctionState } = useContext(
    AuctionContext
  ) as IAuctionContext;
  const dispatch = useNotification();
  const {
    startRegistering,
    fetchingRegistering,
    loadingRegistering,
    increaseAllowance,
    fetchingAllowance,
    loadingAllowance,
    approveNFT,
    fetchingApprove,
    loadingApprove,
    openAuction,
    fetchingOpenAuction,
    loadingOpenAuction,
    endAuction,
    fetchingEndAuction,
    loadingEndAuction,
  } = useAuctionCalls(addrs, chainId);



  return (
    <div className="mx-7 mt-12">
      <button
        type="button"
        className="block w-1/3 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
        onClick={() => {
          if (!isOwner) {
            handleError(dispatch, "Only owner can call admin functions!");
            return;
          }
          initSetup(auctionState, startRegistering, increaseAllowance, approveNFT, dispatch);
        }}
        disabled={
          fetchingRegistering ||
          loadingRegistering ||
          fetchingAllowance ||
          loadingAllowance ||
          fetchingApprove ||
          loadingApprove
        }
      >
        {fetchingRegistering ||
        loadingRegistering ||
        fetchingAllowance ||
        loadingAllowance ||
        fetchingApprove ||
        loadingApprove ? (
          <Spinner />
        ) : (
          <span>Start Registering & Approve Transfers</span>
        )}
      </button>

      <button
        type="button"
        className="block w-1/3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={async () => {
          if (!isOwner) {
            handleError(dispatch, "Only owner can call admin functions!");
            return;
          }
          await openAuction({
            onSuccess: () => handleSuccess(dispatch),
            onError: () => handleError(dispatch),
          });
        }}
      >
        {loadingOpenAuction || fetchingOpenAuction ? (
          <Spinner />
        ) : (
          <span>Open Auction</span>
        )}
      </button>

      <button
        type="button"
        className="block w-1/3 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={async () => {
          if (!isOwner) {
            handleError(dispatch, "Only owner can call admin functions!");
            return;
          }
          await endAuction({
            onSuccess: () => handleSuccess(dispatch),
            onError: () => handleError(dispatch),
          });
        }}
      >
        {loadingEndAuction || fetchingEndAuction ? (
          <Spinner />
        ) : (
          <span>End Auction</span>
        )}
      </button>
    </div>
  );
};

export default AdminButtons;
