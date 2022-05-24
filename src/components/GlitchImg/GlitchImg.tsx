import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { getGlitchImagesForMultpleImages, imagesToGif } from "src/utils/glitch";

// var myWorker = new Worker("src/utils/glitch.ts");

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 300,
    height: 300,
  },
}));
interface Props {
  src?: string;
  srcSet?: string[];
}

const GlitchImg: React.FC<Props> = ({ src, srcSet }) => {
  const classes = useStyles();
  const [img, setImg] = React.useState("");

  React.useEffect(() => {
    if (!srcSet) return;
    getGlitchImagesForMultpleImages(srcSet).then(async (res) => {
      setImg(await imagesToGif(res));
    });
  }, [srcSet]);

  return <img src={img} className={classes.root} />;
};

export default GlitchImg;
