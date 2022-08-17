import { useContext } from "react";
import { MoralisContext } from "src/components/MoralisContext/MoralisContext";
import Moralis from "moralis-v1";

const useMoralis = () => {
  const { isConnected } = useContext(MoralisContext);

  return { isConnected, Moralis };
};

export default useMoralis;
