import React, { CSSProperties } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { getGlitchImagesForMultpleImages, imagesToGif } from "src/utils/glitch";
import clsx from "clsx";

import { useWorker } from "react-hooks-worker";

const createWorker = () => new Worker(new URL("src/utils/glitch.worker.ts", import.meta.url));

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
  // const { result, error } = useWorker(createWorker, srcSet);

  // console.log(result);
  React.useEffect(() => {
    if (!srcSet) return;
    getGlitchImagesForMultpleImages(srcSet).then(async (res) => {
      setImg(res);
    });
  }, [srcSet]);

  return <img src={img} className={clsx(classes.root, className)} style={style} />;
};

export default GlitchImg;
