import { Button, CircularProgress, ButtonProps } from "@mui/material";
import { useWallet } from "@react-dapp/wallet";
import { useEthers } from "@react-dapp/utils";
import React from "react";

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
  const { displayAccount } = useEthers();
  const { account, setOpen: openWalletModal } = useWallet();

  const connectWallet = () => {
    openWalletModal(true);
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
          <CircularProgress size={30} thickness={4} style={{ marginRight: 5 }} />
          {loadingText}
        </>
      )}
    </Button>
  );
};
export default WalletButtonBase;
