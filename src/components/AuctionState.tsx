const AuctionState = ({auctionState} : {auctionState: number}) => {
  const mappedAuctionState = (auctionState: number) => {
    switch (auctionState) {
      case 0:
        return "Closed";
      case 1:
        return "Registering";
      case 2:
        return "Open";
      default:
        return "Closed";
    }
  };
  return (
    <div>
      <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
        Auction State: {mappedAuctionState(auctionState)}
      </span>
    </div>
  );
};

export default AuctionState;
