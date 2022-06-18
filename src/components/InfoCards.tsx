import { mappedAuctionState } from "./AuctionState";

// add highest bid from context
const InfoCards = ({auctionState} : any) => {
  return (
    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 mt-12">
      <div className="shadow-lg bg-red-400 border-l-8 hover:bg-red-500 mb-2 p-2 md:w-1/4 mx-2">
        <div className="p-4 flex flex-col">
          <a href="#" className="no-underline text-white text-2xl">
            {mappedAuctionState(auctionState)}
          </a>
          <a
            href="https://www.etherscan.io"
            className="no-underline text-white text-lg"
          >
            Auction State
          </a>
        </div>
      </div>

      <div className="shadow bg-blue-400 border-l-8 hover:bg-blue-500 mb-2 p-2 md:w-1/4 mx-2">
        <div className="p-4 flex flex-col">
          <a href="#" className="no-underline text-white text-2xl">
            0 ETH
          </a>
          <a
            href="https://www.etherscan.io"
            className="no-underline text-white text-lg"
          >
            Highest Bid
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
