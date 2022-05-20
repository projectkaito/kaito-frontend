import React from "react";
import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Gif404 from "src/assets/images/404.gif";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.7)",
  },
  img: {},
}));

interface Props {}

const NotFound: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={Gif404} className={classes.img} />
    </div>
  );
};

export default NotFound;
