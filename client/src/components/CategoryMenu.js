import * as React from "react";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
export default function SplitButton({
  selectedIndex,
  setSelectedIndex,
  options,
}) {
  const categorySound = () => {
    let categoryAudio = new Audio("/sounds/category-sound.mp3");
    categoryAudio.play();
  };
  const [open, setOpen] = React.useState(false);

  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    categorySound();
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00bfa5",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: ["Press Start 2P", "cursive"].join(","),
    },
    overrides: {
      MuiButton: {
        raisedPrimary: {
          color: "white",
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button
            disableRipple
            disableElevation
            sx={{
              ml: 0,
            }}
          >
            {options[selectedIndex]}
          </Button>
          <Button
            size="large"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper sx={{ color: "#bf2900" }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        //   disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    </ThemeProvider>
  );
}
