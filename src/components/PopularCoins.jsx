import React from "react";
import CryptoBest from "./CryptoBest";
import CryptoNextTwo from "./CryptoNextTwo";

const PopularCoins = ({ rank1, rank2, rank3 }) => {
  return (
    <div className="popular-wrapper">
      <h3>Top Cryptocurrencies</h3>
      <p>By market cap</p>
      <div className="all-cards">
        <div className="best-card">
          <CryptoBest coin={rank1} />
        </div>
        <div className="two-card-set">
          <CryptoNextTwo coin={rank2} />
          <CryptoNextTwo coin={rank3} />
        </div>
      </div>
    </div>
  );
};

export default PopularCoins;
