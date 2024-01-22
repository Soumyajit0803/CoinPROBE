import React from "react";
import { Link } from "react-router-dom";
import Brand from '../assets/CoinPROBE.png'

const Header = () => {
  return (
    <div className="header">
      <Link className="Appname" to="/">
        <img src={Brand} />
      </Link>
    </div>
  );
};

export default Header;
