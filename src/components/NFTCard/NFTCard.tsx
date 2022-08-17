import React from "react";
import { makeStyles } from "@mui/styles";
import { Paper, TextField, Theme, Typography } from "@mui/material";
import { NFT_IMAGES } from "src/config/constants";
import GlitchImg from "../GlitchImg/GlitchImg";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  img: {
    width: "100%",
  },
}));

interface IProps {}

const NFTCard: React.FC<IProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GlitchImg srcSet={NFT_IMAGES} className={classes.img} />
      <Paper sx={{ p: 1 }}>
        <Typography variant="h6" color="secondary">
          <b>NFT Name</b>
        </Typography>
      </Paper>
    </div>
  );
};

export default NFTCard;
