import Header from "./components/Header";
import AuctionOpen from "./containers/AuctionOpen";
import { useContext } from "react";
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
                  />
                ) : (
                  <AuctionOpen
                  />
                )}
              </>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminPage
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
