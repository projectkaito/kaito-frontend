// @ts-nocheck
import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
} from "@mui/material";
import Img from "src/assets/images/nfts/1.jpg";
import { NFT_IMAGES } from "src/config/constants";
import useWallet from "src/hooks/useWallet";
import { WhitelistUserType } from "src/types/apis";
import { addToWhitelist, getWhitelistInfo, removefromWhitelist } from "src/api/whitelist";
import useNotify from "src/hooks/useNotify";
import Bg from "src/assets/images/bg2.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    paddingTop: 50,
    paddingLeft: 50,
    background: `url(${Bg})`,
    backgroundSize: "cover",
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
  const { notifyError, notifySuccess } = useNotify();
  const [data, setData] = React.useState<any>({});

  const checkWhitelist = () => {
    getWhitelistInfo(acc).then((res) => {
      setData(res);
    });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TextField fullWidth label="Address" value={acc} onChange={(e) => setAcc(e.target.value)} sx={{ mb: 2 }} />

        <Button variant="outlined" sx={{ m: 1 }} onClick={checkWhitelist}>
          Check Whitelist
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(data).map(([key, value]) => (
                <TableRow>
                  <TableCell>{key.toString()}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Test;
