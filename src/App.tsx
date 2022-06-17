import Header from "./components/Header";
import AuctionOpen from "./containers/AuctionOpen";
import abi from "./settings/abi.json";
import contractAddrs from "./settings/contractAddresses.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react"
import AuctionState from "./components/AuctionState";

export interface IContractAddrs {
  [key: string]: string;
}

function App() {
  const addrs: IContractAddrs = contractAddrs;
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = chainIdHex ? parseInt(chainIdHex, 16).toString() : null;
  const [ auctionState, setAuctionState ] = useState(0)

  const { runContractFunction : getauctionState  } =
  useWeb3Contract({
    abi: abi,
    contractAddress: chainId ? addrs[chainId] : undefined,
    functionName: "s_auctionState",
  });

  const fetchData = async () => {
    const auctionState = await getauctionState({
      onSuccess: (auctionState: any) => console.log(auctionState, "auctionState"),
      onError: (err: Error) => console.error(err)
    });
    setAuctionState(auctionState as number);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
        fetchData()
    }
}, [isWeb3Enabled])
  
  return (
    <>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <Header />
        <AuctionState auctionState={auctionState}/>
        <AuctionOpen addrs={addrs} chainId={chainId} auctionState={auctionState}/>
      </div>
    </>
  );
}

export default App;
