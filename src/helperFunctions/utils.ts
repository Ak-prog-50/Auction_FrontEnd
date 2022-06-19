export const mapAuctionState = (auctionState: number) => {
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
