import ProductCard from "../components/ProductCard";

const AuctionOpen = () => {
  return (
    <div className="max-w-sm mx-auto space-y-5">
      <ProductCard />

      <div className="inline-flex rounded-md shadow-sm px-12" role="group">
        <button
          type="button"
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Enter Auction
        </button>
        <button
          type="button"
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-lg border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Place Bid
        </button>
      </div>
    </div>
  );
};

export default AuctionOpen;
