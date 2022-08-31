// @ts-nocheck
import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import useWallet from "src/hooks/useWallet";
import { getWhitelistInfo } from "src/api/whitelist";
import useNotify from "src/hooks/useNotify";
import Bg from "src/assets/images/bg1.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    paddingTop: 50,
    paddingLeft: 50,
    background: `url(${Bg})`,
    backgroundSize: "cover",
    paddingRight: 50,
    minHeight: "100vh",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  const { notifyError, notifySuccess } = useNotify();
  const [data, setData] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);

  const checkWhitelist = () => {
    setLoading(true);
    getWhitelistInfo(acc)
      .then((res) => {
        setData(res);
        console.log("Whitelist Info: ", res);
      })
      .catch((err) => {
        setData({
          Error: "Some Error....",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    checkWhitelist();
  }, [account]);

  const text = React.useMemo(() => {
    let qty = data.quantity || 1;
    if (data.userType) {
      if (data.userType === "team") {
        return (
          <>
            Congrats! You are whitelisted for team minting. <br />
            You will be able to mint x{qty} tokens.
          </>
        );
      } else {
        return (
          <>
            Congrats! You are whitelisted. <br />
            You will be able to mint x{qty} tokens.
          </>
        );
      }
    } else {
      return "Sorry you are not whitelisted!!!";
    }
  }, [data]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
          Whitelist Verification
        </Typography>
        <Typography color="primary" sx={{ mb: 2 }}>
          Enter Wallet Address
        </Typography>
        <TextField fullWidth label="Address" value={acc} onChange={(e) => setAcc(e.target.value)} sx={{ mb: 2 }} />
        <Button variant="outlined" sx={{ m: 1 }} onClick={checkWhitelist} disabled={loading}>
          Verify
        </Button>
        <Typography align="center">{text}</Typography>
      </Paper>
    </div>
  );
};

export default Test;
