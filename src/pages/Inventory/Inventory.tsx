import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Bg from "src/assets/images/buildings.gif";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    root: {
      backgroundColor: "black",
      minHeight: "100vh",
      background: `url(${Bg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100%",
      backgroundPositionY: "bottom",
      backgroundPositionX: "center",
    },
  },
}));

interface IProps {}

const Inventory: React.FC<IProps> = () => {
  const classes = useStyles();

  return <div className={classes.root}>Inventory</div>;
};

export default Inventory;
