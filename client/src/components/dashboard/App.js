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
import Checkout from "../checkout/Checkout";
import TypeWriterEffect from "react-typewriter-effect";
import Profile from "../Profile";
import Contact from "../Contact";
import About from "../About";
import "../App.css";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://willyu.netlify.com" target="_blank">
        BOT.IO
      </Link>{" "}
      {new Date().getFullYear()}
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

const checkOutSound = () => {
  let checkOutAudio = new Audio("/sounds/checkout-sound.mp3");
  checkOutAudio.play();
};
// const drawerWidth = 214;

const theme = createTheme({
  palette: {
    primary: {
      main: "#1265f0",

      contrastText: "#fff",
    },
    secondary: {
      main: "#01bfa5",

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
  const [open, setOpen] = React.useState(false);
  // login state
  const [user, setUser] = useState(null);
  //bots state
  const [botList, setBotList] = useState([]);
  const [cartLength, setCartLength] = useState("");

  const [cartTotal, setCartTotal] = useState("");
  const [userCart, setUserCart] = useState([]);

  const [isMobile, setIsMobile] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(240);

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
  //fetch bots
  const fetchBots = () => {
    fetch("/bots")
      .then((r) => r.json())
      .then((bots) => {
        setBotList(bots);
      });
  };
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
        toast.error(`LOGGED OUT!`, {
          theme: "colored",
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        setUser(null);

        // window.location.reload(false);
      }
    });
  }
  useEffect(() => {
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
  });
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);

      setDrawerWidth(window.innerWidth);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    if (isMobile == true) {
      setDrawerWidth(window.innerWidth);
    } else {
      setDrawerWidth(240);
    }
  }, [isMobile]);

  // create an event listener

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          fetchBots();
          fetchCartLength(user);
          window.addEventListener("resize", handleResize);
        });
      }
    });
  }, []);

  //fetch cart length
  const fetchCartLength = (user) => {
    fetch(`/cart/${user.id}`)
      .then((r) => r.json())
      .then((data) => {
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
    return (
      <div>
        <Login
          onLogin={setUser}
          fetchCartLength={fetchCartLength}
          fetchBots={fetchBots}
        />
        <ToastContainer />
      </div>
    );

  return (
    <div>
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
                component="h2"
                variant="p"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, fontFamily: "Press Start 2P" }}
                className="navbar-title"
              >
                BOT.IO
              </Typography>
              <div className="typewriter">
                <TypeWriterEffect
                  textStyle={{
                    fontFamily: "Press Start 2P",
                    color: "white",
                    fontWeight: 500,
                    fontSize: "0.9em",
                  }}
                  startDelay={2000}
                  cursorColor="white"
                  multiText={[
                    `hey ${user.first_name}`,
                    `ya username -> ${user.username}`,
                    "buy a bot plz",
                  ]}
                  multiTextDelay={3000}
                  typeSpeed={130}
                  multiTextLoop
                />
              </div>
              <IconButton
                color="inherit"
                onClick={() => {
                  checkOutSound();
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
          <Drawer variant="permanent" open={open} className="app-bar">
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer} sx={{ color: "#1265f0" }}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            {/* menu list icons */}
            <List
              className="vertical-nav"
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
            className="background"
            component="main"
            sx={{
              backgroundRepeat: "no-repeat",

              backgroundSize: "cover",
              backgroundPosition: "center",
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
                  path="market/bots/:bot_id"
                  element={
                    <BotPage user={user} handleAddCart={handleAddCart} />
                  }
                />
                <Route
                  path="/"
                  element={<Home user={user} botList={botList} />}
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
                      botList={botList}
                      user={user}
                      setCartLength={setCartLength}
                    />
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <Checkout
                      userCart={userCart}
                      cartTotal={cartTotal}
                      user={user}
                      setCartLength={setCartLength}
                    />
                  }
                />
                <Route path="profile" element={<Profile user={user} />} />
                <Route
                  path="contact"
                  element={<Contact user={user} botList={botList} />}
                />
                <Route path="about" element={<About />} />

                <Route path="*" element={<Error />} />
              </Routes>
            </Container>
          </Box>
        </Box>
        {/* <Footer /> */}
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}
export default App;
