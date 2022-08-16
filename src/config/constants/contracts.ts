import { chainId } from "wagmi";
interface Addresses {
  zeroAddress: string;
  kaitoWhitelist: string;
}

const goerliAddresses: Addresses = {
  zeroAddress: "0x0000000000000000000000000000000000000000",
  kaitoWhitelist: "0xF4bC89e45ed253c483e847D2582c3b50Efa3615b",
};

export const addressesByChainId: { [key: number]: Addresses } = {
  [chainId.goerli]: goerliAddresses,
};
