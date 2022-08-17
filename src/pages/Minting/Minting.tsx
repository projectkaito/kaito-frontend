import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme, Typography } from "@mui/material";
import Bg from "src/assets/images/buildings.gif";
import Content from "./components/Content";
import MintNft from "./components/MintNft";
import LogoBar from "src/components/LogoBar/LogoBar";
import { getWhitelistInfo } from "src/api/whitelist";
import { WhitelistInfo, WhitelistUserType } from "src/types/apis";
import clsx from "clsx";
import useWhitelist from "src/hooks/useWhitelist";
import { useTimer } from "src/hooks/useTimer";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "black",
    minHeight: "100vh",
    background: `url(${Bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPositionY: "bottom",
    backgroundPositionX: "center",
  },
  headingsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: 50,
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
  const [selectedType, setSelectedType] = React.useState<WhitelistUserType | undefined>(undefined);
  const { stats } = useWhitelist();

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
      <Container maxWidth="lg">
        <LogoBar />
        {/* <Typography variant="h3" align="center" color="textPrimary" style={{ marginTop: 30 }}>
          Whitelist
        </Typography> */}
        <Grid container spacing={3} style={{ marginTop: 50 }}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Content timer={timer} stats={stats} selectedType={selectedType} />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MintNft timer={timer} selectedType={selectedType} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Minting;
