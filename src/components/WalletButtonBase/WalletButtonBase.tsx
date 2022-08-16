import { Button, CircularProgress, ButtonProps } from "@mui/material";

import React from "react";
import useWallet from "src/hooks/useWallet";

interface Props extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}
const WalletButtonBase: React.FC<Props> = ({
  onClick,
  children,
  loading,
  loadingText = "Pending...",
  disabled,
  ...props
}) => {
  const { account, openModal: openWalletModal, displayAccount } = useWallet();

  const connectWallet = () => {
    openWalletModal();
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
    if (!account) {
      connectWallet();
    } else if (onClick && !loading) {
      onClick(e);
    }
  };

  return (
    <Button
      {...props}
      //@ts-ignore
      onClick={handleClick}
      disabled={!account ? false : disabled}
    >
      {!displayAccount && "Connect  Wallet"}
      {displayAccount && !loading && (children || "Connect")}
      {displayAccount && loading && (
        <>
          <CircularProgress size={25} thickness={4} style={{ marginRight: 5 }} />
          {loadingText}
        </>
      )}
    </Button>
  );
};
export default WalletButtonBase;
