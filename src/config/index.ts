import { WhitelistUserType } from "src/types/apis";
import { chainId } from "wagmi";
import { addressesByChainId } from "./constants/contracts";

/**
 * This is the default chain id of the dapp.
 */
export const defaultChainId = chainId.rinkeby;
export const defaultChainName = "rinkeby";

/**
 * This is current type of minting
 */
export const currentWhitelistType: WhitelistUserType = WhitelistUserType.Team;
/**
 * All the contract addresses used throughout the dapp.
 */
export const Contracts = addressesByChainId[defaultChainId];
