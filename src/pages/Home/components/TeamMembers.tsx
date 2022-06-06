import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme, Typography } from "@mui/material";
import TeamMemberCard from "src/components/TeamMemberCard/TeamMemberCard";
import Jake from "src/assets/images/team/jake.png";
import Tobi from "src/assets/images/team/tobi.png";
import Kaito from "src/assets/images/team/kaito.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 100,
  },
}));

interface Props {}

const TeamMembers: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container style={{ maxWidth: 1600 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <TeamMemberCard
              image={Kaito}
              name="Michael Chasteen"
              designation="Founder"
              instagram="https://www.instagram.com/projectkaitonft/"
              imdb="https://www.imdb.com/name/nm11955761/"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TeamMemberCard
              image={Jake}
              name="Jake Lee"
              designation="Advisor"
              twitter="https://twitter.com/jakeleenft"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TeamMemberCard image={Tobi} name={"Tobi Allen"} designation="Project Manager" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TeamMembers;
