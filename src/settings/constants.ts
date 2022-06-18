import { parseEther } from "@ethersproject/units";

export const ETHERSCAN_URL = "https://etherscan.io/";
export const NFT_ADDR = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const ERC20_ADDR = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const MAX_TOKENS = 100;
export const NFT_TOKEN_ID = parseEther("0") // parseEther is used as a replacement to BigNumber.from(0)