import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Img from "src/assets/images/nfts/1.jpg";
import { NFT_IMAGES } from "src/config/constants";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    paddingTop: 50,
    paddingLeft: 50,
  },
}));

interface Props {}

const Test: React.FC<Props> = () => {
  const classes = useStyles();
  const ref = React.useRef<HTMLImageElement>(null);
  const [src, setSrc] = React.useState("");

  return (
    <div className={classes.root}>
      {/* <GlitchImg2 srcSet={NFT_IMAGES} /> */}
      <img ref={ref} src={src} className="glitch-img" style={{ position: "absolute", width: 300, height: 300 }} />
    </div>
  );
};

export default Test;
