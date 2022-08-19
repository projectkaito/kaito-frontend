import React from "react";
import { defaultChainName } from "src/config";
import { MoralisNFT } from "src/types/moralis";
import { sleep } from "src/utils";
import useMoralis from "./useMoralis";

const useMoralisMetadata = (address?: string, tokenId?: string) => {
  const { isConnected, Moralis } = useMoralis();
  const [nftData, setNftData] = React.useState<Partial<MoralisNFT>>({});
  const [loading, setLoading] = React.useState(false);

  const fetchMetadata = React.useCallback(async () => {
    if (!address || !tokenId || !isConnected) return;
    try {
      setLoading(true);
      let res = await Moralis.Web3API.token.getTokenIdMetadata({
        address: address,
        token_id: tokenId,
        chain: defaultChainName,
      });
      setNftData({ ...res, metadata: JSON.parse(res.metadata!) });
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [isConnected, address, tokenId, Moralis]);

  const refresh = React.useCallback(async () => {
    if (!address || !tokenId || !isConnected) return;
    await Moralis.Web3API.token.reSyncMetadata({
      chain: defaultChainName,
      address: address,
      token_id: tokenId,
    });
    await sleep(1000);
    await fetchMetadata();
  }, [fetchMetadata, Moralis, address, tokenId, isConnected]);

  React.useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  return { nftData, refresh, loading };
};

export default useMoralisMetadata;
