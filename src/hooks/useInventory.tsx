import React from "react";
import { Contracts, defaultChainName } from "src/config";
import { MoralisNFT } from "src/types/moralis";
import useMoralis from "./useMoralis";
import useWallet from "./useWallet";

const useInventory = () => {
  const { account } = useWallet();
  const { isConnected, Moralis } = useMoralis();
  const [results, setResults] = React.useState<MoralisNFT[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!account && !isConnected) return;
    setLoading(true);
    Moralis.Web3API.account
      .getNFTs({
        chain: defaultChainName,
        address: account!,
        token_addresses: [Contracts.kaitoWhitelist],
      })
      .then((res) => {
        let result = res.result;
        console.log("res", res);
        setResults(result!.map((item: any) => ({ ...item, metadata: JSON.parse(item.metadata) })));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [isConnected, account, setResults, Moralis.Web3API.account]);

  return { results, loading };
};

export default useInventory;
