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

const AdminPage = () => {
  const { addrs, chainId, auctionState } = useContext(AuctionContext) as IAuctionContext;
  const dispatch = useNotification();
  const { isWeb3Enabled, account } = useMoralis();
  const [ isOwner, setIsOwner ] = useState(false);

  const { runContractFunction: getOwner } = useWeb3Contract({//!
    abi: abi,
    contractAddress: chainId ? addrs[chainId] : undefined,
    functionName: "owner",
  });

  const checkOwnership = async () => {
    const owner = await getOwner({
      onError: (err) => console.error("Error in getOwner", err),
    });
    if (getAddress(owner as string) !== getAddress(account as string)) {
      handleWarning(dispatch, "You are not the owner of this contract. Only owner can call admin functions!");
    } else {
      setIsOwner(true);
    }
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      checkOwnership();
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
