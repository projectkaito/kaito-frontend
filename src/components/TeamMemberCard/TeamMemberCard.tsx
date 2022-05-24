import React from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, Theme, Typography } from "@mui/material";
import CharImg from "src/assets/images/character.png";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ImdbImg from "src/assets/icons/imdb.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    transition: "all 0.2s ease-in-out",
    height: "100%",
    display: "grid",
    gridTemplateRows: "min-content 1fr",
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
    fontWeight: 600,
    letterSpacing: 2,
  },
}));

interface Props {
  image: string;
  name: string;
  designation?: string;
  twitter?: string;
  instagram?: string;
  imdb?: string;
}

const TeamMemberCard: React.FC<Props> = ({ image, name, designation, instagram, twitter, imdb }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={image} alt="" className={classes.img} />
      <div className={classes.contentContainer}>
        <div className={classes.contentWrapper}>
          <Typography variant="h4" color="primary" align="left" className={classes.title}>
            {name}
          </Typography>
          <Typography>{designation}</Typography>
        </div>
        <div>
          {instagram && (
            <IconButton href="https://www.instagram.com/projectkaitonft/" color="secondary">
              <InstagramIcon fontSize="small" />
            </IconButton>
          )}
          {twitter && (
            <IconButton color="secondary">
              <TwitterIcon fontSize="small" />
            </IconButton>
          )}
          {imdb && (
            <IconButton color="secondary">
              <img src={ImdbImg} alt="imdb" height="13px" />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
