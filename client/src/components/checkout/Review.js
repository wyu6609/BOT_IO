import * as React from "react";
import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
export default function Review({
  firstName,
  lastName,
  addLine1,
  addLine2,
  city,
  state,
  zip,
  country,
  user,
  cardName,
  cardNumber,
  expDate,
  cvv,
}) {
  const [items, setItems] = useState([]);
  const [sum, setSum] = useState(0);
  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: `${firstName} ${lastName}` },
    { name: "Card number", detail: `xxxx-xxxx-xxxx-${cardNumber.slice(-4)}` },
    { name: "Expiry date", detail: expDate },
  ];
  const addresses = [addLine1 + " " + addLine2, city, state, zip, country];
  const categories = [
    "Pre-Programmed",
    "Humanoid",
    "Autonomous",
    "Teleoperated",
    "Augmenting",
  ];
  useEffect(() => {
    fetch(`/cart/${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      });
  }, []);

  useEffect(() => {
    setSum(getCartTotal(items));
  }, [items]);

  function getCartTotal(arr) {
    let Arr = [];
    arr.map((el) => Arr.push(el.bot.price));
    const sum = Arr.reduce((partialSum, a) => partialSum + a, 0);
    return sum;
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item.bot.name} sx={{ py: 1, px: 0 }}>
            <ListItemAvatar>
              <Avatar src={item.bot.image}>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.bot.title}
              secondary={categories[item.bot.category_id]}
            />
            <Typography variant="body2">${item.bot.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${sum}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {firstName} {lastName}
          </Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
