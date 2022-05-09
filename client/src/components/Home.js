import { React, useState, useEffect } from "react";
import "./Home.css";

const Home = ({ setBots, bots }) => {
  useEffect(() => {
    fetch("/bots")
      .then((r) => r.json())
      .then((bots) => {
        setBots(bots);
      });
  }, []);
  let imgBots = bots.map((bot) => {
    return (
      <div className="orb">
        <img className="bot-image  " src={bot.image} />
      </div>
    );
  });
  return (
    <>
      <h1 className="home-p vibrate-3">check the bot market!</h1>
      <div className="marquee">
        <div className="marquee--inner">
          <span>{imgBots}</span>
        </div>
      </div>
    </>
  );
};

export default Home;
