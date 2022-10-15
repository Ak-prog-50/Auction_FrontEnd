import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import { useNotification } from "web3uikit";
import { createAuctionExecute, isAuctionNameTakenQuery } from "../helperFunctions/auctionFactoryQueries";
import { handleWarning } from "../helperFunctions/notificationHandlers";
import useAuctionFactoryCalls from "../hooks/useAuctionFactoryCalls";

const AuctionList = () => {
  const [auctions] = useState(["The Villa House Auction", "Gems Auction"]);

  return (
    <div className="m-10 bg-slate-500">
      <h2 className="text-2xl underline">Your Auctions</h2>
      <ol>
        {auctions.map((i) => (
          <li key={auctions.indexOf(i)}>
            <a href="">{i}</a>
          </li>
        ))}
      </ol>
    </div>
  );
};

const CreateAuctionForm = () => {
  const dispatch = useNotification()
  const { createAuction } = useAuctionFactoryCalls()
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Submitted");
    const formData = Object.fromEntries(new FormData(e.target));
    const createAuctionArgs = [
      formData.auction_name,
      formData.nft_name,
      formData.nft_address,
      `${formData.auction_name}-coin`,
      `${formData.auction_name}-c`,
      formData.max_bids ? formData.max_bids : BigNumber.from(10).pow(17),
    ]
    const keccak256AbiEncodedNameString = ethers.utils.solidityKeccak256(["string"], [formData.auction_name])
    console.log("keccak256AbiEncodedNameString", keccak256AbiEncodedNameString)
    const isAuctionNameTaken = await isAuctionNameTakenQuery(keccak256AbiEncodedNameString)
    if (isAuctionNameTaken) {
      handleWarning(dispatch, "Auction name is already taken. Please choose another name.")
      return;
    }
    await createAuctionExecute(createAuctionArgs, createAuction, dispatch)

  };
  return (
    <form
      className="w-full max-w-lg m-10"
      id="create_auction_form"
      onSubmit={handleOnSubmit}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Auction Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-first-name"
            name="auction_name"
            type="text"
            placeholder="Jane"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            NFT Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-first-name"
            name="nft_name"
            type="text"
            placeholder="Jane"
            required
          />
          {/* <p className="text-red-500 text-xs italic">
          Please fill out this field.
        </p> */}
        </div>

        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            NFT Address
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            name="nft_address"
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">

        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Max Bids
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            name="max_bids"
            type="number"
            placeholder="1000"
          />
        </div>
      </div>

      <button type="submit" form="create_auction_form" className="mt-5">
        Create Auction
      </button>
    </form>
  );
};

const AuctionCreator = () => {
  return (
    <div className="mt-10">
      <h1 className="text-center">Auction Creator</h1>
      <AuctionList />
      <CreateAuctionForm />
    </div>
  );
};

export default AuctionCreator;
