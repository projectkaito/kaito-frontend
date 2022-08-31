import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, IconButton, Skeleton, Theme, Typography } from "@mui/material";
import clsx from "clsx";
import RefreshIcon from "@mui/icons-material/Refresh";
import BubbleImg from "src/assets/images/bubbleText.png";

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
  bubbleWrap: {
    color: "black",
    background: `url(${BubbleImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    paddingTop: 12,
    paddingBottom: 22,
    paddingLeft: "8%",
    paddingRight: "4%",

    transform: "translateX(-8%)",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10%",
    },
  },
}));

interface Props {
  refresh: () => Promise<void>;
  loading: boolean;
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

const Details: React.FC<Props> = ({ data, refresh, loading }) => {
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
        {loading && <Skeleton variant="text" height={45} width={300} />}
        {!loading && (
          <Typography variant="h4" fontWeight={600} className={classes.bubbleWrap}>
            {data?.name}
          </Typography>
        )}
        <IconButton style={{ color: "white" }} onClick={handleRefresh} className={resyncing ? classes.rotate : ""}>
          <RefreshIcon fontSize="large" />
        </IconButton>
      </div>
      {loading && (
        <>
          <Skeleton variant="text" />
          <Skeleton variant="text" style={{ marginTop: 20 }} />
        </>
      )}
      {!loading && (
        <>
          <Typography color="textPrimary">Owner: {data.ownerAddress}</Typography>
          <Typography color="textPrimary" style={{ marginTop: 20 }}>
            {data?.description}
          </Typography>
        </>
      )}

      <Grid container spacing={2} style={{ marginTop: 10 }}>
        {loading &&
          new Array(6).fill(1).map((_, i) => (
            <Grid item xs={6} md={4} key={i}>
              <div className={clsx(classes.attributeWrapper, "gloweff")}>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </div>
            </Grid>
          ))}
        {!loading &&
          data?.attributes?.map((attr, index) => (
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
