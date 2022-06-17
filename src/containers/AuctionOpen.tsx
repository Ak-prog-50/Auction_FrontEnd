import EnterAuction from "../components/auctionActions/EnterAuction";
import PlaceBid from "../components/auctionActions/PlaceBid";
import ProductCard from "../components/ProductCard";

const AuctionOpen = () => {
  return (
    <div className="max-w-sm mx-auto space-y-5">
      <ProductCard />

      <div className="flex rounded-md shadow-sm justify-center" role="group">
        <EnterAuction />
        {/* <PlaceBid /> */}
      </div>

    </div>
  );
};

export default AuctionOpen;
