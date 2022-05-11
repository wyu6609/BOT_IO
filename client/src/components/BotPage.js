// import { React, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const BotPage = () => {
//   const { bot_id } = useParams();
//     useEffect(()=>{

//     },[])

//   return <div>BotPage {bot_id}</div>;
// };

// export default BotPage;
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import IconButton from "@mui/material/IconButton";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReviewDrawer from "./ReviewDrawerComponents/ReviewDrawer";
import AverageBotRating from "./ReviewDrawerComponents/AverageBotRating";
import "./BotPage.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Press Start 2P", "cursive"].join(","),
  },
});

//get all the reviews for this bot
// includes user name fo reach bo
function BotPage({ user, handleAddCart }) {
  const { bot_id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState("");
  const [category, setCategory] = useState("");
  const [userReview, setUserReview] = useState("");
  const [bot, setBot] = useState("");
  useEffect(() => {
    fetch(`/bots/${bot_id}`)
      .then((r) => r.json())
      .then((bot) => {
        setBot(bot);
        setCategory(bot.category.name);
        setReviews(bot.reviews);
      });
  }, []);

  useEffect(() => {
    let average =
      reviews.reduce((total, next) => total + next.rating, 0) / reviews.length;

    let roundedAverage = Math.round(average / 0.5) * 0.5;

    setAverageRating(roundedAverage);
  }, [reviews]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="large"
        component="main"
        sx={{ pt: 4, pb: 4 }}
      >
        <h1
          component="h2"
          variant="h2"
          align="center"
          color="#1265f0"
          gutterBottom
          className="bot-title"
        >
          {bot.title}
        </h1>
        <h2
          sx={{ px: 30 }}
          width="small"
          variant="h5"
          align="center"
          color="black"
          component="p"
          className="bot-description"
        >
          {bot.description}
        </h2>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="xs" component="main">
        <Grid container item alignItems="center" justifyContent="center">
          <Grid alignItems="center">
            <Card className="cardContainer">
              <CardHeader
                title={`$${bot.price}`}
                subheader={bot.subheader}
                titleTypographyProps={{ align: "center" }}
                action={bot.title === "Pro" ? <StarIcon /> : null}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  color: "#01bfa5",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent className="bot-card-bg">
                <CardMedia
                  className="floating-1"
                  component="img"
                  sx={{
                    // 16:9
                    pt: "2%",
                  }}
                  image={bot.image}
                  alt="random"
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    mb: 2,
                  }}
                ></Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    mb: 2,
                  }}
                >
                  <Typography
                    component="p"
                    variant="h5"
                    color="#fd5d77"
                    align="center"
                  >
                    {category}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "#eeeeee",
                }}
              >
                <AverageBotRating value={averageRating} />
                <ReviewDrawer
                  bot_id={bot.id}
                  user_id={user.id}
                  reviews={reviews}
                  setReviews={setReviews}
                  user={user}
                />
                <IconButton
                  sx={{ color: "#1265f0" }}
                  onClick={() => {
                    handleAddCart(bot.id, user.id);
                  }}
                >
                  <AddShoppingCartRoundedIcon size="large" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly"></Grid>
      </Container>

      {/* End footer */}
    </ThemeProvider>
  );
}

export default BotPage;
