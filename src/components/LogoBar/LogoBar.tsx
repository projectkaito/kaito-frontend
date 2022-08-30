import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Logo from "src/assets/logos/logo.png";
// import Logo2 from "src/assets/images/kaito_logo.svg";
import { useNavigate } from "react-router-dom";
import WalletIcon from "../WalletIcon/WalletIcon";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  img: {
    maxWidth: 200,
    cursor: "pointer",
    // marginTop: -20,
    // position: "fixed",
    [theme.breakpoints.down("sm")]: {
      // marginTop: 40,
      maxWidth: 150,
    },
  },
}));

interface Props {}

const LogoBar: React.FC<Props> = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className={classes.root}>
      <img src={Logo} alt="Kaito" onClick={handleClick} className={classes.img} />
      <WalletIcon />
    </div>
  );
};

export default LogoBar;
