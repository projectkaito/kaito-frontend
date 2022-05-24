import React, { CSSProperties } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { getGlitchImagesForMultpleImages, imagesToGif } from "src/utils/glitch";
import clsx from "clsx";

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
  className?: string;
  style?: CSSProperties;
}

const GlitchImg: React.FC<Props> = ({ src, srcSet, className, style }) => {
  const classes = useStyles();
  const [img, setImg] = React.useState("");

  React.useEffect(() => {
    if (!srcSet) return;
    getGlitchImagesForMultpleImages(srcSet).then(async (res) => {
      setImg(await imagesToGif(res));
    });
  }, [srcSet]);

  return <img src={img} className={clsx(classes.root, className)} style={style} />;
};

export default GlitchImg;
