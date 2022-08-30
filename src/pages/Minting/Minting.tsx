import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme, Typography } from "@mui/material";
import Bg from "src/assets/images/bg1.png";
import Content from "./components/Content";
import MintNft from "./components/MintNft";
import LogoBar from "src/components/LogoBar/LogoBar";
import { getWhitelistInfo } from "src/api/whitelist";
import { WhitelistInfo, WhitelistUserType } from "src/types/apis";
import clsx from "clsx";
import useWhitelist from "src/hooks/useWhitelist";
import { useTimer } from "src/hooks/useTimer";
import SpeedLines from "src/components/SpeedLines/SpeedLines";
import MintingAnimation from "src/components/MintingAnimation/MintingAnimation";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "black",
    minHeight: "100vh",
    background: `url(${Bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPositionY: "center",
    backgroundPositionX: "center",
    postion: "relative",
    // "&:after": {
    //   content: "''",
    //   position: "fixed",
    //   top: "-14px",
    //   width: "750px",
    //   transform: "rotate(350deg)",
    //   left: "-20px",
    //   height: 50,
    //   background: `linear-gradient(220.9deg, #000000 12.04%, #C0C0C0 101.95%)`,
    //   border: "3px solid black",
    // },
    // "&:before": {
    //   content: "''",
    //   zIndex: 10,
    //   position: "fixed",
    //   bottom: "-19px",
    //   width: "750px",
    //   transform: "rotate(353deg)",
    //   right: "-20px",
    //   height: 50,
    //   background: `linear-gradient(220.9deg, #000000 12.04%, #C0C0C0 101.95%)`,
    //   border: "3px solid black",
    // },
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
}));

interface Props {}

const Minting: React.FC<Props> = () => {
  const classes = useStyles();
  const [selectedType, setSelectedType] = React.useState<WhitelistUserType>(WhitelistUserType.Team);
  const { stats } = useWhitelist();
  const [openMinting, setOpenMinting] = React.useState(false);

  const timestamp = React.useMemo(
    () =>
      selectedType
        ? selectedType === WhitelistUserType.Whitelist
          ? stats?.whitelistMintStartTimestamp
          : stats?.teamMintStartTimestamp
        : stats?.publicMintStartTimestamp,
    [selectedType, stats]
  );

  const timer = useTimer(timestamp);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" style={{ display: "grid", gridTemplateRows: "min-content 1fr", minHeight: "90vh" }}>
        <SpeedLines open={openMinting} />
        <MintingAnimation open={openMinting} />
        <LogoBar />
        {/* <Typography variant="h3" align="center" color="textPrimary" style={{ marginTop: 30 }}>
          Whitelist
        </Typography> */}
        <div className="center">
          <Grid container spacing={3}>
            {/* <Grid item xs={12}>
              <div className={classes.headingsContainer}>
                <Typography
                  variant="h4"
                  align="center"
                  className={clsx(classes.heading, !selectedType && classes.selected)}
                  onClick={() => setSelectedType(undefined)}
                >
                  Public Mint
                </Typography>
                <Typography
                  variant="h4"
                  align="center"
                  className={clsx(classes.heading, selectedType === WhitelistUserType.Whitelist && classes.selected)}
                  onClick={() => setSelectedType(WhitelistUserType.Whitelist)}
                >
                  Whitelist Mint
                </Typography>
                <Typography
                  variant="h4"
                  align="center"
                  className={clsx(classes.heading, selectedType === WhitelistUserType.Team && classes.selected)}
                  onClick={() => setSelectedType(WhitelistUserType.Team)}
                >
                  Team Mint
                </Typography>
              </div>
            </Grid> */}
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Content timer={timer} stats={stats} selectedType={selectedType} />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <MintNft timer={timer} selectedType={selectedType} loading={openMinting} setLoading={setOpenMinting} />
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Minting;
