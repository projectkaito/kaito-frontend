import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import glitch from "glitch-canvas";
import { getBase64 } from "src/utils";

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
  const [int, setInt] = React.useState<NodeJS.Timer[]>([]);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const setGlitchImg = (
    iterations: {
      iterations: number;
    },
    image: HTMLImageElement
  ) => {
    let amount = 99;
    let seed = 35;
    let quality = 99;
    glitch({ amount: 60, seed: 84, quality: 55, iterations: iterations.iterations })
      .fromImage(image)
      .toDataURL()
      .then(function (dataURL: string) {
        if (imgRef?.current) imgRef.current.src = dataURL;
        iterations.iterations++;
        if (iterations.iterations > 10) iterations.iterations = 1;
      });
  };

  // function to get random number from range
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const startGlitch = React.useCallback(() => {
    if (!imgRef?.current) return;
    let img = new Image();
    if (src) {
      img.src = src;
    } else if (srcSet) {
      setInt((ele) => {
        ele[0] = setInterval(() => {
          img.src = srcSet[getRandomInt(0, srcSet.length - 1)];
        }, 2000);
        return ele;
      });
    } else return;
    let obj = { iterations: 1 };
    setInt((ele) => {
      ele[1] = setInterval(() => setGlitchImg(obj, img), 100);
      return ele;
    });
    img.onload = () => {};
  }, [src]);

  React.useEffect(() => {
    startGlitch();
    return () => {
      int.forEach((item) => {
        clearInterval(item);
      });
    };
  }, [startGlitch, glitch]);

  React.useEffect(() => {
    // getBase64()
  });

  return <img ref={imgRef} className={classes.root}></img>;
};

export default GlitchImg;
