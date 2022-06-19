import InfoCards from "../components/InfoCards";
import AdminButtons from "../components/auctionActions/AdminButtons";
import { useNotification } from "web3uikit";
import { useContext, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { AuctionContext, IAuctionContext } from "../context/AuctionContext";
import useAuctionCalls from "../hooks/useAuctionCalls";
import { checkOwnership } from "../helperFunctions/contractQueries";
import { TGetOwner, TNotificationDispatch } from "../@auctionTypes";

const AdminPage = () => {
  const { addrs, chainId } = useContext(AuctionContext) as IAuctionContext;
  const dispatch = useNotification();
  const { isWeb3Enabled, account } = useMoralis();
  const { getOwner } = useAuctionCalls(addrs, chainId);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (isWeb3Enabled) {
      checkOwnership(getOwner as TGetOwner, account as string, dispatch as TNotificationDispatch, setIsOwner);
    }
  }, [isWeb3Enabled, isOwner, account]);

  return (
    <>
      <InfoCards />
      <AdminButtons isOwner={isOwner} />
    </>
  );
};

export default AdminPage;
