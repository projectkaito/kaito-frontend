import React from "react";
import { Button, Theme, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import BackupIcon from "@mui/icons-material/Backup";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  thumbsContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  thumb: {
    width: "100%",
    height: "100%",
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: "12px",
    },
  },
  dropZone: {
    height: 200,
    borderRadius: 10,
    border: "2px dashed rgb(221,221,221)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column",
  },
}));
interface Props {
  onFile: (file: File | File[]) => void;
  multi?: boolean;
  className?: string;
  style?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  cover?: boolean;
  noBorder?: boolean;
  noText?: boolean;
  text?: string;
  required?: boolean;
  isProfile?: boolean;
  fileType?: string;
}
interface T extends File {
  preview: string;
}
const FileUploader: React.FC<Props> = ({
  onFile,
  multi,
  className,
  style,
  cover = false,
  noBorder,
  text = "Drag and drop a file(s), or",
  noText = false,
  required = false,
  imageStyle,
  fileType,
}) => {
  const classes = useStyles();
  const [files, setFiles] = React.useState<T[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: fileType || "image/*",
    onDrop: (acceptedFiles) => {
      multi
        ? setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          )
        : setFiles([
            Object.assign(acceptedFiles[0], {
              preview: URL.createObjectURL(acceptedFiles[0]),
            }),
          ]);
      onFile(multi ? acceptedFiles : acceptedFiles[0]);
    },
  });

  const thumbs = files.map((file) => (
    <div style={{ ...imageStyle }} className={classes.thumb} key={file.name}>
      {fileType ? (
        <div className="center" style={{ height: "100%" }}>
          {file.name}
        </div>
      ) : (
        <img
          style={{
            objectFit: cover ? "cover" : "contain",
          }}
          src={file.preview}
          alt=""
        />
      )}
    </div>
  ));

  React.useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className={`${classes.root} ${className}`}>
      <div {...getRootProps({ className: classes.dropZone })} style={noBorder ? { ...style, border: "none" } : style}>
        <input
          {...getInputProps()}
          required={required}
          style={{ display: "initial", opacity: 0, pointerEvents: "none", height: 1, width: 1 }}
        />
        {thumbs?.length === 0 && (
          <>
            <BackupIcon
              style={{
                color: "#c4c4c4",
                cursor: "pointer",
              }}
            />
            {!noText && (
              <>
                <Typography color="textPrimary">{text}</Typography>
                <Button style={{ width: 190 }} variant="contained" color="primary">
                  Upload
                </Button>
              </>
            )}
          </>
        )}
        {thumbs && thumbs?.length > 0 && <aside className={classes.thumbsContainer}>{thumbs}</aside>}
      </div>
    </div>
  );
};

export default FileUploader;
