import React, { CSSProperties } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import clsx from "clsx";
import "src/utils/mgGlitch";
import $ from "jquery";
import { NFT_IMAGES } from "src/config/constants";
import { imagesToGif } from "src/utils/glitch";

const useStyles = makeStyles((theme: Theme) => ({
  root: { width: 300, height: 300 },
}));

interface Props {
  srcSet: string[];
  className?: string;
  style?: CSSProperties;
}

const GlitchImg2: React.FC<Props> = ({ srcSet, className, style }) => {
  const classes = useStyles();
  const ref = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    imagesToGif(
      srcSet.reduce((prev: string[], curr) => {
        for (let i = 0; i < 20; i++) {
          prev.push(curr);
        }
        return prev;
      }, [])
    ).then((r) => {
      // @ts-ignore
      ref.current.src = r;
      // @ts-ignore
      ref.current.onload = () => {
        $(function () {
          console.log("innnn");
          // @ts-ignore
          $(".glitch-img").mgGlitch({
            // set 'true' to stop the plugin
            destroy: false,
            // set 'false' to stop glitching
            glitch: true,
            // set 'false' to stop scaling
            scale: true,
            // set 'false' to stop glitch blending
            blend: true,
            // select blend mode type
            blendModeType: "hue",
            // set min time for glitch 1 elem
            glitch1TimeMin: 200,
            // set max time for glitch 1 elem
            glitch1TimeMax: 400,
            // set min time for glitch 2 elem
            glitch2TimeMin: 10,
            // set max time for glitch 2 elem
            glitch2TimeMax: 100,
          });
        });
      };
    });
  }, []);

  return (
    <div>
      <img ref={ref} className={clsx(classes.root, "glitch-img", className)} style={style} />;
    </div>
  );
};

export default GlitchImg2;
