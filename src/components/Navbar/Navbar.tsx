import React from "react";
import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Logo from "src/assets/logos/logo.png";
import BurgerMenu from "src/components/BurgerMenu/BurgerMenu";
import { useLocation, useNavigate } from "react-router-dom";
import WalletIcon from "../WalletIcon/WalletIcon";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    boxShadow: "0px 2px 2px rgba(0,0,0,0.3)",
    paddingLeft: 10,
    paddingRight: 10,
    [theme.breakpoints.down("md")]: {
      paddingRight: 25,
    },
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
      <img height="90%" src={Logo} alt="" onClick={() => linkClicked("/")} />

      <div className={classes.hideSmDown}>
        {links.map(([name, link], index) => (
          <Typography
            key={index}
            onClick={() => linkClicked(link)}
            className={clsx(classes.link, location.pathname === link && classes.selected)}
          >
            {name}
          </Typography>
        ))}
      </div>

      <WalletIcon />
      <div className={classes.hideMdUp}>
        <BurgerMenu links={links} />
      </div>
    </div>
  );
};

export default Navbar;
