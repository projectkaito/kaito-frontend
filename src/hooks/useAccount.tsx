import React, { useCallback } from "react";
import { getSignatureMessage, loginUser, verifySignature } from "src/api";
import { useEthers } from "@react-dapp/utils";
import { useWallet, useEagerConnect } from "@react-dapp/wallet";

const useAccount = () => {
  const { account, deactivate } = useWallet();
  const { signer } = useEthers();
  useEagerConnect(localStorage.getItem("Allow-Wallet-Reconnect") === "true");

  const accountConnected = useCallback(async () => {
    if (!account) return;

    try {
      let token = localStorage.getItem("token");
      if (token) {
        let { status } = await verifySignature(account, token);
        if (!status) {
          deactivate();
          localStorage.removeItem("token");
        }
        return;
      }
      let sigMsg = await getSignatureMessage(account);
      let sig = await signer?.signMessage(sigMsg.data);
      if (sig) {
        localStorage.setItem("token", sig);
        await loginUser(account, sig);
        localStorage.setItem("Allow-Wallet-Reconnect", "true");
      }
    } catch (error) {
      deactivate();
    }
  }, [account, deactivate, signer]);

  React.useEffect(() => {
    accountConnected();
  }, [accountConnected]);
};

export default useAccount;
