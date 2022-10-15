import { parseEther } from "@ethersproject/units";

export const AUCTION_FACTORY_ADDRESS = "0x08305a9CFe3f29BeaA50AD43f4E2b609320eFF39";

export const ETHERSCAN_URL = "https://rinkeby.etherscan.io/address/0x47410f30162fe970a50f07ffd9abf240f44f0812#readContract";
export const NFT_ADDR = "0x7272924794377Dd0EF0E92c0F675beb488b32443";
export const ERC20_ADDR = "0x35f27f917C3F73DBD1015A39d0C63FecDBf43d6D";
export const MAX_TOKENS = 100;
export const NFT_TOKEN_ID = parseEther("0") // parseEther is used as a replacement to BigNumber.from(0)