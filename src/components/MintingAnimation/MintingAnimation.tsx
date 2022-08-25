import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Typography } from "@mui/material";
import Right from "src/assets/images/pink_lightning.png";
import { motion, useAnimationControls } from "framer-motion";
import Explosion from "src/assets/images/explosion.svg";

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
    width: "63%",
    height: "100%",
    background: `url(${Right})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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
    transform: "translate(-50%,-50%)",
    fontWeight: 600,
  },
}));

interface IProps {
  open: boolean;
}

const MintingAnimation: React.FC<IProps> = ({ open }) => {
  const classes = useStyles();
  const controlsLeft = useAnimationControls();
  const controlsRight = useAnimationControls();
  const typeRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (open) {
      controlsLeft.start({ x: "0%" });
      controlsRight.start({ x: "0%" });
    } else {
      controlsLeft.start({ x: "-100%" });
      controlsRight.start({ x: "100%" });
    }
  }, [open, controlsLeft, controlsRight]);

  React.useEffect(() => {}, []);

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
      ></motion.div>
      <div className={classes.explosion}>
        <motion.div>
          <motion.img
            animate={{ scale: [0.95, 1, 0.95] }}
            transition={{ repeat: Infinity, duration: 0.4 }}
            src={Explosion}
            alt=""
          />
          <Typography ref={typeRef} variant="h2" className={classes.typography}>
            Minting...
          </Typography>
        </motion.div>
      </div>
    </div>
  );
};

export default MintingAnimation;
