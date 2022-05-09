import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link as RouterLink, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { mainListItems } from "./ListItem.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BotPage from "../BotPage";
import Cart from "../CartComponents/Cart";
import Login from "../login/Login";
import Home from "../Home";
import Error from "../Error";
import Market from "../Market";
import Footer from "./Footer";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//sound functions
const logoutSound = () => {
  let logoutAudio = new Audio("/sounds/logout-sound.mp3");
  logoutAudio.play();
};
const submitReviewSound = () => {
  let submitReviewAudio = new Audio("/sounds/submit-review-sound.mp3");
  submitReviewAudio.play();
};
const btnSound = () => {
  let btnAudio = new Audio("/sounds/review-btn-sound.mp3");
  btnAudio.play();
};
const errorSound = () => {
  let errorAudio = new Audio("/sounds/error-sound.mp3");
  errorAudio.play();
};
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

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
});
function App() {
  // useNavigate hook
  const navigate = useNavigate();
  //set bots
  const [bots, setBots] = useState([]);
  //drawer menu open close state
  const [open, setOpen] = React.useState(true);
  // login state
  const [user, setUser] = useState(null);
  //bots state
  const [botList, setBotList] = useState([]);
  const [cartLength, setCartLength] = useState("");
  //set drawer menu default to open
  const toggleDrawer = () => {
    setOpen(!open);
    btnSound();
  };

  //logout btn click handler
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        logoutSound();

        setUser(null);

        toast.error(`LOGGED OUT!`, {
          theme: "colored",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        // window.location.reload(false);
      }
    });
  }

  //auto login

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          fetchCartLength(user);
        });
      }
    });
  }, []);

  //fetch cart length
  const fetchCartLength = (user) => {
    fetch(`/cart/${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data.length);
        setCartLength(data.length);
      });
  };

  //add to cart function
  const handleAddCart = (bot_id) => {
    console.log(user.id);
    let newObj = {
      user_id: user.id,
      bot_id: bot_id,
    };

    fetch("/user_items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    }).then((r) => {
      if (r.ok) {
        r.json().then((obj) => {
          // setCounterState(obj);
          console.log(obj);
          submitReviewSound();
          toast.success("bot added to cart!", {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchCartLength(user);
        });
      } else {
        r.json().then((err) => {
          console.log(err);
          errorSound();
          toast.error("limited to one bot per user!", {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      }
    });
  };

  if (!user)
    return <Login onLogin={setUser} fetchCartLength={fetchCartLength} />;

  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, fontFamily: "Press Start 2P" }}
              >
                BOT_IO 1.1
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => {
                  navigate("cart");
                }}
              >
                <Badge badgeContent={cartLength} color="secondary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit" onClick={handleLogoutClick}>
                <LogoutOutlinedIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer} sx={{ color: "#00bfa5" }}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            {/* menu list icons */}
            <List
              component="nav"
              sx={{
                mt: 5,
                color: "primary",
              }}
            >
              {mainListItems}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />

            {/* MAIN COMPONENTS */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route
                  path="/"
                  element={<Home user={user} bots={bots} setBots={setBots} />}
                />
                <Route
                  path="market/bots/:bot_id"
                  element={
                    <BotPage user={user} handleAddCart={handleAddCart} />
                  }
                />
                <Route
                  path="market"
                  element={
                    <Market botList={botList} handleAddCart={handleAddCart} />
                  }
                />
                <Route
                  path="cart"
                  element={
                    <Cart
                      botList={bots}
                      user={user}
                      setCartLength={setCartLength}
                    />
                  }
                />

                <Route path="*" element={<Error />} />
              </Routes>
            </Container>
            <Copyright sx={{ pt: 4 }} />
          </Box>
        </Box>
        {/* <Footer /> */}
      </ThemeProvider>
    </>
  );
}
export default App;
