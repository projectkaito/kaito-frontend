import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme, Typography } from "@mui/material";
import TeamMemberCard from "src/components/TeamMemberCard/TeamMemberCard";

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
          <Grid item xs={6} md={4} lg={3}>
            <TeamMemberCard />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <TeamMemberCard />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <TeamMemberCard />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <TeamMemberCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TeamMembers;
