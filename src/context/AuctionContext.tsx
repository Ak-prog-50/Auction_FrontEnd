// import { createContext, useState } from "react";
// import abi from "../settings/abi.json";
// import contractAddrs from "../settings/contractAddresses.json";
// import { useChain } from "react-moralis";

// interface contractAddrsInterface {
//   [key: string]: string;
// }

// interface AuctionContextInterface {
//   addrs: contractAddrsInterface;
//   chainId: string | null;
//   abi: object | undefined;
// }

// const initialState: AuctionContextInterface = {
//   addrs: contractAddrs,
//   chainId: null,
//   abi: abi,
// };

// export const AuctionContext = createContext(
//   initialState as AuctionContextInterface
// );

// const AuctionProvider = (props: any) => {
//   const { chainId: chainIdHex } = useChain();
//   const chainId = chainIdHex ? parseInt(chainIdHex, 16).toString() : null;

//   const [auctionState, setAuctionState] = useState(initialState);
//   return (
//     <AuctionContext.Provider value={{auctionState, setAuctionState}}>
//       <>{props.children}</>
//     </AuctionContext.Provider>
//   );
// };

// export default AuctionProvider;

export {}