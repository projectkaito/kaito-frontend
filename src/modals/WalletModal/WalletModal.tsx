import { useEffect } from "react";
import style from "./assets/WalletModal.module.css";
import WalletConnectIco from "./assets/walletconnect_big.svg";
import MetamaskIco from "./assets/metamask_big.svg";
import { useConnect } from "wagmi";

export const WalletModal: React.FC = () => {
  const { connectors, connectAsync } = useConnect();

  const connectMetamask = async () => {
    let connector = connectors.find((c) => c.name === "MetaMask");
    await connectAsync({ connector });
  };

  const connectWalletConnect = async () => {
    let connector = connectors.find((c) => c.name === "WalletConnect");
    await connectAsync({ connector });
  };

  return (
    <div className={style.root}>
      <p className={style.heading}>Connect a Web3 Wallet</p>
      <div className={style.walletsContainer}>
        <div className={style.walletBtnContainer} onClick={connectMetamask}>
          <img src={MetamaskIco} alt="Metamask" height="90px" />
          <p className={style.title}>MetaMask</p>
        </div>
        <div className={style.divider} />

        <div className={style.walletBtnContainer} onClick={connectWalletConnect}>
          <img src={WalletConnectIco} alt="WalletConnect" height="60px" />
          <p className={style.title} style={{ marginTop: 15 }}>
            Wallet Connect
          </p>
        </div>
      </div>
    </div>
  );
};
