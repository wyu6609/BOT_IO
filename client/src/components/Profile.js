import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./Profile.css";
import Divider from "@mui/material/Divider";

const Profile = ({ user }) => {
  return (
    <Grid
      container
      align="center"
      justifyContent="center"
      className="aboutContainer floating"
    >
      <Card sx={{ maxWidth: 350, my: 15 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`https://avatars.dicebear.com/api/pixel-art/${user.id}.svg`}
            alt="avatar"
          />
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
