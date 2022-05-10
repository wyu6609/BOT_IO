import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PeopleIcon from "@mui/icons-material/People";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import InfoIcon from "@mui/icons-material/Info";
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
      <ListItemIcon sx={{ color: "#1265f0" }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="home" />
    </ListItemButton>
    <ListItemButton
      component={Link}
      to="market"
      onClick={() => {
        btnSound();
      }}
    >
      <ListItemIcon sx={{ color: "#1265f0" }}>
        <SmartToyIcon />
      </ListItemIcon>
      <ListItemText primary="market" />
    </ListItemButton>
    <ListItemButton
      component={Link}
      to="profile"
      onClick={() => {
        btnSound();
      }}
    >
      <ListItemIcon sx={{ color: "#1265f0" }}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="profile" />
    </ListItemButton>
    <ListItemButton
      component={Link}
      to="contact"
      onClick={() => {
        btnSound();
      }}
    >
      <ListItemIcon sx={{ color: "#1265f0" }}>
        <ConnectWithoutContactIcon />
      </ListItemIcon>
      <ListItemText primary="contact" />
    </ListItemButton>

    <ListItemButton
      component={Link}
      to="about"
      onClick={() => {
        btnSound();
      }}
    >
      <ListItemIcon sx={{ color: "#1265f0" }}>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="about" />
    </ListItemButton>
  </React.Fragment>
);
