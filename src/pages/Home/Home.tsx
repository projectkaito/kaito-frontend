import React from "react";
import { Button, Theme, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useNotify from "src/hooks/useNotify";
import FileUploader from "src/components/FileUploader/FileUploader";
import useModal from "src/hooks/useModal";
import nftImage from "src/assets/images/nftImage.png";
import Roadmap from "./components/RoadmapAnime1";
import RoadmapTabs from "./components/RoadmapTabs";
import TeamMembers from "./components/TeamMembers";
const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  leftContent: {
    width: "100%",
    padding: "28px",
    margin: "auto",
    color: theme.palette.secondary.main,
    maxWidth: "472px",
  },
  title: {
    fontSize: "55px !important",
    fontWeight: "700 !important",
  },
  roadmap: {
    width: "100%",
    // padding: "28px",
    margin: "auto",
    textAlign: "center",
    color: theme.palette.secondary.main,
    // maxWidth: "672px",
    marginTop: "88px",
  },
  rightContent: {
    width: "100%",
    maxWidth: "692px",
    padding: "20px",
    color: "white",
    margin: "auto",
  },
  roadmapContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "14px",
  },
}));

interface Props {}

const Home: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justifyContent={"center"} alignItems={"center"} spacing={2}>
        <Grid item md={5}>
          <div className={classes.leftContent}>
            <Typography variant="h1" className={classes.title}>
              Then Manifesto
            </Typography>
            <Typography variant="body1">
              The blockchain will be ethereum compatible. It runs on a PoW consensus; using the SHA-3 hash algorithm.
              Encouragement of more Dapp developers, the team will release an assembly for smart contracts to be written
              in different code languages.
            </Typography>
          </div>
        </Grid>
        <Grid item md={7}>
          {/* <div className={classes.rightContent}> */}
          <img style={{ width: "100%" }} src={nftImage} alt="nft image" />
          {/* </div> */}
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div className={classes.roadmap}>
            <Typography variant="h1" className={classes.title}>
              Roadmap
            </Typography>
            <div className={classes.roadmapContainer}>
              <RoadmapTabs />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div className={classes.roadmap}>
            <Typography variant="h1" className={classes.title}>
              TeamMembers
            </Typography>
            <div>
              <TeamMembers />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
