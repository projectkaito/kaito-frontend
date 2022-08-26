import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Typography } from "@mui/material";
import Right from "src/assets/images/redside.png";
import { motion, useAnimationControls } from "framer-motion";
import Explosion from "src/assets/images/explosion.svg";
import ThunderTop from "src/assets/images/thunder1.png";
import ThunderBottom from "src/assets/images/thunder2.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 15,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
  },
  right: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "60%",
    height: "100%",
    background: `url(${Right})`,
    // backgroundSize: "100% 100%",
    backgroundSize: "100% 120%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  thunderTop: {
    position: "absolute",
    top: 0,
    left: "14%",
    background: `url(${ThunderTop})`,
    width: "30%",
    height: "50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 135%",
    backgroundPositionY: "bottom",
  },
  thunderBottom: {
    position: "absolute",
    bottom: 0,
    left: "-13%",
    background: `url(${ThunderBottom})`,
    width: "30%",
    height: "54%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 123%",
    backgroundPositionY: "top",
  },
  left: {
    background: "linear-gradient(148.88deg, #191919 0%, #333333 86.13%)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "70%",
    height: "100%",
  },
  explosion: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "& img": {
      width: 500,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  typography: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-140px,-50%)",
    fontWeight: 600,
    [theme.breakpoints.down("lg")]: {
      transform: "translate(-120px,-50%)",
    },
    [theme.breakpoints.down("md")]: {
      transform: "translate(-100px,-50%)",
    },
    [theme.breakpoints.down("sm")]: {
      transform: "translate(-90px,-50%)",
    },
  },
}));

interface IProps {
  open: boolean;
}

const MintingAnimation: React.FC<IProps> = ({ open }) => {
  const classes = useStyles();
  const controlsLeft = useAnimationControls();
  const controlsRight = useAnimationControls();
  const explostionControl = useAnimationControls();
  const thunderTopControl = useAnimationControls();
  const thunderBottomControl = useAnimationControls();
  const typeRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (open) {
      controlsLeft.start({ x: "0%" });
      controlsRight.start({ x: "0%" });
      explostionControl.start({ scale: 1 });
      thunderTopControl.start({ y: 0, transition: { delay: 0.8, bounce: 0, duration: 0.2 } });
      thunderBottomControl.start({ y: 0, transition: { delay: 0.8, bounce: 0, duration: 0.2 } });
    } else {
      controlsLeft.start({ x: "-100%" });
      controlsRight.start({ x: "100%" });
      explostionControl.start({ scale: 0, transition: { delay: 0 } });
      thunderTopControl.start({ y: "-100%" });
      thunderBottomControl.start({ y: "100%" });
    }
  }, [open, controlsLeft, controlsRight, explostionControl, thunderTopControl, thunderBottomControl]);

  React.useEffect(() => {
    let int = setInterval(() => {
      if (typeRef.current) {
        switch (typeRef.current.innerHTML) {
          case "Minting...":
            typeRef.current.innerHTML = "Minting";
            break;
          case "Minting":
            typeRef.current.innerHTML = "Minting.";
            break;
          case "Minting.":
            typeRef.current.innerHTML = "Minting..";
            break;
          case "Minting..":
            typeRef.current.innerHTML = "Minting...";
            break;
        }
      }
    }, 300);
    return () => {
      clearInterval(int);
    };
  }, []);

  return (
    <div className={classes.root}>
      <motion.div
        initial={{ x: "-100%" }}
        animate={controlsLeft}
        transition={{ duration: 0.5 }}
        className={classes.left}
      ></motion.div>
      <motion.div
        initial={{ x: "100%" }}
        animate={controlsRight}
        transition={{ duration: 0.5 }}
        className={classes.right}
      >
        <motion.div animate={thunderTopControl} className={classes.thunderTop}></motion.div>
        <motion.div animate={thunderBottomControl} className={classes.thunderBottom}></motion.div>
      </motion.div>
      <div className={classes.explosion}>
        <motion.div initial={{ scale: 0 }} animate={explostionControl} transition={{ delay: 0.5 }}>
          <motion.img
            animate={{ scale: [0.95, 1, 0.95] }}
            transition={{ repeat: Infinity, duration: 0.4 }}
            src={Explosion}
            alt=""
          />
          <Typography ref={typeRef} variant="h2" align="left" className={classes.typography}>
            Minting...
          </Typography>
        </motion.div>
      </div>
    </div>
  );
};

export default MintingAnimation;
