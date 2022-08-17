import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme } from "@mui/material";
import GlitchImg from "src/components/GlitchImg/GlitchImg";
import { NFT_IMAGES } from "src/config/constants";
import WalletButtonBase from "src/components/WalletButtonBase/WalletButtonBase";
import useWhitelist from "src/hooks/useWhitelist";
import { WhitelistUserType } from "src/types/apis";
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

interface Props {
  selectedType?: WhitelistUserType;
}

const MintNft: React.FC<Props> = ({ selectedType }) => {
  const classes = useStyles();
  const { whitelistInfo, loading, mint, stats } = useWhitelist();

  const disabled = React.useMemo(() => {
    if (!selectedType && stats && stats?.numberMinted < stats?.maxPublicMintPerWallet) {
      return false;
    } else if (
      selectedType === WhitelistUserType.Whitelist &&
      whitelistInfo?.userType === WhitelistUserType.Whitelist &&
      !stats?.whitelistClaim
    ) {
      return false;
    } else if (
      selectedType === WhitelistUserType.Team &&
      whitelistInfo?.userType === WhitelistUserType.Team &&
      !stats?.teamClaim
    ) {
      return false;
    } else {
      return true;
    }
  }, [selectedType, whitelistInfo?.userType, stats]);

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
          onClick={() => mint(selectedType)}
          disabled={disabled}
        >
          {selectedType === WhitelistUserType.Team
            ? "Mint Team"
            : selectedType === WhitelistUserType.Whitelist
            ? "Mint Whitelist"
            : "Mint"}
        </WalletButtonBase>
      </div>
    </div>
  );
};

export default MintNft;
