import { chainId } from "wagmi";
import { addressesByChainId } from "./constants/contracts";

/**
 * This is the default chain id of the dapp.
 */
export const defaultChainId = chainId.rinkeby;
/**
 * All the contract addresses used throughout the dapp.
 */
export const Contracts = addressesByChainId[defaultChainId];