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
  kaitoWhitelist: "0xfD8eeFBe27Ce0a5EFE5f773B66ED159224c7Ed6b",
};

export const addressesByChainId: { [key: number]: Addresses } = {
  [chainId.goerli]: goerliAddresses,
  [chainId.rinkeby]: rinkebyAddresses,
};
