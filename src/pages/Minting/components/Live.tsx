import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // marginTop: 50,
    paddingBottom: 150,
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 50,
    },
    "& h2": {
      color: "#fff",
      position: "absolute",
      // transform: "translate(-50%, -50%)",
      fontSize: 100,
      [theme.breakpoints.down("sm")]: {
        fontSize: 50,
      },
    },
    "& h2:nth-child(1)": {
      color: "transparent",
      "-webkit-text-stroke": `2px ${theme.palette.primary.main}`,
    },
    "& h2:nth-child(2)": {
      color: `${theme.palette.primary.main}`,
      animation: "$animate 4s ease-in-out infinite",
    },
  },
  "@keyframes animate": {
    "0%,100%": {
      clipPath: `polygon(
        0% 45%,
        16% 44%,
        33% 50%,
        54% 60%,
        70% 61%,
        84% 59%,
        100% 52%,
        100% 100%,
        0% 100%
      )`,
    },

    "50%": {
      clipPath: `polygon(
        0% 60%,
        15% 65%,
        34% 66%,
        51% 62%,
        67% 50%,
        84% 45%,
        100% 46%,
        100% 100%,
        0% 100%
      )`,
    },
  },
}));

interface IProps {}

const Live: React.FC<IProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>Live</h2>
      <h2>Live</h2>
    </div>
  );
};

export default Live;
