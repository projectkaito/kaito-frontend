import React from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ModalProps } from "src/context/ModalContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

const Hello: React.FC<ModalProps> = () => {
  const classes = useStyles();

  return <div className={classes.root}>This is Hello</div>;
};

export default Hello;
