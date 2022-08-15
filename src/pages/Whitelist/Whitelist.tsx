import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme, Typography } from "@mui/material";
import Bg from "src/assets/images/buildings.gif";
import Content from "./components/Content";
import MintNft from "./components/MintNft";
import LogoBar from "src/components/LogoBar/LogoBar";
import { getWhitelistInfo } from "src/api/whitelist";
import { useWallet } from "@react-dapp/wallet";
import { WhitelistInfo } from "src/types/apis";

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
}));

interface Props {}

const Whitelist: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <LogoBar />
        {/* <Typography variant="h3" align="center" color="textPrimary" style={{ marginTop: 30 }}>
          Whitelist
        </Typography> */}
        <Grid container spacing={3} style={{ marginTop: 50 }}>
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
