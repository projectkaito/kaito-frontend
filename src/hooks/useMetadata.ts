import { useEffect, useState } from "react";
import { TokenStandard } from "src/types/commonTypes";
import { fetchIpfs } from "../utils/index";
import { useNft } from "./useNft";

/**
 * This hook fetches the metadata of an ERC1155 token.
 *
 * @param contractAddress Address of contract
 *
 */
export const useMetadata = (contractAddress: string | undefined, tokenId: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<any>();
  const { contract, tokenStandard } = useNft(contractAddress);

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!contract || !tokenStandard || !contractAddress || !tokenId) return;
      try {
        setLoading(true);
        let uri: string =
          tokenStandard === TokenStandard.ERC721
            ? await contract.tokenURI(tokenId)
            : tokenStandard === TokenStandard.ERC1155
            ? await contract.uri(tokenId)
            : undefined;
        if (uri) {
          uri = uri.replaceAll("{address}", contractAddress);
          uri = uri.replaceAll("{id}", tokenId);
          let data;
          if (uri.includes("ipfs://")) {
            data = await fetchIpfs(uri);
            setMetadata(data);
          } else {
            data = await (await fetch(uri)).json();
            if (data?.image?.includes("ipfs://")) {
              data.image = `https://ipfs.io/${data.image.replace("ipfs://", "")}`;
            }
            setMetadata(data);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        throw "Unable to fetch Metadata";
      }
    };

    fetchMetadata();
  }, [contractAddress, contract, tokenId, tokenStandard]);

  return { metadata, loading };
};
