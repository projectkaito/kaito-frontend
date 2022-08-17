import React from "react";
import Moralis from "moralis-v1";
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from "src/config/config";

interface IMoralisContext {
  isConnected: boolean;
}

export const MoralisContext = React.createContext<IMoralisContext>({
  isConnected: false,
});

export const MoralisProvider: React.FC = ({ children }) => {
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    Moralis.start({ serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APP_ID }).then((res) => {
      setIsConnected(true);
    });
  }, []);

  return (
    <MoralisContext.Provider
      value={{
        isConnected,
      }}
    >
      {children}
    </MoralisContext.Provider>
  );
};
