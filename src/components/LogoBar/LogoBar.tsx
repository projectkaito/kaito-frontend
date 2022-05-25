import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Logo from "src/assets/logos/logo.png";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
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
      <img src={Logo} alt="Kaito" style={{ maxWidth: 150, marginTop: 20 }} onClick={handleClick} />
    </div>
  );
};

export default LogoBar;
