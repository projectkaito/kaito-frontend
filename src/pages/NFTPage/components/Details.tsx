import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Theme, Typography } from "@mui/material";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  attributeWrapper: {
    padding: "10px 16px",
    transition: "all .2s ease-out",
    border: "1px solid white",
  },
  attrType: {
    fontSize: 12,
  },
}));

interface Props {
  data: {
    name: string;
    description: string;
    image: string;
    attributes: {
      trait_type: string;
      value: string;
    }[];
  };
}

const Details: React.FC<Props> = ({ data }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="textPrimary">
        {data.name}
      </Typography>
      <Typography color="textPrimary" style={{ marginTop: 20 }}>
        {data.description}
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 10 }}>
        {data.attributes.map((attr, index) => (
          <Grid item xs={6} md={4} key={index}>
            <div className={clsx(classes.attributeWrapper, "gloweff")}>
              <Typography color="textPrimary" className={classes.attrType}>
                {attr.trait_type}:
              </Typography>
              <Typography color="textPrimary">
                <b>{attr.value}</b>
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Details;

const attributes = [
  {
    type: "Type",
    value: "Dreamer",
  },
  {
    type: "Background",
    value: "Sci-fi Door",
  },
  {
    type: "Clothes",
    value: "Flower Shirt",
  },
  {
    type: "Eyes",
    value: "Sad",
  },
  {
    type: "Face",
    value: "Sweat",
  },
  {
    type: "Hair",
    value: "Bun",
  },
  {
    type: "Neck",
    value: "Choker",
  },
  {
    type: "Mouth",
    value: "Surprised",
  },
  {
    type: "Earrings",
    value: "Double Hoop II",
  },
];
