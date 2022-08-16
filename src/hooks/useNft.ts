import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { TokenStandard } from "../types/commonTypes";
import { ERC721_INTERFACE, ERC1155_INTERFACE } from "../config/config";
import ERC721_ABI from "../assets/abi/erc721Abi.json";
import ERC1155_ABI from "../assets/abi/erc1155Abi.json";
import ERC165_ABI from "../assets/abi/erc165Abi.json";
import { useContract } from "wagmi";
import useWallet from "./useWallet";

export const useNft = (address: string | undefined) => {
  const [contract, setContract] = useState<Contract>();
  const [tokenStandard, setTokenStandard] = useState<TokenStandard>();
  const { signer, provider } = useWallet();
  const erc165 = useContract({
    addressOrName: address!,
    contractInterface: ERC165_ABI,
    signerOrProvider: signer || provider,
  });

  useEffect(() => {
    const checkInterface = async () => {
      if (!erc165 || !address) return;

      const isErc721 = await erc165.supportsInterface(ERC721_INTERFACE);
      if (isErc721) {
        const _erc721 = new Contract(address, ERC721_ABI, signer || provider);
        setContract(_erc721);
        setTokenStandard(TokenStandard.ERC721);
      } else {
        const isErc1155 = await erc165.supportsInterface(ERC1155_INTERFACE);
        if (isErc1155) {
          const _erc1155 = new Contract(address, ERC1155_ABI, signer || provider);
          setContract(_erc1155);
          setTokenStandard(TokenStandard.ERC1155);
        }
      }
    };
    checkInterface();
  }, [erc165, address, provider, signer]);

  return { contract, tokenStandard };
};
