import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Typography } from "@mui/material";
import { Stats } from "src/hooks/useWhitelist";
import { IUseTimer, useTimer } from "src/hooks/useTimer";
import { WhitelistUserType } from "src/types/apis";
import Live from "./Live";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  timeText: {
    fontSize: 12,
    marginTop: 10,
  },
  countdownContainer: {
    display: "flex",
    marginTop: 20,
    gap: 20,
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
      <Typography color="textPrimary" variant="h4">
        Welcome to the
      </Typography>
      <Typography color="primary" variant="h2">
        Future
      </Typography>
      {!timer?.timeFinished && (
        <Typography color="textPrimary" variant="h5" style={{ marginTop: 50 }}>
          <b>
            {`${selectedType ? (selectedType === WhitelistUserType.Whitelist ? "Whitelist" : "Team") : "Public"}`} Sale
          </b>
        </Typography>
      )}
      {!timer?.timeFinished && timer?.timeLeft && (
        <div className={classes.countdownContainer}>
          <div>
            <Typography color="textPrimary" variant="h4" align="center">
              <b>{timer?.timeLeft.days}</b>
            </Typography>
            <Typography color="textPrimary" align="center" className={classes.timeText}>
              Days
            </Typography>
          </div>
          <div>
            <Typography color="textPrimary" variant="h4" align="center">
              <b>{timer?.timeLeft.hours}</b>
            </Typography>
            <Typography color="textPrimary" align="center" className={classes.timeText}>
              Hours
            </Typography>
          </div>
          <div>
            <Typography color="textPrimary" variant="h4" align="center">
              <b>{timer?.timeLeft.minutes}</b>
            </Typography>
            <Typography color="textPrimary" align="center" className={classes.timeText}>
              Mins
            </Typography>
          </div>
          <div>
            <Typography color="textPrimary" variant="h4" align="center">
              <b>{timer?.timeLeft.seconds}</b>
            </Typography>
            <Typography color="textPrimary" align="center" className={classes.timeText}>
              Secs
            </Typography>
          </div>
        </div>
      )}
      {timer?.timeFinished && (
        <Typography color="textPrimary" variant="h5" style={{ marginTop: 50 }}>
          <b>
            {`${selectedType ? (selectedType === WhitelistUserType.Whitelist ? "Whitelist" : "Team") : "Public"}`} Sale
            is
            <br />
            <Live />
          </b>
        </Typography>
      )}
    </div>
  );
};

export default Content;
