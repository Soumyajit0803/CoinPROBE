import React from "react";
import axios from "axios";
import Fake from "../components/CoinList.json";
import { useState, useEffect } from "react";
import PopularCoins from "../components/PopularCoins";
import MarketcapDom from "../components/MarketcapDom";
import MiniTable from "../components/MiniTable";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";

export const fullCoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

const homePie = (CoinData) => {
  const mkt = CoinData.slice(5).reduce((acc, coin) => {
    return acc + coin.market_cap;
  }, 0);
  const vol = CoinData.slice(5).reduce((acc, coin) => {
    return acc + coin.total_volume;
  }, 0);
  const pie = CoinData.slice(0, 5).map((coin) => [coin.name, coin.market_cap, coin.total_volume]);
  pie.push(["Others", mkt, vol]);
  return pie;
};
const Homepage = () => {
  const [CoinData, setCoinData] = useState(Fake);
  const [Load, setLoad] = useState(true);
  const [Error, setError] = useState(false);

  const INTERVAL = 100000; // 100 seconds
  const justLoaded = new Date().getTime();
  const temp = localStorage.getItem("lastLoaded");
  const lastload = parseInt(temp);

  useEffect(() => {
    if (lastload + INTERVAL > justLoaded) {
      const cache = localStorage.getItem("coinData");
      setCoinData(JSON.parse(cache));
      console.log("Too frequent load, data cached!");
      setLoad(false);
    } else {
      console.log("Possible reloading attempt");
      axios
        .get(fullCoinList("usd"))
        .then((response) => {
          console.log("Successful Fetch!");
          setCoinData(response.data);
          localStorage.setItem("coinData", JSON.stringify(response.data));
          localStorage.setItem("lastLoaded", JSON.stringify(justLoaded));
          setLoad(false);
        })
        .catch((error) => {
          console.log("Unsuccessful fetch:\n", error.message);
          const cachedData = localStorage.getItem("coinData");
          if (!cachedData) {
            setCoinData(JSON.parse(cachedData));
            console.log("Loaded Cached data");
          } else {
            console.log("Throw error now! No cached data available");
            setError(true);
          }
          setLoad(false);
        });
    }
  }, []);

  if (Error) return <ErrorPage />;

  return (
    <div className="contents">
      <Loading toload={Load ? true : false} />
      <div className={"contents" + (Load ? " vanish" : " showup")}>
        <PopularCoins rank1={CoinData[0]} rank2={CoinData[1]} rank3={CoinData[2]} />
        <MarketcapDom pieChart={homePie(CoinData)} />
        <MiniTable data={CoinData.slice(3, 10)} />
      </div>
    </div>
  );
};

export default Homepage;
