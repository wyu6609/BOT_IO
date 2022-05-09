import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const theme = createTheme();
let seed = Math.floor(Math.random() * 1000) + 1;

const signUpSound = () => {
  let signUpAudio = new Audio("/sounds/signup-sound.mp3");
  signUpAudio.play();
};

const loginSound = () => {
  let loginAudio = new Audio("/sounds/signin-sound.mp3");
  loginAudio.play();
};

const errorSound = () => {
  let errorAudio = new Audio("/sounds/error-sound.mp3");
  errorAudio.play();
};

export default function Login({ onLogin, fetchCartLength }) {
  const [showLogin, setShowLogin] = useState(true);
  //   logout

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: "#00bfa5",
          }}
        >
          <div className="centered">
            <img
              className="login-img floating"
              // src={
              //   showLogin
              //     ? `https://avatars.dicebear.com/api/bottts/yellow.svg`
              //     : `https://avatars.dicebear.com/api/bottts/${seed}.svg`
              // }

              src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {showLogin ? (
              <>
                <h1 className="login-title">BOT_IO 1.1</h1>
                <LoginForm
                  fetchCartLength={fetchCartLength}
                  onLogin={onLogin}
                  showLogin={showLogin}
                  setShowLogin={setShowLogin}
                  loginSound={loginSound}
                  errorSound={errorSound}
                  signUpSound={signUpSound}
                />
              </>
            ) : (
              <>
                <SignUpForm
                  onLogin={onLogin}
                  showLogin={showLogin}
                  setShowLogin={setShowLogin}
                  loginSound={loginSound}
                  errorSound={errorSound}
                  signUpSound={signUpSound}
                />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}
