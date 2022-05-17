import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import rocketImage from "src/assets/images/rocketImage.png";
import roadmap from "src/assets/images/roadmap.png";
import boy from "src/assets/images/boy.png";
import crown from "src/assets/images/crown.png";
import music11 from "src/assets/images/music11.png";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    marginTop: "94px",
    position: "relative",
    // background: "red",
  },
  content: {
    width: "305px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",

    // padding: "13px",
  },
  position: {
    color: theme.palette.primary.main,
  },
  roadmapImage: {},
  positionOne: {},
  positionTow: {},
  positionThree: {},

  positionFour: {},
}));

interface Props {
  image?: string;
  rank?: string | number;
  position?: string;
  description?: string;
  style?: React.CSSProperties | undefined;
  imageHeight?: string;
}

export const RoadmapContent: React.FC<Props> = ({ imageHeight, style, image, rank, position, description }) => {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        gap: "25px",
        width: " 100%",
        ...style,
      }}
    >
      <div className={classes.content}>
        <h1>{rank}</h1>
        <h1 className={classes.position}>{position}</h1>
        <p>{description}</p>
      </div>
      <img src={image} height={`${imageHeight}`} className={classes.positionOne} alt="roket Image" />
    </div>
  );
};

const Roadmap: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <RoadmapContent
          image={rocketImage}
          style={{
            maxWidth: "387px",
            // background: "green",
            position: "absolute",
            top: "0px",
            left: "416px",
          }}
          rank="1"
          position="launch"
          description={"The Lives of Kaito NFT collection will be released August 2022."}
        />
        <RoadmapContent
          image={crown}
          style={{
            maxWidth: "438px",
            // background: "green",
            position: "absolute",
            left: "57px",
            top: "421px",
          }}
          imageHeight="91px"
          rank="1"
          position="Outfit your Kaito with a rare item!"
          description={
            "A batch of new items raffled to existing collectors to customize their Kaito NFTs. These items can be traded and used to replace or add new cosmetics to Kaito."
          }
        />
        <RoadmapContent
          image={boy}
          style={{
            maxWidth: "387px",
            // background: "green",
            position: "absolute",
            right: "47px",
            top: "219px",
            flexDirection: "row-reverse",
          }}
          rank="1"
          position="launch"
          description={"The Lives of Kaito NFT collection will be released August 2022."}
        />
        <RoadmapContent
          image={music11}
          style={{
            maxWidth: "387px",
            position: "absolute",
            right: "313px",
            bottom: "261px",
            flexDirection: "row-reverse",
          }}
        />
        {/* <img src={rocketImage} className={classes.positionTow} alt="roket Image" />
      <img src={rocketImage} className={classes.positionThree} alt="roket Image" />
    <img src={rocketImage} className={classes.positionFour} alt="roket Image" /> */}
        <img src={roadmap} style={{ marginTop: "215px" }} alt="roadmap" className={classes.roadmapImage} />
      </div>
    </>
  );
};

export default Roadmap;
