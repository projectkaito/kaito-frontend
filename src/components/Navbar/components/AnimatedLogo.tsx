import React, { useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme, Typography } from "@mui/material";
import logo from "src/assets/logos/logo.png";
import backgroundImage from "src/assets/images/bg.gif";
import {
  Animator,
  ScrollPage,
  Fade,
  batch,
  Sticky,
  MoveOut,
  MoveIn,
  FadeIn,
  FadeOut,
  ZoomIn,
  Move,
} from "react-scroll-motion";
import { Box } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import WalletIcon from "src/components/WalletIcon/WalletIcon";
import BurgerMenu from "src/components/BurgerMenu/BurgerMenu";
// import { batch } from "react-redux";

// animatedLogo.defaultProps = {

// };
interface Props {
  scrollPosition?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: "100px",
    flexDirection: "column",
    // background: "red",
    width: "100%",
    height: "100vh",
  },
  logo: {
    // marginBottom: "20px",
    // zIndex: 4,
    // transform: `translateX(${percentage})`,
  },
  navItems: {
    // zIndex: 4,

    width: "max-content",
    color: "black",
    display: "flex",
    gap: "40px",
  },
  nav: {
    background: "red",
  },

  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
    // height: 100,
    boxShadow: "0px 2px 2px rgba(0,0,0,0.3)",
    paddingLeft: 10,
    paddingRight: 10,
    // position: "sticky",
    // left: `${percentage}%`,
    background: "#52266b42",
    top: "0px",
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
  navigation: {
    color: "black",
    display: "flex",
    gap: "40px",
    marginLeft: "auto",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
    // height: 100,
    boxShadow: "0px 2px 2px rgba(0,0,0,0.3)",
    paddingLeft: 10,
    paddingRight: 10,
    background: "#52266b42",
    height: "100vh",
    flexDirection: "column",
    top: "0px",
    [theme.breakpoints.down("md")]: {
      paddingRight: 25,
    },
  },
}));

const AnimatedNav: React.FC<Props> = () => {
  const [scrollPosition, setScrollposition] = React.useState(0);
  React.useLayoutEffect(() => {
    function updatePosition() {
      setScrollposition(window.scrollY);
    }
    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  const percentage = scrollPosition / 100;
  const logoRef = useRef<HTMLImageElement | null>();
  const NavItemsRef = useRef<HTMLImageElement | null>();
  React.useEffect(() => {
    let max = 300;

    let percentage = (scrollPosition / max) * 50;
    if (percentage > 50) percentage = 50;
    if (logoRef.current) {
      // console.log(logoRef.current.style.transform, percentage);
      logoRef.current.style.transform = `translateX(calc(50vw - 50% - ${percentage}vw + ${percentage}% ))`;
    }
    if (NavItemsRef.current) {
      // console.log(NavItemsRef.current.style.transform, percentage);
      NavItemsRef.current.style.transform = `translateX(calc(50vw - 50% + ${percentage}vw - ${percentage}% ))`;
    }
    console.log("scroll", scrollPosition);
  }, [scrollPosition]);

  const links = [
    ["Home", "/"],
    ["404", "/404"],
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const linkClicked = (url: string) => {
    url[0] === "/" ? navigate(url) : window.open(url, "_blank");
  };
  const classes = useStyles();

  return (
    <div
      className={classes.container}
      style={{
        background: percentage > 50 ? "#52266b42" : "",
      }}
    >
      <div style={{ width: "100%" }}>
        <img ref={logoRef as any} src={logo} className={classes.logo} alt="logo" />
      </div>
      <div style={{ width: "100%" }}>
        <div ref={NavItemsRef as any} className={classes.navItems}>
          <Button color="secondary">About</Button>
          <Button color="secondary">Roadmap</Button>
          <Button color="secondary">Purchase</Button>
          <Button color="secondary">Team</Button>
          <Button color="secondary">Mint!</Button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedNav;
