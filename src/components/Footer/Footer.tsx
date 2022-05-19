import React from "react";
import { Container, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "src/assets/logos/logo.png";
import Facebook from "src/assets/images/icons/facebook.png";
import Instagram from "src/assets/images/icons/instagram.png";
import Twitter from "src/assets/images/icons/twitter.png";
import Youtube from "src/assets/images/icons/youtube.png";
import Opensea from "src/assets/images/icons/opensea.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "80vh",
    background: "radial-gradient(ellipse at 50% 130%, rgba(50, 0, 26, 1) 15%, rgba(2, 0, 36, 1) 100%)",
    backgroundAttachment: "fixed",
    // background: "radial-gradient(ellipse at 50% 100%, rgba(50,0,26,1) 29%, rgba(2,0,36,1) 100%)",
  },
  socialsContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: 300,
    margin: "auto",
    marginTop: "10%",
    "& a:hover": {
      transform: "scale(1.1)",
    },
  },
}));

interface Props {}

const Footer: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="center" style={{ height: "100%" }}>
        <div style={{ width: "100%" }}>
          <div className="center">
            <img src={logo} alt="Kaito" />
          </div>
          <div className={classes.socialsContainer}>
            <a href="#" target="_blank">
              <img src={Facebook} alt="facebook" />
            </a>
            <a href="#" target="_blank">
              <img src={Instagram} alt="instagram" />
            </a>
            <a href="#" target="_blank">
              <img src={Twitter} alt="twitter" />
            </a>
            <a href="#" target="_blank">
              <img src={Youtube} alt="youtube" />
            </a>
            <a href="#" target="_blank">
              <img src={Opensea} alt="opensea" />
            </a>
          </div>
          <Typography color="secondary" align="center" style={{ marginTop: 50 }}>
            © Kaito 2022 | All Rights Reserved
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Footer;
