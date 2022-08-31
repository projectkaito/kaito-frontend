import { Paper, Skeleton } from "@mui/material";
import React from "react";

interface IProps {
  src?: string;
  className?: string;
}

const Image: React.FC<IProps> = ({ src, className = "" }) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <>
      <img
        src={src}
        alt=""
        onLoad={() => {
          setLoaded(true);
        }}
        style={{ display: loaded ? "initial" : "none", width: "100%" }}
        className={className}
      />
      {!loaded && (
        <Skeleton variant="rectangular" width="100%" style={{ aspectRatio: "1/1", height: "auto" }} component={Paper} />
      )}
    </>
  );
};

export default Image;
