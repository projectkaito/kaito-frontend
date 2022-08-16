import React from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, Typography, Theme, Popover, List, ListItem, ListItemText } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import useWallet from "src/hooks/useWallet";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  iconBTn: {
    marginRight: 5,
    color: theme.palette.primary.main,
  },
  accountAdd: {
    fontSize: 12,
  },
  paper: {
    borderRadius: 5,
    background: "black",
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

interface Props {}

const WalletIcon: React.FC<Props> = () => {
  const classes = useStyles();
  const { account, displayAccount, disconnect, openModal } = useWallet();
  const [pop, setPop] = React.useState<HTMLButtonElement | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
    !account ? openModal() : setPop(event.currentTarget);
  };

  const logout = () => {
    disconnect();
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
        PaperProps={{
          className: classes.paper,
        }}
      >
        <List>
          <ListItem button onClick={logout} color="primary">
            <Typography color="secondary">Logout</Typography>
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
