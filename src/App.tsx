import "./App.css";
import Routes from "./Routes";
import { UtilsProvider } from "@react-dapp/utils";
import { useEagerConnect, useWallet } from "@react-dapp/wallet";
import { ModalObject, ModalProvider } from "./context/ModalContext";
import Hello from "./modals/Hello/Hello";
import React from "react";

const allModals: ModalObject[] = [
  {
    name: "Hello",
    component: Hello,
  },
];

function App() {
  const { library, account } = useWallet();
  useEagerConnect(Boolean(localStorage.getItem("Allow-Wallet-Reconnect")));

  React.useEffect(() => {
    if (account) {
      localStorage.setItem("Allow-Wallet-Reconnect", "true");
    }
  }, [account]);

  return (
    <UtilsProvider config={{ provider: library }}>
      <ModalProvider allModals={allModals}>
        <Routes />
      </ModalProvider>
    </UtilsProvider>
  );
}

export default App;
