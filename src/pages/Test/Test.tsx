import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Card, MenuItem, Paper, TextField, Theme } from "@mui/material";
import Img from "src/assets/images/nfts/1.jpg";
import { NFT_IMAGES } from "src/config/constants";
import useWallet from "src/hooks/useWallet";
import { WhitelistUserType } from "src/types/apis";
import { addToWhitelist, removefromWhitelist } from "src/api/whitelist";
import useNotify from "src/hooks/useNotify";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
  },
  paper: {
    minHeight: "50vh",
    padding: 20,
  },
}));

interface Props {}

const Test: React.FC<Props> = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const [acc, setAcc] = React.useState(account);
  const [qty, setQty] = React.useState(1);
  const [type, setType] = React.useState<WhitelistUserType>(WhitelistUserType.Whitelist);
  const { notifyError, notifySuccess } = useNotify();

  const add = async () => {
    if (!acc) return;
    let res = await addToWhitelist(acc, qty, type);
    if (!res.status) {
      notifyError("Error", "Something went wrong!");
    } else {
      notifySuccess("Success", res.message);
    }
  };

  const remove = async () => {
    if (!acc) return;
    let res = await removefromWhitelist(acc);
    if (!res.status) {
      notifyError("Error", "Something went wrong!");
    } else {
      notifySuccess("Success", res.message);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TextField fullWidth label="Address" value={acc} onChange={(e) => setAcc(e.target.value)} sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Quantity"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          type="number"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value as WhitelistUserType)}
          select
          variant="standard"
          sx={{ mb: 2 }}
        >
          {Object.values(WhitelistUserType).map((type) => (
            <MenuItem value={type} key={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="outlined" sx={{ m: 1 }} onClick={add}>
          Add To Whitelist
        </Button>
        <Button variant="outlined" sx={{ m: 1 }} onClick={remove}>
          Remove From Whitelist
        </Button>
      </Paper>
    </div>
  );
};

export default Test;
