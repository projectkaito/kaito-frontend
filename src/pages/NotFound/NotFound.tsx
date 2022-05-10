import React from "react";
import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface Props {}

const NotFound: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" align="center">
        404
      </Typography>
    </div>
  );
};

export default NotFound;
