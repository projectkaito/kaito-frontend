import React, { useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme, Typography } from "@mui/material";
import logo from "src/assets/logos/logo.png";
import { Box } from "@mui/system";
import {  useNavigate } from "react-router-dom";
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
    position: "relative",
    // display: "flex",
    // justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      // display: "none",
    },
  },
  logo: {
    width: "100%",
    maxWidth: "184px",
    transition: "padding .2s ease-in-out",
    pointerEvents: "all",
    [theme.breakpoints.down("md")]: {
      maxWidth: "124px",
    },
    [theme.breakpoints.down("sm")]: {
      // maxWidth: "100px",
    },
    [theme.breakpoints.down("xs")]: {
      // maxWidth: "84px",
    },
  },
  navItems: {
    // zIndex: 4,

    width: "max-content",
    color: "black",
    display: "flex",
    gap: "40px",
    transition: "opacity 100ms ease-in-out",
    paddingRight: 20,
    pointerEvents: "all",
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
    pointerEvents: "all",
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
    paddingLeft: 0,
    paddingRight: 20,
    paddingTop: 10,
    transition: "all 0.5s linear",
    flexDirection: "column",
    top: "-1px",
    position: "relative",
    background: "rgba(0,0,0,0)",
    boxShadow: "none",
    pointerEvents: "none",
    [theme.breakpoints.up("md")]: {
      background: "transparent !important",
    },
  },
  navContainer: {
    width: "100%",
    position: "relative",
    top: -117,
  },
  containerScrolled: {
    background: "linear-gradient(180deg, rgba(0,0,0,1), rgba(0,0,0,0))",
    // backdropFilter: "blur(5px)",
    // boxShadow: "0px 5px 20px rgba(0,0,0,0.3)",
  },
}));
const max = window.innerHeight / 2 - 75;

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

  const logoRef = useRef<HTMLImageElement | null>(null);
  const NavItemsRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // let
  }, [scrollPosition]);

  function myscrollfn(scrollPosition: number) {
    let percentage = (scrollPosition / max) * 50;
    if (percentage > 50) percentage = 50;

    if (logoRef.current) {
      logoRef.current.style.transform = `translateX(calc(50vw - 50% - ${percentage}vw + ${percentage}% ))`;
      if (percentage > 49 && containerRef.current) {
        containerRef.current.classList.add(classes.containerScrolled);
        logoRef.current.style.marginLeft = "30px";
      } else if (containerRef.current) {
        containerRef.current.classList.remove(classes.containerScrolled);
        logoRef.current.style.marginLeft = "0px";
      }
    }
    if (NavItemsRef.current) {
      NavItemsRef.current.style.transform = `translateX(calc(50vw - 50% + ${percentage}vw - ${percentage}% ))`;
      if (percentage > 10) NavItemsRef.current.style.opacity = "1";
      else NavItemsRef.current.style.opacity = "0";
    }
  }

  const links = [
    ["Home", "/"],
    ["Minting", "/minting"],
    ["Whitelist", "/whitelist"],
    ["NFT", "/nft/0x0/0"],
    ["404", "/404"],
  ];

  const navigate = useNavigate();

  const linkClicked = (url: string) => {
    url[0] === "/" ? navigate(url) : window.open(url, "_blank");
  };

  const classes = useStyles();
  return (
    <div
      className={classes.container}
      ref={containerRef!}
      style={{
        position: "sticky",
        zIndex: 10,
      }}
    >
      <div
        className={classes.navContent}
        style={{
          width: "100%",
        }}
      >
        <img ref={logoRef} src={logo} className={classes.logo} alt="logo" />
      </div>
      <div className={classes.navContainer}>
        <div ref={NavItemsRef} className={classes.navItems} style={{ opacity: 0 }}>
          <div className={classes.hideSmDown}>
            <Button color="secondary">About</Button>
            <Button color="secondary">Roadmap</Button>
            <Button color="secondary">Purchase</Button>
            <Button color="secondary">Team</Button>
            <Button color="secondary">Mint!</Button>
          </div>
        </div>
      </div>

      <div className={classes.hideMdUp}>
        <BurgerMenu links={links} />
      </div>
    </div>
  );
};

export default Navbar;
