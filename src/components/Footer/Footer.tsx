import React from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 100,
    boxShadow: "0px -2px 2px rgba(0, 0, 0, 0.3)",
    paddingLeft: 10,
    paddingRight: 10,
  },
}));

interface Props {}

const Footer: React.FC<Props> = () => {
  const classes = useStyles();

  return <div className={classes.root}>Footer</div>;
};

export default Footer;
