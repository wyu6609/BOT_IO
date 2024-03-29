import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./Profile.css";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";

const Profile = ({ user }) => {
  return (
    <Grid
      container
      align="center"
      justifyContent="center"
      className="aboutContainer floating"
    >
      <Card sx={{ width: 400, my: 6 }} className="profile-container">
        <CardActionArea>
          <CardMedia
            component="img"
            image={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.id}`}
            alt="avatar"
          />
          <Divider className="line" />
          <Typography sx={{ mt: 1 }} gutterBottom variant="p" component="div">
            USER INFO
          </Typography>
          <Divider className="line" />
          <CardContent align="left" className="cardContent">
            <Typography gutterBottom variant="p" component="div">
              {`first_name: ${user.first_name} ${user.last_name}`}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              {`last_name: ${user.last_name}`}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              {`user_name: ${user.username}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Profile;
