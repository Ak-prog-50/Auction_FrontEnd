import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";
import {
  createAuctionExecute,
  getAuctionsByAddressQuery,
  isAuctionNameTakenQuery,
} from "../helperFunctions/auctionFactoryQueries";
import { handleWarning } from "../helperFunctions/notificationHandlers";
import useAuctionFactoryCalls from "../hooks/useAuctionFactoryCalls";
import { GET_BLOCKSCAN_URL } from "../settings/constants";
import Spinner from "../components/Spinner";
import { getAuctionName } from "../helperFunctions/contractQueries";

const AuctionList = () => {
  const [auctions, setAuctions] = useState<string[]>([]);
  const [auctionNames, setAuctionNames] = useState<string[]>([]);
  const { account, isWeb3Enabled, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    if (!isWeb3Enabled || isWeb3EnableLoading) return;
    async function fetchAuctionFactoryData() {
      const auctions = await getAuctionsByAddressQuery(account);
      console.log("auctions", auctions);
      setAuctions(auctions as string[]);
      if (!auctions) return;
      const auctionNames: string[] = [];
      for (let i = 0; i < auctions.length; i++) {
        console.log("inside for loop", i, auctions.length);
        const auctionAddress = auctions[i];
        const auctionName = await getAuctionName(auctionAddress);
        if (auctionName) {
          auctionNames.push(auctionName);
        }
      }
      if (auctionNames.length !== auctions.length) {
        console.log("auctionNames", auctionNames);
        console.log("auctions", auctions);
        console.error("Auction Names and Auctions are not the same length");
        return;
      }
      setAuctionNames(auctionNames);
    }
    fetchAuctionFactoryData();
  }, [account, isWeb3Enabled, isWeb3EnableLoading]);

  return (
    <div className="m-10 bg-slate-300">
      <h2 className="text-2xl underline">Your Auctions</h2>
      <ol>
        {auctions.map((i) => (
          <li key={auctions.indexOf(i)}>
            <a
              href={GET_BLOCKSCAN_URL(i)}
              target="_blank"
              className="text-blue-900 bold no-underline hover:underline hover:text-blue-700"
            >
              {auctionNames[auctions.indexOf(i)]}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};

const CreateAuctionForm = () => {
  const dispatch = useNotification();
  const { createAuction, fetchingCreateAuction, loadingCreateAuction } =
    useAuctionFactoryCalls();
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
    ];
    const keccak256AbiEncodedNameString = ethers.utils.solidityKeccak256(
      ["string"],
      [formData.auction_name]
    );
    console.log("keccak256AbiEncodedNameString", keccak256AbiEncodedNameString);
    const isAuctionNameTaken = await isAuctionNameTakenQuery(
      keccak256AbiEncodedNameString
    );
    if (isAuctionNameTaken) {
      handleWarning(
        dispatch,
        "Auction name is already taken. Please choose another name."
      );
      return;
    }
    await createAuctionExecute(createAuctionArgs, createAuction, dispatch);
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
      {fetchingCreateAuction || loadingCreateAuction ? (
        <Spinner dimensions="lg" />
      ) : (
        <button type="submit" form="create_auction_form" className="mt-5">
          Create Auction
        </button>
      )}
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
