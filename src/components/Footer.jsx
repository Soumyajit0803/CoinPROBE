import React from "react";
import Brand from '../assets/CoinPROBE.png'

function Footer() {
  return (
    <div className="footer">
      <div className="footer-left">
        <img src = {Brand} />
        <p>Provides latest information about top 100 cryptocurrencies.<br/>powered by CoinGecko</p>
        <div className="copyright">
          Made by <a target="_blank" href="https://www.coingecko.com" style = {{color: "var(--brand"}}>Soumyajit Karmakar</a>
        </div>
      </div>
      <div className="footer-right">
        <a target="_blank" href = "https://github.com/Soumyajit0803">Github</a>
        <a>License</a>
        <a target="_blank" href = "https://www.coingecko.com/api/documentation">CoinGecko API</a>
      </div>
    </div>
  );
}

export default Footer;
