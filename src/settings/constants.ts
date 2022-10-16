import { parseEther } from "@ethersproject/units";

export const AUCTION_FACTORY_ADDRESS =
  "0xC59791F4455d91787A85ee3dE505bDdBb9A1B0a3";

export const FACTORY_BLOCKSCAN_URL = `https://mumbai.polygonscan.com/address/${AUCTION_FACTORY_ADDRESS}#readContract`;
// export const NFT_ADDR = "0x7272924794377Dd0EF0E92c0F675beb488b32443";
// export const ERC20_ADDR = "0x35f27f917C3F73DBD1015A39d0C63FecDBf43d6D";
export const MAX_TOKENS = 100;
export const NFT_TOKEN_ID = parseEther("0"); // parseEther is used as a replacement to BigNumber.from(0)

export const GET_BLOCKSCAN_URL = (contractAddr: string) =>
  `https://mumbai.polygonscan.com/address/${contractAddr}`;
