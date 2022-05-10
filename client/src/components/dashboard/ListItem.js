import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";

const btnSound = () => {
  let btnAudio = new Audio("/sounds/review-btn-sound.mp3");
  btnAudio.play();
};
export const mainListItems = (
  <React.Fragment>
    <ListItemButton
      component={Link}
      to="/"
      onClick={() => {
        btnSound();
      }}
    >
      <ListItemIcon sx={{ color: "#526dfe" }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton
      component={Link}
      to="market"
      onClick={() => {
        btnSound();
      }}
    >
      <ListItemIcon sx={{ color: "#526dfe" }}>
        <SmartToyIcon />
      </ListItemIcon>
      <ListItemText primary="Market" />
    </ListItemButton>
    <ListItemButton
      component={Link}
      to="profile"
      onClick={() => {
        btnSound();
      }}
    >
      <ListItemIcon sx={{ color: "#526dfe" }}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton
      component={Link}
      to="about_us"
      onClick={() => {
        btnSound();
      }}
    >
      <ListItemIcon sx={{ color: "#526dfe" }}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="About Us" />
    </ListItemButton>
  </React.Fragment>
);
