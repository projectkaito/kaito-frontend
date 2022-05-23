import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import glitch from "glitch-canvas";
import { getBase64 } from "src/utils";
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
  const int = React.useRef<NodeJS.Timer[]>([]);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [imagesBase64, setImagesBase64] = React.useState<string[]>([]);
  const [glitchedImages, setGlitchedImages] = React.useState<string[]>([]);
  const [img, setImg] = React.useState("");

  const srcSetToBase64 = async () => {
    if (!srcSet) return;
    let arr: string[] = [];
    for (let i = 0; i < srcSet.length; i++) {
      const element = srcSet[i];
      let data = await getBase64(element);
      arr.push(data);
    }
    setImagesBase64(arr);
  };

  React.useEffect(() => {
    srcSetToBase64();
  }, [srcSet]);

  React.useEffect(() => {
    if (!srcSet) return;
    getGlitchImagesForMultpleImages(srcSet).then(async (res) => {
      setGlitchedImages(res);
      setImg(await imagesToGif(res));
    });
  }, [srcSet]);

  React.useEffect(() => {
    let index = 0;
    let int = setInterval(() => {
      if (!imgRef?.current) return;
      if (glitchedImages.length > 0) {
        imgRef.current.src = glitchedImages[index];
        index === glitchedImages.length - 1 ? (index = 0) : index++;
      }
    }, 100);
    return () => {
      clearInterval(int);
    };
  }, [glitchedImages]);

  return (
    <img
      src={img}
      // ref={imgRef}
      className={classes.root}
    />
  );
};

export default GlitchImg;
