import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Typography } from "@mui/material";
import { Stats } from "src/hooks/useWhitelist";
import { IUseTimer, useTimer } from "src/hooks/useTimer";
import { WhitelistUserType } from "src/types/apis";
import Live from "./Live";
import MeetKaito from "src/assets/images/meet_kaito.svg";
import SpeechBubble from "src/assets/images/speech_bubble.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "absolute",
    top: "25%",
    left: "15%",
  },
  timeText: {
    fontSize: 12,
    marginTop: 10,
  },
  countdownContainer: {
    display: "flex",
    marginTop: 20,
    gap: 20,
  },
  meetKaitoImg: {
    width: 300,
    [theme.breakpoints.down("md")]: {
      width: 250,
    },
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
  },
  bubble: {
    background: `url(${SpeechBubble})`,
    backgroundSize: "100% 100%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 321,
    height: 174,
    paddingLeft: 52,
    paddingBottom: 58,
    [theme.breakpoints.down("sm")]: {
      width: 250,
      height: 167,
      paddingLeft: 39,
      paddingBottom: 65,
    },
  },
}));

interface Props {
  stats?: Stats;
  selectedType?: WhitelistUserType;
  timer?: IUseTimer;
}

const Content: React.FC<Props> = ({ selectedType, timer }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={MeetKaito} alt="" className={classes.meetKaitoImg} />
      {/* <Typography color="textPrimary" variant="h4">
        Welcome to the
      </Typography>
      <Typography color="primary" variant="h2">
        Future
      </Typography> */}
      <div
        className={classes.bubble}
        style={{ display: !(!timer?.timeFinished && timer?.timeLeft) ? "none" : undefined }}
      >
        {!timer?.timeFinished && (
          <Typography color="primary" variant="h5" style={{ marginTop: 50 }}>
            {`${selectedType ? (selectedType === WhitelistUserType.Whitelist ? "Whitelist" : "Team") : "Public"}`} Sale
          </Typography>
        )}
        {!timer?.timeFinished && timer?.timeLeft && (
          <div className={classes.countdownContainer}>
            <div>
              <Typography color="primary" variant="h4" align="center">
                <b>{timer?.timeLeft.days}</b>
              </Typography>
              <Typography color="primary" align="center" className={classes.timeText}>
                Days
              </Typography>
            </div>
            <div>
              <Typography color="primary" variant="h4" align="center">
                <b>{timer?.timeLeft.hours}</b>
              </Typography>
              <Typography color="primary" align="center" className={classes.timeText}>
                Hours
              </Typography>
            </div>
            <div>
              <Typography color="primary" variant="h4" align="center">
                <b>{timer?.timeLeft.minutes}</b>
              </Typography>
              <Typography color="primary" align="center" className={classes.timeText}>
                Mins
              </Typography>
            </div>
            <div>
              <Typography color="primary" variant="h4" align="center">
                <b>{timer?.timeLeft.seconds}</b>
              </Typography>
              <Typography color="primary" align="center" className={classes.timeText}>
                Secs
              </Typography>
            </div>
          </div>
        )}
        {/* {timer?.timeFinished && (
          <Typography color="primary" variant="h5" style={{ marginTop: 10 }}>
            {`${selectedType ? (selectedType === WhitelistUserType.Whitelist ? "Whitelist" : "Team") : "Public"}`} Sale
            is
            <br />
            <Live />
          </Typography>
        )} */}
      </div>
    </div>
  );
};

export default Content;
