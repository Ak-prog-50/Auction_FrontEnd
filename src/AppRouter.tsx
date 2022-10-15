import Header from "./components/Header";
import AuctionOpen from "./containers/AuctionOpen";
import { useContext } from "react";
import AuctionState from "./components/AuctionState";
import AuctionClosed from "./containers/AuctionClosed";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./containers/AdminPage";
import { AuctionContext, IAuctionContext } from "./context/AuctionContext";
import LayoutWrapper from "./components/LayoutWrapper";
import AuctionCreator from "./containers/AuctionCreator";

function AppRouter() {
  const { auctionState } = useContext(AuctionContext) as IAuctionContext;

  return (
    <>
      <LayoutWrapper>
        <Header />
        <AuctionState />
        <Routes>
        <Route
            path="/"
            element={<AuctionCreator />}
        />

          <Route
            path="/:auctionName"
            element={auctionState === 0 ? <AuctionClosed /> : <AuctionOpen />}
          />

          <Route path="/:auctionName/admin" element={<AdminPage />} />
        </Routes>
      </LayoutWrapper>

      <Footer />
    </>
  );
}

export default AppRouter;
