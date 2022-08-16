import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme, Typography } from "@mui/material";
import Bg from "src/assets/images/buildings.gif";
import Content from "./components/Content";
import MintNft from "./components/MintNft";
import LogoBar from "src/components/LogoBar/LogoBar";
import { getWhitelistInfo } from "src/api/whitelist";
import { WhitelistInfo } from "src/types/apis";
import clsx from "clsx";

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

type SelectedType = undefined | "team" | "user";

const Whitelist: React.FC<Props> = () => {
  const classes = useStyles();
  const [selectedType, setSelectedType] = React.useState<SelectedType>(undefined);

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
                className={clsx(classes.heading, selectedType === "user" && classes.selected)}
                onClick={() => setSelectedType("user")}
              >
                Whitelist Mint
              </Typography>
              <Typography
                variant="h4"
                align="center"
                className={clsx(classes.heading, selectedType === "team" && classes.selected)}
                onClick={() => setSelectedType("team")}
              >
                Team Mint
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Content />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MintNft />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Whitelist;
