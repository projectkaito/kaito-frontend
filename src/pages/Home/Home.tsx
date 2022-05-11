import React from "react";
import { Button, Theme, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useNotify from "src/hooks/useNotify";
import FileUploader from "src/components/FileUploader/FileUploader";
import useModal from "src/hooks/useModal";
import nftImage from "src/assets/images/nftImage.png";
const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  leftContent: {
    width: "100%",
    padding: "28px",
    margin: "auto",
    color: theme.palette.secondary.main,
    maxWidth: "472px",
  },
  title: {
    fontSize: "55px !important",
    fontWeight: "700 !important",
  },
  roadmap: {
    width: "100%",
    padding: "28px",
    margin: "auto",
    textAlign: "center",
    color: theme.palette.secondary.main,
    maxWidth: "772px",
    marginTop: "88px",
  },
  rightContent: {
    width: "100%",
    maxWidth: "692px",
    padding: "20px",
    color: "white",
    margin: "auto",
  },
}));

interface Props {}

const Home: React.FC<Props> = () => {
  const classes = useStyles();
  const { notifySuccess, notifyError, notifyLoading, dismissNotifyAll } = useNotify();
  const { openModal } = useModal();

  // const onFile = (file: File | File[]) => {
  //   console.log(file);
  // };

  // const handleModal = () => {
  //   openModal("Hello", {}, {});
  // };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={5}>
          <div className={classes.leftContent}>
            <Typography variant="h1" className={classes.title}>
              Then Manifesto
            </Typography>
            <Typography variant="body1">
              The blockchain will be ethereum compatible. It runs on a PoW consensus; using the SHA-3 hash algorithm.
              Encouragement of more Dapp developers, the team will release an assembly for smart contracts to be written
              in different code languages.
            </Typography>
          </div>
        </Grid>
        <Grid item md={7}>
          {/* <div className={classes.rightContent}> */}
          <img style={{ width: "100%" }} src={nftImage} alt="nft image" />
          {/* </div> */}
        </Grid>
        <Grid item md={12}>
          <div className={classes.roadmap}>
            <Typography variant="h1" className={classes.title}>
              Roadmap
            </Typography>
            <Typography variant="body1">
              The blockchain will be ethereum compatible. It runs on a PoW consensus; using the SHA-3 hash algorithm.
              Encouragement of more Dapp developers, the team will release an assembly for smart contracts to be written
              in different code languages.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
