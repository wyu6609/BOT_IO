import { React, useEffect } from "react";
import "./Home.css";

const Home = ({ botList, setBotList }) => {
  useEffect(() => {
    fetch("/bots")
      .then((r) => r.json())
      .then((bots) => {
        setBotList(bots);
      });
  }, []);
  let imgBots = botList.map((bot) => {
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
