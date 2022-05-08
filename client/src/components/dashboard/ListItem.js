import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon sx={{ color: "#00bfa5" }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component={Link} to="market">
      <ListItemIcon sx={{ color: "#00bfa5" }}>
        <SmartToyIcon />
      </ListItemIcon>
      <ListItemText primary="Market" />
    </ListItemButton>
    <ListItemButton component={Link} to="profile">
      <ListItemIcon sx={{ color: "#00bfa5" }}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton component={Link} to="about_us">
      <ListItemIcon sx={{ color: "#00bfa5" }}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="About Us" />
    </ListItemButton>
  </React.Fragment>
);
