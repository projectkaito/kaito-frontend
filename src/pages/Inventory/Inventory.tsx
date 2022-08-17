import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme } from "@mui/material";
import NFTCard from "src/components/NFTCard/NFTCard";
import WaveText from "src/components/WaveText/WaveText";
import useWallet from "src/hooks/useWallet";
import { MoralisNFT } from "src/types/moralis";
import { defaultChainName } from "src/config";
import useMoralis from "src/hooks/useMoralis";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // backgroundColor: "black",
    // minHeight: "100vh",
    // background: `url(${Bg})`,
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "100%",
    // backgroundPositionY: "bottom",
    // backgroundPositionX: "center",
  },
}));

interface IProps {}

const Inventory: React.FC<IProps> = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const { isConnected, Moralis } = useMoralis();
  const [results, setResults] = React.useState<MoralisNFT[]>([]);

  React.useEffect(() => {
    if (!account && !isConnected) return;
    Moralis.Web3API.account
      .getNFTs({
        chain: defaultChainName,
        address: account!,
        token_addresses: ["0xfD8eeFBe27Ce0a5EFE5f773B66ED159224c7Ed6b"],
      })
      .then((res) => {
        let result = res.result;
        setResults(result!.map((item: any) => ({ ...item, metadata: JSON.parse(item.metadata) })));
      });
  }, [isConnected, account, setResults, Moralis.Web3API.account]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <div className="center">
          <WaveText text="Inventory" />
        </div>
        {/* <Typography color="primary" variant="h2" align="center" sx={{ pt: 3 }}>
          Inventory
        </Typography> */}
        <Grid container spacing={4} sx={{ mt: 3 }}>
          {results.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <NFTCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Inventory;
