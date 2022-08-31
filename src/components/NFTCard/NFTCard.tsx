import React from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Skeleton, Theme, Typography } from "@mui/material";
import { MoralisNFT } from "src/types/moralis";
import { useNavigate } from "react-router-dom";
import Image from "../Image/Image";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    cursor: "pointer",
    filter: "saturate(0)",
    "&:hover": {
      filter: "saturate(1)",
    },
  },
  img: {
    width: "100%",
  },
}));

interface IProps extends Partial<MoralisNFT> {}

const NFTCard: React.FC<IProps> = ({ metadata, token_address, token_id }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/nft/" + token_address + "/" + token_id);
  };

  return (
    <div className={classes.root} onClick={handleNavigation}>
      <Image src={metadata?.image} />
      <Paper sx={{ p: 1 }}>
        <Typography variant="h6" color="secondary">
          <b>{metadata?.name}</b>
        </Typography>
      </Paper>
    </div>
  );
};

export default NFTCard;
