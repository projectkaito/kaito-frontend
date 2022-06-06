import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme } from "@mui/material";
import GlitchImg from "src/components/GlitchImg/GlitchImg";
import { NFT_IMAGES } from "src/config/constants";
import WalletButtonBase from "src/components/WalletButtonBase/WalletButtonBase";
import useTeamMint from "src/hooks/useTeamMint";
const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  glitchContainer: {
    display: "flex",
    flexFlow: "column",
  },
  img: {
    width: 300,
    height: 300,
    [theme.breakpoints.down("sm")]: {
      width: 200,
      height: 200,
    },
  },
  btn: {
    width: 300,
    borderRadius: 0,
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
  },
}));

interface Props {}

const MintNft: React.FC<Props> = () => {
  const classes = useStyles();
  let { mintToken, loading } = useTeamMint();

  return (
    <div className={classes.root}>
      <div className={classes.glitchContainer}>
        <GlitchImg srcSet={NFT_IMAGES} className={classes.img} />
        <WalletButtonBase
          loading={loading}
          loadingText="Minting.."
          className={classes.btn}
          color="primary"
          variant="contained"
          onClick={mintToken}
        >
          Mint
        </WalletButtonBase>
      </div>
    </div>
  );
};

export default MintNft;
