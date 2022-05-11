import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Contact from "./Contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#526dfe",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ["Press Start 2P", "cursive"].join(","),
  },
});

export default function SignInSide({ botList }) {
  const navigate = useNavigate();
  let imgBots = botList.map((bot) => {
    return (
      <div
        className="orb1"
        onClick={() => {
          navigate(`../market/bots/${bot.id}`);
        }}
      >
        <img className="bot-image1" src={bot.image} />
      </div>
    );
  });

  return (
    <Grid container align="center" className="aboutContainer">
      <Grid item xs={false} sm={6} md={6}>
        <div className="marquee1">
          <div className="marquee--inner1">
            <span>{imgBots}</span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <div className="marquee2">
          <Box
            sx={{
              my: 10,
              mx: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <SmartToyIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 5 }}>
              contact us
            </Typography>
            <Box
              component="form"
              action="https://formsubmit.co/6013a9341c3d991f0ae2dc39b247431c "
              method="POST"
              noValidate
              //   onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email address"
                name="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="message"
                label="message us"
                type="message"
                id="message"
                multiline
                rows={5}
              />

              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                send
              </Button>
            </Box>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
