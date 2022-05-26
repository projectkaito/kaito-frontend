import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Img from "src/assets/images/nfts/1.jpg";
import "src/utils/mgGlitch";
import $ from "jquery";
import { NFT_IMAGES } from "src/config/constants";
import { imagesToGif } from "src/utils/glitch";
import GlitchImg2 from "src/components/GlitchImg2/GlitchImg2";

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

  React.useEffect(() => {
    imagesToGif(
      NFT_IMAGES.reduce((prev: string[], curr) => {
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

  React.useEffect(() => {
    imagesToGif(NFT_IMAGES).then((r) => setSrc(r));
  }, []);

  return (
    <div className={classes.root}>
      {/* <GlitchImg2 srcSet={NFT_IMAGES} /> */}
      <img ref={ref} src={Img} className="glitch-img" style={{ position: "absolute", width: 300, height: 300 }} />
    </div>
  );
};

export default Test;
