import { Link } from "react-router-dom";
// import cacheData from "../components/CoinList.json";
import { formatPrice } from "../components/MiniTable";
import axios from "axios";
import { useState, useEffect } from "react";
import { ChangeClass } from "../components/MiniTable";
import { fullCoinList } from "./Homepage";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

const cap = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Bigleaf = ({ coin }) => {
  const mktChange = formatPrice(coin.market_cap_change_percentage_24h, true);
  const mktStatus = ChangeClass(mktChange);
  const priceChange = formatPrice(coin.price_change_percentage_24h, true);
  const priceStatus = ChangeClass(priceChange);
  return (
    <Link
      className="grid-row"
      style={{
        textDecoration: "none", // Remove underline
        color: "inherit", // Use the default text color
      }}
      key={coin.symbol}
      to={`/aboutcoin/${coin.id}`}
    >
      <div className="grid-rank">{coin.market_cap_rank}</div>
      <div className="leaf-name">
        <img alt="bitcoin-img" src={coin.image} style={{ width: "3rem", height: "3rem" }} />
        <h5>{cap(coin.id)}</h5>
        <p>{coin.symbol.toUpperCase()}</p>
      </div>

      <div className="grid-double-cell">
        <h4>$ {formatPrice(coin.current_price)}</h4>
        <p className={priceStatus}>{priceChange} %</p>
      </div>

      <div className="grid-double-cell">
        <h4>$ {formatPrice(coin.market_cap)}</h4>
        <p className={mktStatus}>{mktChange} %</p>
      </div>
    </Link>
  );
};

const CoinsList = ({ rowsPerPage = 10 }) => {
  const headers = [
    ["Rank", ""],
    ["Cryptocoin", ""],
    ["Price", "24h change"],
    ["Mkt Cap", "24h change"],
  ];

  const [CoinData, setCoinData] = useState([]);
  const [Filtered, setFiltered] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const [Load, setLoad] = useState(true);

  const INTERVAL = 100000;
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
          if (cachedData) {
            setCoinData(JSON.parse(cachedData));
            console.log("Loaded Cached data");
          } else {
            console.log("Throw error now! No cached data available");
          }
          setLoad(false);
        });
    }
  }, []);

  const handleSearch = (search) => {
    const matches = CoinData.filter((coin) => {
      if (search === "") return;
      return (
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFiltered(matches);
  };

  useEffect(() => {
    handleSearch(SearchTerm);
  }, [SearchTerm]);

  return (
    <div className="grandlist-wrapper">
      <Loading toload = {Load?true:false} />
    <div className={"grandlist-wrapper"+(Load?" vanish":" showup")}>
      <p>
        Know more about the <b>top 100</b> cryptocurrencies here, ranked as per Market Capitalisation (in USD)
      </p>
      <input
        id="Cryptocoin-search"
        spellCheck={false}
        type="text"
        placeholder="search coin"
        className="searchbar"
        value={SearchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {SearchTerm === "" ? (
        <Pagination headers={headers} dataSet={CoinData} rowsPerPage={rowsPerPage} RowComponent={Bigleaf} />
      ) : (
        <Pagination headers={headers} dataSet={Filtered} rowsPerPage={rowsPerPage} RowComponent={Bigleaf} />
      )}
    </div>
    </div>
  );
};

export default CoinsList;
