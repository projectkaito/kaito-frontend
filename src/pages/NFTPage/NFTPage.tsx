import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme } from "@mui/material";
import LogoBar from "src/components/LogoBar/LogoBar";
import Img1 from "src/assets/images/nfts/1.jpg";
import Details from "./components/Details";
import Bg from "src/assets/images/buildings.gif";

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

const NFTPage: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <LogoBar />
        <Grid container spacing={4} style={{ marginTop: 50 }}>
          <Grid item xs={12} sm={6} md={4}>
            <img src={Img1} alt="" style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Details />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default NFTPage;
