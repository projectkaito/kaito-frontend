import React from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, Theme, Typography } from "@mui/material";
import CharImg from "src/assets/images/character.png";
import TwitterIcon from "@mui/icons-material/Twitter";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  img: {
    width: "100%",
    objectFit: "cover",
    aspectRatio: "1/1",
  },
  contentContainer: {
    border: `2px solid ${theme.palette.primary.main}`,
    padding: 16,
    borderTop: "0px",
  },
}));

interface Props {}

const TeamMemberCard: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={CharImg} alt="" className={classes.img} />
      <div className={classes.contentContainer}>
        <div>
          <Typography variant="h4">Faraz</Typography>
          <Typography variant="h4">Artist</Typography>
        </div>
        <IconButton>
          <TwitterIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TeamMemberCard;
