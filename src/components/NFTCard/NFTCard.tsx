import React from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Skeleton, Theme, Typography } from "@mui/material";
import { MoralisNFT } from "src/types/moralis";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    cursor: "pointer",
  },
  img: {
    width: "100%",
  },
}));

interface IProps extends Partial<MoralisNFT> {}

const NFTCard: React.FC<IProps> = ({ metadata, token_address, token_id }) => {
  const classes = useStyles();
  const [loaded, setLoaded] = React.useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/nft/" + token_address + "/" + token_id);
  };

  return (
    <div className={classes.root} onClick={handleNavigation}>
      <img
        src={metadata?.image}
        className={classes.img}
        style={{ display: loaded ? "initial" : "none" }}
        alt=""
        onLoad={() => {
          setLoaded(true);
        }}
      />
      {!loaded && (
        <Skeleton variant="rectangular" width="100%" style={{ aspectRatio: "1/1", height: "auto" }} component={Paper} />
      )}
      <Paper sx={{ p: 1 }}>
        <Typography variant="h6" color="secondary">
          <b>{metadata?.name}</b>
        </Typography>
      </Paper>
    </div>
  );
};

export default NFTCard;
