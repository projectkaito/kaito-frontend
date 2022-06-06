import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme } from "@mui/material";
import LogoBar from "src/components/LogoBar/LogoBar";
import Img1 from "src/assets/images/nfts/1.jpg";
import Details from "./components/Details";
import Bg from "src/assets/images/buildings.gif";
import { useParams, useSearchParams } from "react-router-dom";
import { useMetadata } from "@react-dapp/utils";

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
  const { tokenId, address } = useParams();
  const { metadata } = useMetadata(address, tokenId);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <LogoBar />
        <Grid container spacing={4} style={{ marginTop: 50 }}>
          <Grid item xs={12} sm={6} md={4}>
            <img src={metadata?.image} alt="" style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Details data={metadata} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default NFTPage;

// const metadata = {
//   name: "Project kaito #11",
//   description:
//     "Project Kaito is on a mission to end world hunger and give hope to the hopeless, with thirty percent of all sales set to be donated to \u2018Feed the Children\u2019 and Mental Health charities.",
//   image: "https://projectkaito.com/api/assets/11.png",
//   attributes: [
//     {
//       trait_type: "Type",
//       value: "Dreamer",
//     },
//     {
//       trait_type: "Background",
//       value: "Sci fi Door",
//     },
//     {
//       trait_type: "FX",
//       value: "none",
//     },
//     {
//       trait_type: "Clothes",
//       value: "Flower Shirt",
//     },
//     {
//       trait_type: "Eyes",
//       value: "Sad",
//     },
//     {
//       trait_type: "Face",
//       value: "Sweat",
//     },
//     {
//       trait_type: "Hair",
//       value: "Bun",
//     },
//     {
//       trait_type: "Headwear",
//       value: "none",
//     },
//     {
//       trait_type: "Hand",
//       value: "none",
//     },
//     {
//       trait_type: "Neck",
//       value: "Choker",
//     },
//     {
//       trait_type: "Face",
//       value: "Sweat",
//     },
//     {
//       trait_type: "Mouth",
//       value: "Suprised",
//     },
//     {
//       trait_type: "Earrings",
//       value: "Double Hoop II",
//     },
//   ],
// };
