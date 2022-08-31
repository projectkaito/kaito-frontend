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
  kaitoWhitelist: "0xf2d5EfF1c5aD940FcAa08C719de87980DB8dD84e",
};

export const addressesByChainId: { [key: number]: Addresses } = {
  [chainId.goerli]: goerliAddresses,
  [chainId.rinkeby]: rinkebyAddresses,
};
