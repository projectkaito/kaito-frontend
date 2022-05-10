import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Home from "src/pages/Home/Home";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import NotFound from "src/pages/NotFound/NotFound";
import useAccount from "./hooks/useAccount";
import { makeStyles } from "@mui/styles";
import backgroundImage from "src/assets/images/bg.gif";
import zIndex from "@mui/material/styles/zIndex";

const useStyle = makeStyles((theme) => ({
  mainContainer: {
    //  display: "grid", gridTemplateRows: "min-content 1fr min-content"
    height: "500vh",

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

  const classes = useStyle();
  return (
    <div onScroll={() => setContentHeight("500px")} className={classes.mainContainer} style={{}}>
      <div className={classes.img}></div>
      <div
        style={{
          background: "rgb(30 0 33 / 61%)",
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
