import React from "react";
import * as ethers from "ethers";
import { truncateAddress } from "src/utils";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
  useNetwork,
  useProvider,
  useBalance,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import { verifyMessage } from "ethers/lib/utils";
import { useWalletModal } from "src/components/WalletContext/WalletContext";

const useWallet = () => {
  const { isConnected, ...account } = useAccount();
  const { openWalletModal: _openModal } = useWalletModal();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { isLoading, connect, connectors, pendingConnector } = useConnect();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { data: balance } = useBalance({
    addressOrName: account?.address,
  });

  const openModal = React.useCallback(() => {
    if (!isConnected) {
      _openModal();
    }
  }, [isConnected, _openModal]);

  return {
    openModal,
    account: account?.address,
    displayAccount: truncateAddress(account?.address),
    chainId: chain?.id,
    isConnected,
    disconnect,
    isConnecting: isLoading,
    connect,
    connectors,
    pendingConnector,
    switchNetwork,
    provider,
    signer,
    balance,
  };
};

export default useWallet;

export const useSignHook = () => {
  const account = useAccount();

  const { signMessageAsync } = useSignMessage();

  const sign = async (message: string | ethers.ethers.utils.Bytes) => {
    if (!account) return;
    let res = await signMessageAsync({ message });
    return res;
  };

  return { sign, verify: verifyMessage };
};
