import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Theme, Grid } from "@mui/material";
import Logo from "src/assets/logos/logo.png";
import Img1 from "src/assets/images/nfts/1.jpg";
import Img2 from "src/assets/images/nfts/2.jpg";
import Img3 from "src/assets/images/nfts/3.jpg";
import Img4 from "src/assets/images/nfts/4.jpg";
import Img5 from "src/assets/images/nfts/5.png";
import Img6 from "src/assets/images/nfts/6.png";
import GlitchImg from "src/components/GlitchImg/GlitchImg";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "rgba(0,0,0,0.5)",
    minHeight: "100vh",
  },
}));

interface Props {}

const Minting: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <img src={Logo} alt="Kaito" style={{ maxWidth: 150, marginTop: 20 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <GlitchImg srcSet={[Img1, Img2, Img3, Img4, Img5, Img6]} />
          </Grid>
          <Grid item xs={12} sm={6} md={8}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Minting;
