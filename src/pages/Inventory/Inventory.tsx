import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Paper, Skeleton, Theme, Typography } from "@mui/material";
import NFTCard from "src/components/NFTCard/NFTCard";
import WaveText from "src/components/WaveText/WaveText";
import useWallet from "src/hooks/useWallet";
import { MoralisNFT } from "src/types/moralis";
import { Contracts, defaultChainName } from "src/config";
import useMoralis from "src/hooks/useMoralis";
import LogoBar from "src/components/LogoBar/LogoBar";
import Bg from "src/assets/images/bg2.png";
import useInventory from "src/hooks/useInventory";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "black",
    minHeight: "100vh",
    background: `url(${Bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPositionY: "bottom",
    backgroundPositionX: "center",
    paddingBottom: 50,
  },
  mainHeading: {
    fontFamily: theme.fonts[0],
  },
}));

interface IProps {}

const Inventory: React.FC<IProps> = () => {
  const classes = useStyles();
  const { loading, results } = useInventory();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <LogoBar />

        <div className="center">
          <Typography color="secondary" variant="h3" className={classes.mainHeading}>
            OTHER WORLD
          </Typography>
        </div>
        {/* <Typography color="primary" variant="h2" align="center" sx={{ pt: 3 }}>
          Inventory
        </Typography> */}
        <Grid container spacing={4} sx={{ mt: 3 }}>
          {!loading &&
            results.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <NFTCard {...item} />
              </Grid>
            ))}
          {loading && (
            <>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rectangular" style={{ aspectRatio: "1/1", height: "auto" }} component={Paper} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rectangular" style={{ aspectRatio: "1/1", height: "auto" }} component={Paper} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rectangular" style={{ aspectRatio: "1/1", height: "auto" }} component={Paper} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rectangular" style={{ aspectRatio: "1/1", height: "auto" }} component={Paper} />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Inventory;
