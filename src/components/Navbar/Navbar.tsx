import React from "react";
import { Button, Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "src/assets/logos/logo.png";
import BurgerMenu from "src/components/BurgerMenu/BurgerMenu";
import { useLocation, useNavigate } from "react-router-dom";
import WalletIcon from "../WalletIcon/WalletIcon";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 500,
    // boxShadow: "0px 2px 2px rgba(0,0,0,0.3)",
    paddingLeft: 10,
    paddingRight: 10,
    // [theme.breakpoints.down("md")]: {
    //   paddingRight: 25,
    // },
    flexDirection: "column",
  },
  hideSmDown: {
    display: "flex",
    gap: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  link: {
    cursor: "pointer",
    borderBottom: "2px transparent solid",
    "&:hover": {
      borderBottom: "2px black solid",
    },
  },
  selected: {
    borderBottom: "2px black solid",
  },
  hideMdUp: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navItems: {
    display: "flex",
    gap: "40px",
  },
  logo: {
    marginBottom: "20px",
  },
}));

interface Props {}

const links = [
  ["Home", "/"],
  ["404", "/404"],
];

const Navbar: React.FC<Props> = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const linkClicked = (url: string) => {
    url[0] === "/" ? navigate(url) : window.open(url, "_blank");
  };

  return (
    <div className={classes.root}>
      <img src={logo} className={classes.logo} alt="logo" />

      <div className={classes.navItems}>
        <Button color="secondary">About</Button>
        <Button color="secondary">Roadmap</Button>
        <Button color="secondary">Purchase</Button>
        <Button color="secondary">Team</Button>
        <Button color="secondary">Mint!</Button>
      </div>
    </div>
  );
};

export default Navbar;
