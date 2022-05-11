import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = ({ botList }) => {
  const navigate = useNavigate();
  let imgBots = botList.map((bot) => {
    return (
      <div
        className="orb"
        onClick={() => {
          navigate(navigate(`market/bots/${bot.id}`));
        }}
      >
        <img className="bot-image" src={bot.image} />
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
