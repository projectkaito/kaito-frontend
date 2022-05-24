import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Theme, Typography } from "@mui/material";
import rocketImage from "src/assets/images/rocketImage.png";
import roadmap from "src/assets/images/roadmap.png";
import boy from "src/assets/images/boy.png";
import crown from "src/assets/images/crown.png";
import music11 from "src/assets/images/music11.png";
import RoadMapWhole from "src/assets/images/roadmapcharity.png";
import RoadmapContent from "./RoadmapContent";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: "94px",
    position: "relative",
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
  content: {
    [theme.breakpoints.up("md")]: {
      display: "none !important",
    },
  },
  img: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

interface Props {}

const RoadmapCharity: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <img src={RoadMapWhole} alt="" className={classes.img} />
        <RoadmapContent className={classes.content} position="June" description={"Community voiceover auditions"} />
        <RoadmapContent
          className={classes.content}
          position="2022Q3"
          description={"Initial Charity Donation 30% OS royalties Project Kaito Charity Launch"}
        />
        <RoadmapContent
          className={classes.content}
          position="2022Q4"
          description={"Project Kaito Charity Planning & Strategizing"}
        />
        <RoadmapContent
          className={classes.content}
          position="2023Q1"
          description={"Project Kaito Charity Execution Phase"}
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
        </div>
        {/* <img src={RoadMapWhole} style={{ marginTop: "215px" }} alt="roadmap" className={classes.roadmapImage} /> */}
      </div>
    </Container>
  );
};

export default RoadmapCharity;
