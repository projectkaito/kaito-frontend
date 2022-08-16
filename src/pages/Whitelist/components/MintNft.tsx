import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme } from "@mui/material";
import GlitchImg from "src/components/GlitchImg/GlitchImg";
import { NFT_IMAGES } from "src/config/constants";
import WalletButtonBase from "src/components/WalletButtonBase/WalletButtonBase";
import useWhitelist from "src/hooks/useWhitelist";
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
  selectedType?: "user" | "team";
}

const MintNft: React.FC<Props> = ({ selectedType }) => {
  const classes = useStyles();
  const { whitelistInfo, loading, mint } = useWhitelist();

  const disabled = React.useMemo(() => {
    if (!selectedType) {
      return false;
    } else if (selectedType === "user" && whitelistInfo?.userType === "user") {
      return false;
    } else if (selectedType === "team" && whitelistInfo?.userType === "team") {
      return false;
    } else {
      return true;
    }
  }, [selectedType, whitelistInfo?.userType]);

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
          {selectedType === "team" ? "Mint Team" : selectedType === "user" ? "Mint Whitelist" : "Mint"}
        </WalletButtonBase>
      </div>
    </div>
  );
};

export default MintNft;
