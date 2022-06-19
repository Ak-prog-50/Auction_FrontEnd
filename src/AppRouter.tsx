import Header from "./components/Header";
import AuctionOpen from "./containers/AuctionOpen";
import abi from "./settings/abi.json";
import contractAddrs from "./settings/contractAddresses.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useContext, useEffect, useState } from "react";
import AuctionState from "./components/AuctionState";
import AuctionClosed from "./containers/AuctionClosed";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./containers/AdminPage";
import { AuctionContext, IAuctionContext } from "./context/AuctionContext";

export interface IContractAddrs {
  [key: string]: string;
}

function AppRouter() {
  // const addrs: IContractAddrs = contractAddrs;
  // const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  // const chainId = chainIdHex ? parseInt(chainIdHex, 16).toString() : null;
  const { auctionState, chainId, addrs } = useContext(AuctionContext) as IAuctionContext;

  return (
    <>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <Header />
        <AuctionState auctionState={auctionState} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {auctionState === 0 ? (
                  <AuctionClosed
                    addrs={addrs}
                    chainId={chainId}
                    auctionState={auctionState}
                  />
                ) : (
                  <AuctionOpen
                    addrs={addrs}
                    chainId={chainId}
                    auctionState={auctionState}
                  />
                )}
              </>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminPage
                addrs={addrs}
                chainId={chainId}
                auctionState={auctionState}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default AppRouter;
