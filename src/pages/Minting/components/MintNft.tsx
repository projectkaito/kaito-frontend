import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme } from "@mui/material";
import GlitchImg from "src/components/GlitchImg/GlitchImg";
import { NFT_IMAGES } from "src/config/constants";
import prerevealImage from "src/assets/images/prereveal.gif";
import WalletButtonBase from "src/components/WalletButtonBase/WalletButtonBase";
import useWhitelist from "src/hooks/useWhitelist";
import { WhitelistUserType } from "src/types/apis";
import { IUseTimer } from "src/hooks/useTimer";
import useWallet from "src/hooks/useWallet";
const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  glitchContainer: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },
  img: {
    width: "80%",
    maxWidth: 400,
    aspectRatio: "1/1",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      // width: 200,
      // height: 200,
    },
  },
  btn: {
    width: "80%",
    maxWidth: 400,
    borderRadius: 0,
    [theme.breakpoints.down("sm")]: {
      // width: 200,
    },
  },
}));

interface Props {
  selectedType?: WhitelistUserType;
  timer?: IUseTimer;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
}

const MintNft: React.FC<Props> = ({ selectedType, timer, setLoading }) => {
  const classes = useStyles();
  const { whitelistInfo, loading, mint, stats } = useWhitelist();
  const { account } = useWallet();

  const isAllowed = React.useMemo(() => {
    let obj = {
      txt: "Mint",
      disabled: false,
    };
    if (!timer?.timeFinished) {
      obj = {
        txt: "Minting Not Live",
        disabled: true,
      };
      return obj;
    } else if (!account) {
      obj = {
        txt: "Connect Wallet",
        disabled: false,
      };
      return obj;
    } else if (!stats) {
      obj = {
        txt: "Loading...",
        disabled: true,
      };
      return obj;
    }

    if (!selectedType) {
      if (stats?.numberMinted >= stats?.maxPublicMintPerWallet) {
        obj = {
          txt: "Max Minted",
          disabled: true,
        };
      } else {
        obj = {
          txt: "Mint",
          disabled: false,
        };
      }
    } else if (selectedType === WhitelistUserType.Team) {
      if (whitelistInfo?.userType === WhitelistUserType.Team) {
        if (stats?.teamClaim) {
          obj = {
            txt: "Already Minted",
            disabled: true,
          };
        } else if (stats.numberMinted >= stats.maxTeamMintPerWallet) {
          obj = {
            txt: "Max Minted",
            disabled: true,
          };
        } else {
          obj = {
            txt: "Mint Team",
            disabled: false,
          };
        }
      } else {
        obj = {
          txt: "Not Allowed",
          disabled: true,
        };
      }
    } else if (selectedType === WhitelistUserType.Whitelist) {
      if (whitelistInfo?.userType === WhitelistUserType.Whitelist) {
        if (stats.whitelistClaim) {
          obj = {
            txt: "Already Minted",
            disabled: true,
          };
        } else if (stats.numberMinted >= stats.maxWhitelistMintPerWallet) {
          obj = {
            txt: "Max Minted",
            disabled: true,
          };
        } else {
          obj = {
            txt: "Mint Whitelist",
            disabled: false,
          };
        }
      } else {
        obj = {
          txt: "Not Allowed",
          disabled: true,
        };
      }
    }
    return obj;
  }, [selectedType, timer, account, stats, whitelistInfo]);

  const SrcSet = React.useMemo(() => [prerevealImage, prerevealImage], []);

  React.useEffect(() => {
    setLoading && setLoading(loading);
  }, [loading, setLoading]);

  return (
    <div className={classes.root}>
      <div className={classes.glitchContainer}>
        <GlitchImg srcSet={SrcSet} className={classes.img} />

        <WalletButtonBase
          loading={loading}
          loadingText="Minting.."
          className={classes.btn}
          color="primary"
          variant="contained"
          onClick={() => mint(selectedType)}
          disabled={isAllowed.disabled}
        >
          {isAllowed.txt}
        </WalletButtonBase>
      </div>
    </div>
  );
};

export default MintNft;
