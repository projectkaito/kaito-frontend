import React from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, Typography, Theme, Popover, List, ListItem, ListItemText } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useWallet } from "@react-dapp/wallet";
import { useEthers } from "@react-dapp/utils";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  iconBTn: {
    marginRight: 5,
    color: theme.palette.primary.main,
  },
  accountAdd: {
    fontSize: 12,
  },
}));

interface Props {}

const WalletIcon: React.FC<Props> = () => {
  const classes = useStyles();
  const { account, deactivate, setOpen } = useWallet();
  const { displayAccount } = useEthers();
  const [pop, setPop] = React.useState<HTMLButtonElement | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
    !account ? setOpen(true) : setPop(event.currentTarget);
  };

  const logout = () => {
    deactivate();
    localStorage.removeItem("token");
    localStorage.removeItem("Allow-Wallet-Reconnect");
    setPop(null);
  };

  return (
    <span className="center">
      <IconButton className={classes.iconBTn} onClick={handleClick}>
        <AccountBalanceWalletOutlinedIcon />
      </IconButton>
      <Popover
        open={!!pop}
        anchorEl={pop}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={() => setPop(null)}
      >
        <List>
          <ListItem button onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Popover>
      <Typography color="primary" className={classes.accountAdd}>
        {displayAccount}
      </Typography>
    </span>
  );
};

export default WalletIcon;
