import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Theme, Grid } from "@mui/material";
import Logo from "src/assets/logos/logo.png";
import GlitchImg from "src/components/GlitchImg/GlitchImg";
import { NFT_IMAGES } from "src/config/constants";

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
            <GlitchImg srcSet={NFT_IMAGES} />
          </Grid>
          <Grid item xs={12} sm={6} md={8}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Minting;
