import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Typography } from "@mui/material";
import rocketImage from "src/assets/images/rocketImage.png";
import roadmap from "src/assets/images/roadmap.png";
import boy from "src/assets/images/boy.png";
import crown from "src/assets/images/crown.png";
import music11 from "src/assets/images/music11.png";
import RoadMapWhole from "src/assets/images/roadmap1_whole.png";
import RoadmapContent from "./RoadmapContent";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100vw",
    marginTop: "94px",
    position: "relative",
    background: `url(${RoadMapWhole})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: 1000,
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("lg")]: {
      height: "auto",
    },
    [theme.breakpoints.down("md")]: {
      flexFlow: "row",
      overflowY: "auto",
      maxWidth: "100%",
      background: `none`,
      paddingBottom: 120,
    },
  },

  roadmapImage: {},
  positionOne: {},
  positionTow: {},
  positionThree: {},
  positionFour: {},

  boxesContainer: {
    display: "none",
    position: "absolute",
    bottom: 0,
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "flex-end",
      gap: 5,
    },
  },
  boxWrapper: {
    display: "flex",
    flexFlow: "column",
    gap: 5,
  },
  box: {
    width: 50,
    height: 50,
    background: "white",
  },
}));

interface Props {}

const RoadmapAnime1: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <RoadmapContent
          image={rocketImage}
          style={{
            maxWidth: "300px",
            marginLeft: "calc(30% - 190px)",
          }}
          rank="1"
          position="Launch"
          description={"The Lives of Kaito NFT collection will be released August 2022."}
        />
        <RoadmapContent
          image={crown}
          style={{
            maxWidth: "310px",
            marginLeft: "calc(90% - 219px)",
          }}
          imageHeight="91px"
          rank="2"
          position="Special Kaito"
          description={
            "A drop of 5 legendary Kaito NFTs that feature new traits not found in the rest of the collection for existing collectors."
          }
        />
        <RoadmapContent
          image={boy}
          style={{
            maxWidth: "300px",
            marginLeft: "calc(20% - 193px)",
          }}
          rank="3"
          position="Outfit your Kaito with a rare item!"
          description={
            "A batch of new items raffled to existing collectors to customize their Kaito NFTs. These items can be traded and used to replace or add new cosmetics to Kaito."
          }
        />
        <RoadmapContent
          image={music11}
          style={{
            maxWidth: "300px",
            marginLeft: "calc(30% - 193px)",
          }}
          rank="4"
          position="Explore the music of Kaito"
          description={
            "Bridging the fantastic worlds of electronic music and Anime, community members will get to hear her mini-album first and vote on the title & artwork."
          }
        />
        <div className={classes.boxesContainer}>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
          <div className={classes.boxWrapper}>
            <div className={classes.box} />
          </div>
        </div>
        {/* <img src={RoadMapWhole} style={{ marginTop: "215px" }} alt="roadmap" className={classes.roadmapImage} /> */}
      </div>
    </>
  );
};

export default RoadmapAnime1;
