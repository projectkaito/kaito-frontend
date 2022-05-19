import React from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, Theme, Typography } from "@mui/material";
import CharImg from "src/assets/images/character.png";
import TwitterIcon from "@mui/icons-material/Twitter";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      boxShadow: "10px 10px 5px rgba(211,22,94,0.8)",
      transform: "translate(-10px, -10px)",
    },
  },
  img: {
    width: "100%",
    objectFit: "cover",
    aspectRatio: "1/1",
    cursor: "pointer",
  },
  contentContainer: {
    border: `2px solid ${theme.palette.primary.main}`,
    padding: "16px 24px",
    borderTop: "0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  contentWrapper: {
    display: "flex",
    flexFlow: "column",
    alignItems: "flex-start",
    width: "calc(100% - 20px)",
  },
  title: {
    fontFamily: theme.fonts[0],
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
  },
}));

interface Props {}

const TeamMemberCard: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={CharImg} alt="" className={classes.img} />
      <div className={classes.contentContainer}>
        <div className={classes.contentWrapper}>
          <Typography variant="h4" color="primary" align="left" className={classes.title}>
            <b>Faraz</b>
          </Typography>
          <Typography>Artist</Typography>
        </div>
        <IconButton color="secondary">
          <TwitterIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

export default TeamMemberCard;
