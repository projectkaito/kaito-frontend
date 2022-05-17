import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Home from "src/pages/Home/Home";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import NotFound from "src/pages/NotFound/NotFound";
import useAccount from "./hooks/useAccount";
import { makeStyles } from "@mui/styles";
// @ts-ignore
// import backgroundImage from "src/assets/images/gif.webm";
import backgroundImage from "src/assets/images/bg.gif";
import zIndex from "@mui/material/styles/zIndex";

const useStyle = makeStyles((theme) => ({
  mainContainer: {
    //  display: "grid", gridTemplateRows: "min-content 1fr min-content"
    // height: "500vh",

    position: "relative",

    // "&:before": {
    //   content: '""',
    //   position: "absolute",
    //   top: 0,
    //   left: 0,
    //   height: "100%",
    //   width: "100%",
    //   background: "rgb(30 0 33 / 61%)",

    // },
  },
  img: {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: `url(${backgroundImage})`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPositionY: "bottom",
    position: "absolute",
    zIndex: -2,
  },
}));

interface Props {}

const Routes: React.FC<Props> = () => {
  useAccount();
  const [contentHeight, setContentHeight] = React.useState("100vh");

  const [scrollPosition, setScrollposition] = React.useState(0);
  React.useEffect(() => {
    function updatePosition() {
      setScrollposition(window.scrollY);
    }
    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const classes = useStyle();
  return (
    <div className={classes.mainContainer} style={{}}>
      <div className={classes.img}></div>
      <div
        style={{
          background: scrollPosition <= 50 ? "" : "#00000085",
          // background: scrollPosition <= 10 ? "" :  scrollPosition > 10 ? "" : "#00000085",
          transition: "background 0.5s ease-out",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      ></div>
      <Navbar />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
      {/* <Footer /> */}
    </div>
  );
};

export default Routes;
