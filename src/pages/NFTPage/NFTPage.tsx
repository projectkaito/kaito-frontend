import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Paper, Skeleton, Theme } from "@mui/material";
import LogoBar from "src/components/LogoBar/LogoBar";
import Details from "./components/Details";
import Bg from "src/assets/images/buildings.gif";
import { useParams } from "react-router-dom";
import { MoralisNFT } from "src/types/moralis";
import { defaultChainName } from "src/config";
import useMoralis from "src/hooks/useMoralis";
import { sleep } from "src/utils";

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
  // const { metadata } = useMetadata(address, tokenId);
  const { isConnected, Moralis } = useMoralis();
  const [nftData, setNftData] = React.useState<Partial<MoralisNFT>>({});
  const [loaded, setLoaded] = React.useState(false);

  const fetchMetadata = React.useCallback(async () => {
    if (!address || !tokenId || !isConnected) return;
    console.log("fetching metadata");
    let res = await Moralis.Web3API.token.getTokenIdMetadata({
      address: address,
      token_id: tokenId,
      chain: defaultChainName,
    });
    setNftData({ ...res, metadata: JSON.parse(res.metadata!) });
  }, [isConnected, address, tokenId, Moralis.Web3API.token]);

  const refresh = async () => {
    await Moralis.Web3API.token.reSyncMetadata({
      chain: defaultChainName,
      address: address!,
      token_id: tokenId!,
    });
    await sleep(1000);
    await fetchMetadata();
  };

  React.useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <LogoBar />
        <Grid container spacing={4} style={{ marginTop: 50 }}>
          <Grid item xs={12} sm={6} md={4}>
            <img
              src={nftData.metadata?.image}
              alt=""
              onLoad={() => {
                setLoaded(true);
              }}
              style={{ display: loaded ? "initial" : "none", width: "100%" }}
            />
            {!loaded && (
              <Skeleton
                variant="rectangular"
                width="100%"
                style={{ aspectRatio: "1/1", height: "auto" }}
                component={Paper}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Details
              refresh={refresh}
              data={{
                image: nftData.metadata?.image,
                description: nftData.metadata?.description,
                name: nftData.metadata?.name,
                attributes: nftData.metadata?.attributes,
                ownerAddress: nftData.owner_of,
              }}
            />
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
