import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import roketImage from "src/assets/images/roketImage.png";
import roadmap from "src/assets/images/roadmap.png";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    marginTop: "94px",
    position: "relative",
  },
  content: {
    width: "305px",
    // padding: "13px",
  },
  positionOne: {},
  positionTow: {},
  positionThree: {},
  positionFour: {},
}));

interface Props {}

export const RoadmapContent: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <h1>1</h1>
      <h1>Launch</h1>
      <p>The Lives of Kaito NFT collection will be released August 2022.</p>
    </div>
  );
};

const Roadmap: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RoadmapContent />
      <img src={roketImage} className={classes.positionOne} alt="roket Image" />
      {/* <img src={roketImage} className={classes.positionTow} alt="roket Image" />
      <img src={roketImage} className={classes.positionThree} alt="roket Image" />
      <img src={roketImage} className={classes.positionFour} alt="roket Image" /> */}
      <img src={roadmap} alt="roadmap" />
    </div>
  );
};

export default Roadmap;
