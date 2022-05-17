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
import theme from "src/utils/theme";

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
  navContent: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  logo: {
    width: "100%",
    maxWidth: "184px",

    [theme.breakpoints.down("md")]: {
      maxWidth: "124px",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100px",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "84px",
    },
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
    [theme.breakpoints.down("md")]: {
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
    display: " flex",
    alignItems: "center",
    justifyContent: "space-between",

    position: "fixed",
    top: "12px",
    left: "12px",
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
    // boxShadow: "0px 0px 114px 1px #140a1a, inset -11px 0px 54px -7px #0a0a0a",
    paddingLeft: 10,
    paddingRight: 10,
    // background: "#52266b42",
    transition: "all 0.5s linear",
    flexDirection: "column",
    top: "0px",
    [theme.breakpoints.down("md")]: {
      paddingRight: 25,
      height: "95px !important",
    },
  },
}));

const Navbar: React.FC<Props> = () => {
  const [scrollPosition, setScrollposition] = React.useState(0);
  React.useLayoutEffect(() => {
    myscrollfn(0);
    function updatePosition() {
      setScrollposition(window.scrollY);
      myscrollfn(window.scrollY);
    }
    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  const percentage = scrollPosition / 100;
  const logoRef = useRef<HTMLImageElement | null>();
  const NavItemsRef = useRef<HTMLImageElement | null>();
  const max = 333;
  React.useEffect(() => {
    // let
  }, [scrollPosition]);

  console.log("percentage", percentage);
  function myscrollfn(scrollPosition: number) {
    let percentage = (scrollPosition / max) * 39;
    if (percentage > 50) percentage = 50;
    if (logoRef.current) {
      logoRef.current.style.transform = `translateX(calc(50vw - 50% - ${percentage}vw + ${percentage}% ))`;
    }
    if (NavItemsRef.current) {
      NavItemsRef.current.style.transform = `translateX(calc(50vw - 50% + ${percentage}vw - ${percentage}% ))`;
    }
    console.log("scroll", scrollPosition);
  }

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
  console.log("percentage", percentage);
  return (
    <div
      className={classes.container}
      style={{
        // height: percentage >= 4 ? "" : "100vh",
        height: "100vh",
      }}
    >
      <div
        className={classes.navContent}
        style={{
          // background: percentage >= 10 ? "#210825f2" : "",
          // boxShadow: percentage >= 10 ? "inset 0px 0px 114px 12px black, inset -11px 0px 35px -1px black" : "",
          width: "100%",
          height: "100px",

          position: percentage >= 4 ? "fixed" : "sticky",
          top: "0px",
          left: "10px",
        }}
      >
        <img
          ref={logoRef as any}
          style={{
            marginTop: scrollPosition === 0 ? "" : "13px",
            marginLeft: scrollPosition === 0 ? "" : "28px",
          }}
          src={logo}
          className={classes.logo}
          alt="logo"
        />
        {/* <LinearProgress /> */}
      </div>
      <div
        style={{
          width: "100%",
          height: "100px",

          position: percentage >= 4 ? "fixed" : "sticky",
          inset: "44px -76px",
        }}
      >
        {scrollPosition > 5 && (
          <div ref={NavItemsRef as any} className={classes.navItems}>
            <div className={classes.hideSmDown}>
              <Button color="secondary">About</Button>
              <Button color="secondary">Roadmap</Button>
              <Button color="secondary">Purchase</Button>
              <Button color="secondary">Team</Button>
              <Button color="secondary">Mint!</Button>
              <WalletIcon />
            </div>
          </div>
        )}
      </div>

      <div className={classes.hideMdUp}>
        <img src={logo} className={classes.logo} alt="logo" />
        <BurgerMenu links={links} />
      </div>
    </div>
  );
};

export default Navbar;
