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
  const [interval, setInt] = React.useState(1);

  React.useEffect(() => {
    if (!account && !isConnected) return;
    console.log("refresh: ", interval);
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
  }, [isConnected, account, setResults, Moralis.Web3API.account, interval]);

  React.useEffect(() => {
    setInterval(() => {
      setInt((prev) => prev + 1);
    }, 30000);
  }, []);

  return { results, loading };
};

export default useInventory;
