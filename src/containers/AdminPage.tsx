import InfoCards from "../components/InfoCards";
import AdminButtons from "../components/AdminButtons";
import { IAuctionProps } from "./AuctionOpen";
import abi from "../settings/abi.json";
import { useNotification } from "web3uikit";
import { useWeb3Contract } from "react-moralis";
import { useContext, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { getAddress } from "@ethersproject/address";
import { AuctionContext, IAuctionContext } from "../context/AuctionContext";
import { handleWarning } from "../helperFunctions/notificationHandlers";
import useAuctionCalls from "../hooks/useAuctionCalls";
import { checkOwnership } from "../helperFunctions/contractQueries";

const AdminPage = () => {
  const { addrs, chainId } = useContext(AuctionContext) as IAuctionContext;
  const dispatch = useNotification();
  const { isWeb3Enabled, account } = useMoralis();
  const { getOwner } = useAuctionCalls(addrs, chainId)
  const [ isOwner, setIsOwner ] = useState(false);

  useEffect(() => {
    if (isWeb3Enabled) {
      checkOwnership(getOwner, account as string, dispatch, setIsOwner);
    }
  }, [isWeb3Enabled, isOwner, account]);

  return (
    <>
      <InfoCards />
      <AdminButtons
        isOwner={isOwner}
      />
    </>
  );
};

export default AdminPage;
