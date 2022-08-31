import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme, useMediaQuery } from "@mui/material";
import Bg from "src/assets/images/bg1.png";
import Content from "./components/Content";
import MintNft from "./components/MintNft";
import LogoBar from "src/components/LogoBar/LogoBar";
import { WhitelistUserType } from "src/types/apis";
import useWhitelist from "src/hooks/useWhitelist";
import { useTimer } from "src/hooks/useTimer";
import SpeedLines from "src/components/SpeedLines/SpeedLines";
import MintingAnimation from "src/assets/images/minting_animation.gif";
import MintingAnimationMobile from "src/assets/images/minting_animation_mobile.gif";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "black",
    minHeight: "100vh",
    background: `url(${Bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPositionY: "center",
    backgroundPositionX: "center",
    postion: "relative",
    [theme.breakpoints.down("md")]: {
      backgroundSize: "cover",
      backgroundPositionX: "left",
      backgroundPositionY: "center",
    },
  },
  headingsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: 0,
  },
  heading: {
    color: "grey",
    transform: "scale(0.8)",
    cursor: "pointer",
    userSelect: "none",
    transition: "all 300ms ease-in-out",
  },
  selected: {
    color: "white",
    transform: "scale(1.2)",
    cursor: "default",
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 10,
  },
}));

interface Props {}

const Minting: React.FC<Props> = () => {
  const classes = useStyles();
  const { stats, currentWhitelistType } = useWhitelist();
  const [openMinting, setOpenMinting] = React.useState(false);
  const isSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const timestamp = React.useMemo(
    () =>
      currentWhitelistType
        ? currentWhitelistType === WhitelistUserType.Whitelist
          ? stats?.whitelistMintStartTimestamp
          : stats?.teamMintStartTimestamp
        : stats?.publicMintStartTimestamp,
    [currentWhitelistType, stats]
  );

  // const timer = useTimer(new Date().getTime() / 997);
  const timer = useTimer(timestamp);

  return (
    <div className={classes.root}>
      <Container
        maxWidth="lg"
        style={{ display: "grid", gridTemplateRows: "min-content 1fr", minHeight: "90vh" }}
        // onClick={() => setOpenMinting(!openMinting)}
      >
        {openMinting && (
          <img src={isSM ? MintingAnimationMobile : MintingAnimation} alt="" className={classes.fullScreen} />
        )}
        {/* TODO: remove these components and keep them safe for some future use */}
        {/* <SpeedLines open={openMinting} /> */}
        {/* <MintingAnimation open={openMinting} /> */}
        <LogoBar />

        <div className="center">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Content timer={timer} stats={stats} selectedType={currentWhitelistType} />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <MintNft
                  timer={timer}
                  selectedType={currentWhitelistType}
                  loading={openMinting}
                  setLoading={setOpenMinting}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Minting;
