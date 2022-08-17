import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, IconButton, Theme, Typography } from "@mui/material";
import clsx from "clsx";
import RefreshIcon from "@mui/icons-material/Refresh";

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
  rotate: {
    animation: "$rotate 1s infinite linear",
  },
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

interface Props {
  refresh: () => Promise<void>;
  data: {
    name?: string;
    description?: string;
    image?: string;
    ownerAddress?: string;
    attributes?: {
      trait_type: string;
      value: string;
    }[];
  };
}

const Details: React.FC<Props> = ({ data, refresh }) => {
  const classes = useStyles();
  const [resyncing, setResyncing] = React.useState(false);

  const handleRefresh = async () => {
    setResyncing(true);
    try {
      await refresh();
    } catch (error) {
      console.log(error);
    }
    setResyncing(false);
  };

  return (
    <div className={classes.root}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" color="textPrimary">
          {data?.name}
        </Typography>
        <IconButton style={{ color: "white" }} onClick={handleRefresh} className={resyncing ? classes.rotate : ""}>
          <RefreshIcon fontSize="large" />
        </IconButton>
      </div>
      <Typography color="textPrimary">Owner: {data.ownerAddress}</Typography>
      <Typography color="textPrimary" style={{ marginTop: 20 }}>
        {data?.description}
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 10 }}>
        {data?.attributes?.map((attr, index) => (
          <Grid item xs={6} md={4} key={index}>
            <div className={clsx(classes.attributeWrapper, "gloweff")}>
              <Typography color="textPrimary" className={classes.attrType}>
                {attr?.trait_type}:
              </Typography>
              <Typography color="textPrimary">
                <b>{attr?.value}</b>
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Details;
