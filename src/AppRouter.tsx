import Header from "./components/Header";
import AuctionOpen from "./containers/AuctionOpen";
import { useContext } from "react";
import AuctionState from "./components/AuctionState";
import AuctionClosed from "./containers/AuctionClosed";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./containers/AdminPage";
import { AuctionContext, IAuctionContext } from "./context/AuctionContext";

function AppRouter() {
  const { auctionState } = useContext(AuctionContext) as IAuctionContext;

  return (
    <>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <Header />
        <AuctionState />
        <Routes>
          <Route
            path="/"
            element={
              <>{auctionState === 0 ? <AuctionClosed /> : <AuctionOpen />}</>
            }
          />

          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default AppRouter;
