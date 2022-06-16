import { ConnectButton } from "web3uikit"
import { ETHERSCAN_URL } from "../constants"

const Header = () => {
  return (
    <header>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:justify-between sm:items-center sm:flex">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              🤳 The Auction
            </h1>
          </div>

          <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:mt-0 sm:items-center">
            <button
              className="inline-flex items-center justify-center px-5 py-3 text-gray-500 transition border border-gray-200 rounded-lg hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring"
              type="button"
            >
              <a href={ETHERSCAN_URL} target="_blank" rel="noreferrer"><span className="text-sm font-medium"> View At Etherscan </span></a>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 ml-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>

            <div
              className="px-3 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring"
            >
             <ConnectButton moralisAuth={false} />
            </div>
            

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
