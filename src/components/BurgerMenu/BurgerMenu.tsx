import React from "react";
import { Theme, List, ListItem, useTheme, Drawer, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Burger from "react-css-burger";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  burgerContainer: {
    display: "flex",
    position: "fixed",
    top: 0,
    right: 0,
    justifyContent: "flex-end",
    paddingRight: 20,
    zIndex: 100,
  },
}));

interface Props {
  links: string[][];
}

type Anchor = "top" | "left" | "bottom" | "right";

const BurgerMenu: React.FC<Props> = ({ links }) => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent | undefined | {}) => {
      setState({ ...state, [anchor]: open });
    };

  const handleLinkClick = async (id: string) => {
    toggleDrawer("right", false)(undefined);
    id[0] === "/" ? navigate(id) : window.open(id, "_blank");
  };

  return (
    <div className={classes.root}>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        PaperProps={{ style: { width: "100%", maxWidth: 300 } }}
      >
        <List>
          {links.map(([name, path]) => (
            <ListItem button key={path} onClick={() => handleLinkClick(path)}>
              <ListItemText className="center" primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.burgerContainer}>
        <Burger
          onClick={toggleDrawer("right", true)}
          active={state.right}
          burger="slider"
          color={theme.palette.primary.main}
          hoverOpacity={0.8}
          scale={1.2}
        />
      </div>
    </div>
  );
};

export default BurgerMenu;
