import { chainId } from "wagmi";
interface Addresses {
  zeroAddress: string;
  kaitoWhitelist: string;
}

const goerliAddresses: Addresses = {
  zeroAddress: "0x0000000000000000000000000000000000000000",
  kaitoWhitelist: "0x309180cA767E71341571a8Bfb7079cCEB3478e12",
};

const rinkebyAddresses: Addresses = {
  zeroAddress: "0x0000000000000000000000000000000000000000",
  kaitoWhitelist: "0xC7F26f4AD4c0Fbbf9d9Bd9318eeD6De9C61A1065",
};

export const addressesByChainId: { [key: number]: Addresses } = {
  [chainId.goerli]: goerliAddresses,
  [chainId.rinkeby]: rinkebyAddresses,
};
