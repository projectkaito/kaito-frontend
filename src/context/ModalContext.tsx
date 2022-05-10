import React, { FC } from "react";
import { Dialog, DialogTitle, IconButton, Theme, DialogContent, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SuccessPng from "./checked.png";
import ErrorPng from "./error.png";
import { makeStyles } from "@mui/styles";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  typeDiv: {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    flexFlow: "column",
  },
}));

interface ModalOptions {
  hideCloseBtn?: boolean;
  hideTitle?: boolean;
  type?: "success" | "error";
}

const ModalContext = React.createContext({
  title: "",
  /**
   *
   * This function opens the modal of given title with given options
   * @param title unique title of the modal
   * @param data data to be passed to modal component
   * @param options options to be passed to modal component
   */
  openModal: (title: string, data?: any, options?: ModalOptions) => {},
  closeModal: () => {},
});
export default ModalContext;

export interface ModalObject {
  name: string;
  component: FC<any>;
}

export interface ModalProps {
  data: any;
  closeModal: () => {};
}

interface Props {
  allModals: ModalObject[];
}

const typePaperStyles = { width: "100vw", maxWidth: 500 };

export const ModalProvider: React.FC<Props> = ({ children, allModals }) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const [options, setOptions] = React.useState<ModalOptions | undefined>({});
  const [data, setData] = React.useState({});
  const Component = React.useRef<any>(undefined);

  const onClose = () => {
    setTitle("");
    setData({});
  };

  return (
    <ModalContext.Provider
      value={{
        title,
        openModal: (title: string, data?: any, options?: ModalOptions) => {
          Component.current = allModals?.find((x) => x.name === title)?.component;
          setTitle(title);
          setData(data);
          setOptions(options);
        },
        closeModal: onClose,
      }}
    >
      <Dialog
        open={!!title}
        className={classes.root}
        maxWidth={"md"}
        PaperProps={{ style: options?.type ? typePaperStyles : {} }}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          {!(options?.hideTitle || options?.type) && title}
          {!options?.hideCloseBtn ? (
            <IconButton
              onClick={onClose}
              size="small"
              style={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "red",
                background: "none",
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>

        <DialogContent>
          {!options?.type && Component.current && <Component.current data={data} closeModal={onClose} />}
          {options?.type === "success" && (
            <div className={classes.typeDiv}>
              <img src={SuccessPng} alt="success" width="100px" />
              <Typography variant="h5" style={{ fontWeight: 600, marginTop: 20 }} align="center">
                {title}
              </Typography>
            </div>
          )}
          {options?.type === "error" && (
            <div className={classes.typeDiv}>
              <img src={ErrorPng} alt="error" width="100px" />
              <Typography variant="h5" style={{ fontWeight: 600, marginTop: 20 }} align="center">
                {title}
              </Typography>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {children}
    </ModalContext.Provider>
  );
};
