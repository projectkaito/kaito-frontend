import React from "react";
import { Button, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useNotify from "src/hooks/useNotify";
import FileUploader from "src/components/FileUploader/FileUploader";
import useModal from "src/hooks/useModal";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface Props {}

const Home: React.FC<Props> = () => {
  const classes = useStyles();
  const { notifySuccess, notifyError, notifyLoading, dismissNotifyAll } = useNotify();
  const { openModal } = useModal();

  const onFile = (file: File | File[]) => {
    console.log(file);
  };

  const handleModal = () => {
    openModal("Hello", {}, {});
  };

  return (
    <div className={classes.root}>
      This is home
      <Button variant="contained" color="success" onClick={() => notifySuccess("Title", "Message")}>
        Succes
      </Button>
      <Button variant="contained" color="error" onClick={() => notifyError("Title", "Message")}>
        Error
      </Button>
      <Button variant="contained" color="warning" onClick={() => notifyLoading("Title", "Message")}>
        Loading
      </Button>
      <Button variant="contained" color="primary" onClick={() => dismissNotifyAll()}>
        Close All
      </Button>
      <form>
        <div>
          <FileUploader onFile={onFile} required noText multi cover />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <Button variant="outlined" onClick={handleModal}>
        Open Modal
      </Button>
    </div>
  );
};

export default Home;
