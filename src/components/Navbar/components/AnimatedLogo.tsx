import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import logo from "src/assets/logos/logo.png";
import backgroundImage from "src/assets/images/bg.gif";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  logo: {
    marginBottom: "20px",
  },
}));

// animatedLogo.defaultProps = {

// };
interface Props {
  scrollPosition?: any;
}

const AnimatedLogo: React.FC<Props> = ({ scrollPosition }) => {
  const classes = useStyles();
  //   const [scrollPosition, setScrollposition] = React.useState(0);
  //   React.useLayoutEffect(() => {
  //     function updatePosition() {
  //       setScrollposition(window.scrollY);
  //     }
  //     window.addEventListener("scroll", updatePosition);
  //     return () => window.removeEventListener("scroll", updatePosition);
  //   }, []);

  return (
    <>
      {scrollPosition > 90 ? (
        <img src={logo} className={classes.logo} alt="logo" />
      ) : (
        <div
          style={{
            transition: "all 0.5s ease-in-out",
            height: scrollPosition > 1 ? "0px" : "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",

            top: 0,
            background: `url(${backgroundImage})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPositionY: "bottom",
            zIndex: 999,
            // opacity:
          }}
        >
          <img
            style={
              {
                //   margin: scrollPosition > 200 ? "0px 0px" : "auto",
              }
            }
            src={logo}
            className={classes.logo}
            alt="logo"
          />
        </div>
      )}
    </>
  );
};

export default AnimatedLogo;
