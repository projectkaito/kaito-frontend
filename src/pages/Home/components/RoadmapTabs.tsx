import * as React from "react";
// @ts-ignore
import SwipeableViews from "react-swipeable-views";
//@ts-check
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Roadmap from "./RoadmapAnime1";
import { Button } from "@mui/material";
import RoadmapAnime1 from "./RoadmapAnime1";
import RoadmapAnime2 from "./RoadmapAnime2";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <span
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ width: "100%" }}>{children}</Box>}
    </span>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function RoadmapTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        bgcolor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <AppBar
        elevation={0}
        position="static"
        style={{
          width: "100%",
          background: "#ff000000",
          maxWidth: "500px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Charity" {...a11yProps(0)} />
          <Tab label="Anime Series" {...a11yProps(1)} />
          <Tab label="Token" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        Item 1
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
          2022
        </Button>
        <RoadmapAnime1 />
        <Button variant="contained" color="primary" style={{ marginTop: 40 }}>
          2023
        </Button>
        <RoadmapAnime2 />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel>
      {/* </SwipeableViews> */}
    </Box>
  );
}
