import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Typography } from "@mui/material";

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

interface Props {}

const Content: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography color="textPrimary" variant="h4">
        Welcome to the
      </Typography>
      <Typography color="primary" variant="h2">
        Future
      </Typography>
      <Typography color="textPrimary" variant="h5" style={{ marginTop: 50 }}>
        <b>Public Sale</b>
      </Typography>
      <div className={classes.countdownContainer}>
        <div>
          <Typography color="textPrimary" variant="h4" align="center">
            <b>20</b>
          </Typography>
          <Typography color="textPrimary" align="center" className={classes.timeText}>
            Days
          </Typography>
        </div>
        <div>
          <Typography color="textPrimary" variant="h4" align="center">
            <b>03</b>
          </Typography>
          <Typography color="textPrimary" align="center" className={classes.timeText}>
            Hours
          </Typography>
        </div>
        <div>
          <Typography color="textPrimary" variant="h4" align="center">
            <b>18</b>
          </Typography>
          <Typography color="textPrimary" align="center" className={classes.timeText}>
            Mins
          </Typography>
        </div>
        <div>
          <Typography color="textPrimary" variant="h4" align="center">
            <b>08</b>
          </Typography>
          <Typography color="textPrimary" align="center" className={classes.timeText}>
            Secs
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Content;
