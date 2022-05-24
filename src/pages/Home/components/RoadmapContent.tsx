import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Typography } from "@mui/material";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  contentWrapper: {
    // background: "rgba(0,0,0,0.4)",
    // borderRadius: 16,
    // backdropFilter: "blur(10px)",
    // boxShadow: "0px 2px 10px 5px rgba(0,0,0,0.4)",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0px !important",
      position: "relative !important",
      top: "auto !important",
      left: "auto !important",
      marginTop: "0px !important",
    },
  },
  position: {
    color: theme.palette.primary.main,
    fontWeight: 800,
    fontFamily: theme.fonts[0],
  },
  content: {
    width: "275px",
    display: "flex",
    flexDirection: "column",
  },
  description: {
    fontWeight: 400,
  },
}));

interface Props {
  image?: string;
  rank?: string | number;
  position?: string;
  description?: string;
  style?: React.CSSProperties | undefined;
  imageHeight?: string;
  className?: string;
}

const RoadmapContent: React.FC<Props> = ({ imageHeight, style, image, rank, position, description, className }) => {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        ...style,
      }}
      className={clsx(classes.contentWrapper, className)}
    >
      <div className={classes.content}>
        <Typography variant="h4">{rank}</Typography>
        <Typography variant="h4" className={classes.position}>
          {position}
        </Typography>
        <Typography className={classes.description}>{description}</Typography>
      </div>
    </div>
  );
};

export default RoadmapContent;
