import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Typography } from "@mui/material";
import { Stats } from "src/hooks/useWhitelist";
import { useTimer } from "src/hooks/useTimer";

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
  selectedType?: "team" | "user";
}

const Content: React.FC<Props> = ({ stats, selectedType }) => {
  const classes = useStyles();
  const timestamp = React.useMemo(
    () =>
      selectedType
        ? selectedType === "user"
          ? stats?.whitelistMintStartTimestamp
          : stats?.teamMintStartTimestamp
        : stats?.publicMintStartTimestamp,
    [selectedType, stats]
  );
  const { timeFinished, timeLeft } = useTimer(timestamp);

  return (
    <div className={classes.root}>
      <Typography color="textPrimary" variant="h4">
        Welcome to the
      </Typography>
      <Typography color="primary" variant="h2">
        Future
      </Typography>
      {!timeFinished && (
        <Typography color="textPrimary" variant="h5" style={{ marginTop: 50 }}>
          <b>{`${selectedType ? (selectedType === "user" ? "Whitelist" : "Team") : "Public"}`} Sale</b>
        </Typography>
      )}
      {!timeFinished && (
        <div className={classes.countdownContainer}>
          <div>
            <Typography color="textPrimary" variant="h4" align="center">
              <b>{timeLeft.days}</b>
            </Typography>
            <Typography color="textPrimary" align="center" className={classes.timeText}>
              Days
            </Typography>
          </div>
          <div>
            <Typography color="textPrimary" variant="h4" align="center">
              <b>{timeLeft.hours}</b>
            </Typography>
            <Typography color="textPrimary" align="center" className={classes.timeText}>
              Hours
            </Typography>
          </div>
          <div>
            <Typography color="textPrimary" variant="h4" align="center">
              <b>{timeLeft.minutes}</b>
            </Typography>
            <Typography color="textPrimary" align="center" className={classes.timeText}>
              Mins
            </Typography>
          </div>
          <div>
            <Typography color="textPrimary" variant="h4" align="center">
              <b>{timeLeft.seconds}</b>
            </Typography>
            <Typography color="textPrimary" align="center" className={classes.timeText}>
              Secs
            </Typography>
          </div>
        </div>
      )}
      {timeFinished && (
        <Typography color="textPrimary" variant="h5" style={{ marginTop: 50 }}>
          <b>
            {`${selectedType ? (selectedType === "user" ? "Whitelist" : "Team") : "Public"}`} Sale is
            <br />
            Live
          </b>
        </Typography>
      )}
    </div>
  );
};

export default Content;
