import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme, Typography } from "@mui/material";
import Bg from "src/assets/images/buildings.gif";
import NFTCard from "src/components/NFTCard/NFTCard";
import WaveText from "src/components/WaveText/WaveText";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // backgroundColor: "black",
    // minHeight: "100vh",
    // background: `url(${Bg})`,
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "100%",
    // backgroundPositionY: "bottom",
    // backgroundPositionX: "center",
  },
}));

interface IProps {}

const Inventory: React.FC<IProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <div className="center">
          <WaveText text="Inventory" />
        </div>
        {/* <Typography color="primary" variant="h2" align="center" sx={{ pt: 3 }}>
          Inventory
        </Typography> */}
        <Grid container spacing={4} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <NFTCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <NFTCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <NFTCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Inventory;
