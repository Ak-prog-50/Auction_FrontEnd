import EnterAuction from "../components/auctionActions/EnterAuction";
import PlaceBid from "../components/auctionActions/PlaceBid";
import ProductCard from "../components/ProductCard";
import { IContractAddrs } from "../App";

export interface IAuctionProps {
  addrs: IContractAddrs;
  chainId: string | null;
  auctionState: number;
}

const AuctionOpen = ({ addrs, chainId, auctionState }: IAuctionProps) => {
  return (
    <div className="max-w-sm mx-auto space-y-5">
      <ProductCard />

      <div className="flex rounded-md shadow-sm justify-center" role="group">
        {auctionState === 1 ? (
          <EnterAuction
            addrs={addrs}
            chainId={chainId}
            auctionState={auctionState}
          />
        ) : (
          <PlaceBid addrs={addrs} chainId={chainId} auctionState={auctionState}/>
        )}
      </div>
    </div>
  );
};

export default AuctionOpen;