import { parseEther } from "@ethersproject/units";

export const ETHERSCAN_URL = "https://rinkeby.etherscan.io/address/0x3d08a50da1f2764222bafdda4d51b65cd3f46ab2#readContract";
export const NFT_ADDR = "0x7272924794377Dd0EF0E92c0F675beb488b32443";
export const ERC20_ADDR = "0x35f27f917C3F73DBD1015A39d0C63FecDBf43d6D";
export const MAX_TOKENS = 100;
export const NFT_TOKEN_ID = parseEther("0") // parseEther is used as a replacement to BigNumber.from(0)