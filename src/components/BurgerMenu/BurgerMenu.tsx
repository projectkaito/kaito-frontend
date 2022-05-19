import React from "react";
import { Theme, List, ListItem, useTheme, Drawer, ListItemText, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Burger from "react-css-burger";
import { useNavigate } from "react-router-dom";
import { Remove } from "@mui/icons-material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  burgerContainer: {
    display: "flex",
    position: "fixed",
    top: 0,
    right: 0,
    justifyContent: "flex-end",
    paddingRight: 20,
    zIndex: 999999,
  },
  link: {
    color: "white",
    borderBottom: `1px solid rgba(255,255,255,0.2)`,
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
    toggleDrawer("top", false)(undefined);
    id[0] === "/" ? navigate(id) : window.open(id, "_blank");
  };

  return (
    <div className={classes.root}>
      <Drawer
        anchor={"top"}
        open={state["top"]}
        onClose={toggleDrawer("top", false)}
        PaperProps={{
          style: { width: "100%", minHeight: "50vh", background: "rgba(14,4,28,0.2)", backdropFilter: "blur(10px)" },
        }}

        // sx={{ width:  'auto' }}
        // role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
      >
        {/* <IconButton color="primary" style={{ background: "red" }}> */}
        {/* </IconButton> */}
        <List>
          {links.map(([name, path]) => (
            <ListItem button key={path} onClick={() => handleLinkClick(path)} className={classes.link}>
              <ListItemText className="center" primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.burgerContainer}>
        <Burger
          onClick={toggleDrawer("top", true)}
          active={state.top}
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
