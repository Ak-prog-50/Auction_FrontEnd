import EnterAuction from "../components/auctionActions/EnterAuction";
import PlaceBid from "../components/auctionActions/PlaceBid";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { AuctionContext, IAuctionContext } from "../context/AuctionContext";

const AuctionOpen = () => {
  const { auctionState } = useContext(AuctionContext) as IAuctionContext;
  return (
    <div className="max-w-sm mx-auto space-y-5">
      <ProductCard />

      <div className="flex rounded-md shadow-sm justify-center" role="group">
        {auctionState === 1 ? <EnterAuction /> : <PlaceBid />}
      </div>
    </div>
  );
};

export default AuctionOpen;
