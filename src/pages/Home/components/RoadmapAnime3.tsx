import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Typography } from "@mui/material";
import rocketImage from "src/assets/images/rocketImage.png";
import roadmap from "src/assets/images/roadmap.png";
import boy from "src/assets/images/boy.png";
import crown from "src/assets/images/crown.png";
import music11 from "src/assets/images/music11.png";
import RoadMapWhole from "src/assets/images/roadmap_anime_3.png";
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
    height: 500,
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("lg")]: {
      // height: "auto",
    },
    [theme.breakpoints.down("md")]: {
      height: "auto",
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
  cmgSoon: {
    paddingTop: 100,
    paddingLeft: 50,
  },
}));

interface Props {}

const RoadmapAnime3: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <RoadmapContent
          image={rocketImage}
          style={{
            maxWidth: "387px",
            marginLeft: "calc(75% - 190px)",
            marginTop: "15%",
          }}
          rank="Q1"
          position="Items for further customization"
          description={
            "For the future that lies beyond this roadmap, we look forward to expanding the project along with our community to realize even greater ambitions for the Lives of Kaito universe!"
          }
        />
        <RoadmapContent
          image={crown}
          style={{
            maxWidth: "130px",
            position: "absolute",
            bottom: "20%",
            left: "calc(17% - 65px)",
          }}
          className={classes.cmgSoon}
          imageHeight="91px"
          rank=""
          position="Comming Soon"
          description={""}
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

export default RoadmapAnime3;
