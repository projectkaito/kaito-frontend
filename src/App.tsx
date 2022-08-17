import "./App.css";
import Routes from "./Routes";
import { ModalObject, ModalProvider } from "./context/ModalContext";
import Hello from "./modals/Hello/Hello";
import React from "react";
import wagmiConfig from "./config/wagmi";
import { WagmiConfig } from "wagmi";
import { WalletModal } from "./modals/WalletModal/WalletModal";
import { WalletProvider } from "./components/WalletContext/WalletContext";
import { MoralisProvider } from "./components/MoralisContext/MoralisContext";

const allModals: ModalObject[] = [
  {
    name: "Hello",
    component: Hello,
  },
  {
    name: "Connect Wallet",
    component: WalletModal,
  },
];

function App() {
  return (
    <MoralisProvider>
      <WagmiConfig client={wagmiConfig}>
        <WalletProvider>
          <ModalProvider allModals={allModals}>
            <Routes />
          </ModalProvider>
        </WalletProvider>
      </WagmiConfig>
    </MoralisProvider>
  );
}

export default App;
