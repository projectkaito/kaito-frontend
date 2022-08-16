import React, { useContext } from "react";
import styles from "./ModalManager.module.css";
import ReactModal from "react-modal";
import { WalletModal } from "src/modals/WalletModal/WalletModal";
import useWallet from "src/hooks/useWallet";
import { useNetwork, useSwitchNetwork } from "wagmi";

interface WalletContextProps {
  open: boolean;
  openWalletModal: () => void;
  closeWalletModal: () => void;
}

const WalletContext = React.createContext<WalletContextProps>({
  open: false,
  openWalletModal: () => {},
  closeWalletModal: () => {},
});

export const WalletProvider: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const { isConnected, disconnect } = useWallet();
  const { chain } = useNetwork();
  const { switchNetwork, chains, switchNetworkAsync } = useSwitchNetwork();

  const openWalletModal = () => {
    setOpen(true);
  };
  const closeWalletModal = () => {
    setOpen(false);
  };

  // Switch network handler
  React.useEffect(() => {
    if (chains.length > 0 && switchNetworkAsync && chain?.id && isConnected && !chains.some((c) => c.id === chain.id)) {
      switchNetworkAsync(chains[0].id).catch(() => {
        disconnect();
      });
    }
  }, [chain?.id, isConnected, switchNetwork, disconnect, chains, switchNetworkAsync]);

  React.useEffect(() => {
    if (isConnected) {
      closeWalletModal();
    }
  }, [isConnected]);

  return (
    <WalletContext.Provider
      value={{
        open,
        openWalletModal,
        closeWalletModal,
      }}
    >
      <ReactModal
        isOpen={open}
        onRequestClose={() => {
          closeWalletModal();
        }}
        className={styles.modal}
        overlayClassName={styles.overlay}
        parentSelector={() => document.body}
        ariaHideApp={false}
      >
        <div className={styles.closeIcon} onClick={closeWalletModal}>
          x
        </div>
        <WalletModal />
      </ReactModal>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletModal = () => {
  return useContext(WalletContext);
};
