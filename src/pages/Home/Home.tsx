import React from "react";
import { Theme, Grid, Typography, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import nftImage from "src/assets/images/nftImage.png";
import RoadmapTabs from "./components/RoadmapTabs";
import Footer from "src/components/Footer/Footer";
import TeamMembers from "./components/TeamMembers";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  leftContent: {
    width: "100%",
    padding: "28px",
    margin: "auto",
    color: theme.palette.secondary.main,
    maxWidth: "472px",
  },
  title: {
    fontSize: "55px !important",
    fontWeight: "700 !important",
  },
  roadmap: {
    width: "100%",
    // padding: "28px",
    margin: "auto",
    textAlign: "center",
    color: theme.palette.secondary.main,
    // maxWidth: "672px",
    marginTop: "88px",
  },
  rightContent: {
    width: "100%",
    maxWidth: "692px",
    padding: "20px",
    color: "white",
    margin: "auto",
  },
  roadmapContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "14px",
  },
}));

interface Props {}

const Home: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xl" disableGutters>
        <Grid container justifyContent={"center"} alignItems={"center"} spacing={2}>
          <Grid item md={5}>
            <div className={classes.leftContent}>
              <Typography variant="h1" className={classes.title}>
                The Manifesto
              </Typography>
              <Typography variant="h4" color="primary" style={{ marginTop: 20 }}>
                <b> Welcome to the Future</b>
              </Typography>
              <Typography variant="body1" style={{ marginTop: 10 }}>
                There’s no better time than now. There’s no better place than here. Project Kaito is on a mission to end
                world hunger and we will not stop until world hunger is extinct. If you go the extra mile, proclaim your
                rarity and never give up, one day will be your day. Thank you for joining us on this journey to end
                world hunger.
              </Typography>
            </div>
          </Grid>
          <Grid item md={7}>
            {/* <div className={classes.rightContent}> */}
            <img style={{ width: "100%" }} src={nftImage} alt="nft image" />
            {/* </div> */}
          </Grid>
        </Grid>
        <div className={classes.roadmap}>
          <Typography variant="h1" className={classes.title}>
            Roadmap
          </Typography>
          <div className={classes.roadmapContainer}>
            <RoadmapTabs />
          </div>
        </div>
        <div className={classes.roadmap}>
          <Typography variant="h2">
            <b>TeamMembers</b>
          </Typography>
          <div>
            <TeamMembers />
          </div>
        </div>
      </Container>
      <Footer style={{ paddingTop: "20vh", marginTop: "-20vh" }} />
    </div>
  );
};

export default Home;
