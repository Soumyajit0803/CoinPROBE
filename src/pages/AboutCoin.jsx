import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatPrice2 } from "../components/CryptoBest";
import { ChangeClass } from "../components/MiniTable";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import LinkIcon from "../assets/external-link.svg";
import axios from "axios";
import Loading from "../components/Loading";
import fakecoin from "./responsecoin.json";
import fakehist from "../components/YearHistory.json";
import ErrorPage from "../components/ErrorPage";

const Coin = (id) => `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;
const HistoricalChart = (id) => `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`;

const CoinIcon = ({ coin }) => {
  return <img className="about-icon" src={coin.image.large} alt={coin.name}></img>;
};

const Datarow = ({ label, value, labelBold, valueBold, valueBolder, showChange, preunit = "", postunit = "" }) => {
  const labelFmt = labelBold ? " label-bold" : "";
  var valueFmt = valueBold ? " value-bold" : "";
  valueFmt = valueBolder ? " value-bolder" : valueFmt;
  if (showChange) valueFmt += " " + ChangeClass(value[0]);
  const gap = labelBold ? " uppergap" : "";
  return (
    <div className={"about-row" + gap}>
      <div className={"stats-label" + labelFmt}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.2rem" }} className={"stats-value" + valueFmt}>
        <p style={{ fontSize: "1rem" }}>{preunit}</p>
        {value[0]}
        <p style={{ fontSize: "0.8rem" }}>{" " + value[1] + postunit}</p>
      </div>
    </div>
  );
};

const Starter = ({ coin }) => {
  const shortInfo = coin.description.en;
  const links = coin.links;
  const weblink = links.homepage[0] || links.blockchain_site[0] || links.official_forum_url[0] || "#";

  var i = shortInfo.indexOf('. ')
  if(i!==-1){
    var temp = shortInfo.indexOf('. ', i+1)
    i = temp
  }
  return (
    <div className="starterpack">
      <div className="starter-head">
        <div>
          {coin.name}
          <a href={weblink} target="_blank">
            <img src={LinkIcon} />
          </a>
        </div>
        <div>{coin.symbol.toUpperCase()}</div>
      </div>
      <div className="short-bio">
        <div dangerouslySetInnerHTML={{__html: shortInfo.slice(0, i + 1)}} />
      </div>
      <div className="card-stats">
        <Datarow label={"Market cap rank"} value={[coin.market_data.market_cap_rank, ""]} labelBold valueBold />
        <Datarow label={"Watchlist Users"} value={formatPrice2(coin.watchlist_portfolio_users)} />
        <Datarow label={"Upvotes"} value={[coin.sentiment_votes_up_percentage, "%"]} />
        <Datarow label={"Downvotes"} value={[coin.sentiment_votes_down_percentage, "%"]} />
        <Datarow label={"Hashing Algorithm"} value={[coin.hashing_algorithm, ""]} />
        <Datarow label={"Genesis date"} value={[coin.genesis_date, ""]} />
      </div>
    </div>
  );
};

const DataCard1 = ({ coin }) => {
  return (
    <div className="card-stats cover">
      <Datarow
        label={"Market Cap"}
        preunit={"$"}
        value={formatPrice2(coin.market_data.market_cap.usd)}
        labelBold
        valueBold
      />
      <Datarow
        postunit={"%"}
        label={"24h change"}
        value={formatPrice2(coin.market_data.market_cap_change_percentage_24h, 1)}
        showChange
      />
      <Datarow label={"FDV"} value={formatPrice2(coin.market_data.fully_diluted_valuation.usd)} />
      <Datarow label={"FDV ratio"} value={[coin.market_data.market_cap_fdv_ratio, ""]} />
      <Datarow label={"Total volume"} value={formatPrice2(coin.market_data.total_volume.usd)} labelBold valueBold />
      <Datarow label={"24h high"} value={formatPrice2(coin.market_data.high_24h.usd)} />
      <Datarow label={"24h low"} value={formatPrice2(coin.market_data.low_24h.usd)} />
      <Datarow label={"Total Supply"} value={formatPrice2(coin.market_data.total_supply)} labelBold valueBold />
      <Datarow label={"Maximum supply"} value={formatPrice2(coin.market_data.max_supply)} />
      <Datarow label={"Circulating supply"} value={formatPrice2(coin.market_data.circulating_supply)} />
    </div>
  );
};
const DataCard2 = ({ coin }) => {
  const h24 = formatPrice2(coin.market_data.price_change_percentage_24h, 1);
  const d7 = formatPrice2(coin.market_data.price_change_percentage_7d, 1);
  const d14 = formatPrice2(coin.market_data.price_change_percentage_14d, 1);
  const d30 = formatPrice2(coin.market_data.price_change_percentage_30d, 1);
  const change24 = ChangeClass(h24[0].toString());
  const change7 = ChangeClass(d7[0].toString());
  const change14 = ChangeClass(d14[0].toString());
  const change30 = ChangeClass(d30[0].toString());
  return (
    <div className="data-card">
      <div className="card-stats cover">
        <Datarow
          label={"Price"}
          preunit={"$"}
          value={formatPrice2(coin.market_data.current_price.usd)}
          labelBold
          valueBold
        />
        <div className="pricechange">
          <div className="stats-label" style={{ color: "white" }}>
            Price change
          </div>
          <div className="changevals">
            <div style={{ fontSize: "0.8rem" }} className={"stats-value" + " " + change24}>
              {h24[0] + "%"}
            </div>
            <div style={{ fontSize: "0.8rem" }} className={"stats-value" + " " + change7}>
              {d7[0] + "%"}
            </div>
            <div style={{ fontSize: "0.8rem" }} className={"stats-value" + " " + change14}>
              {d14[0] + "%"}
            </div>
            <div style={{ fontSize: "0.8rem" }} className={"stats-value" + " " + change30}>
              {d30[0] + "%"}
            </div>
            <div className="stats-label">24h</div>
            <div className="stats-label">7d</div>
            <div className="stats-label">14d</div>
            <div className="stats-label">30d</div>
          </div>
        </div>
        <Datarow
          label={"All time high"}
          preunit={"$"}
          value={formatPrice2(coin.market_data.ath.usd)}
          labelBold
          valueBold
        />
        <Datarow label={"Date"} value={[coin.market_data.ath_date.usd.slice(0, 10), ""]} />
        <Datarow
          showChange
          label={"ath change"}
          value={formatPrice2(coin.market_data.ath_change_percentage.usd, 1)}
          postunit={"%"}
        />
        <Datarow
          label={"All time low"}
          preunit={"$"}
          value={formatPrice2(coin.market_data.atl.usd)}
          labelBold
          valueBold
        />
        <Datarow label={"Date"} value={[coin.market_data.atl_date.usd.slice(0, 10), ""]} />
        <Datarow
          showChange
          label={"atl change"}
          value={formatPrice2(coin.market_data.atl_change_percentage.usd, 1)}
          postunit={"%"}
        />
      </div>
    </div>
  );
};

const getDate = (timestamp) => {
  const date = new Date(timestamp);
  // Customize the date formatting options as needed
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleString("en-GB", options);
};

const ThemeGrad = (context) => {
  const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "hsla(50, 100%, 50%, 0.3)");
  gradient.addColorStop(1, "hsla(80, 100%, 20%, 0)");
  return gradient;
};

const GraphBox = ({ History }) => {
  const [Graph, setGraph] = useState(0);
  const [selected, setSelected] = useState(0);
  const price = History.prices;
  const marketCap = History.market_caps;
  const volume = History.total_volumes;
  const datasets = [
    [
      {
        fill: true,
        label: "Price (in thousand USD)",
        data: price.map((pair) => pair[1] / 1000),
        tension: 0.5,
        pointRadius: 0,
        borderColor: "hsla(40, 100%, 50%)",
        borderWidth: 1,
        backgroundColor: ThemeGrad,
      },
    ],
    [
      {
        label: "Market Cap (in billion $)",
        data: marketCap.map((pair) => pair[1] / 1000000000),
        tension: 0.5,
        pointRadius: 0,
        borderColor: "hsla(40, 100%, 50%)",
        borderWidth: 1,
        backgroundColor: ThemeGrad,
        fill: true,
      },
    ],
    [
      {
        label: "Total volume (in Billion)",
        data: volume.map((pair) => pair[1] / 1000000000),
        tension: 0.5,
        pointRadius: 0,
        borderColor: "hsla(40, 100%, 50%)",
        borderWidth: 1,
        backgroundColor: ThemeGrad,
        fill: true,
      },
    ],
  ];
  const data = {
    labels: price.map((pair) => getDate(pair[0])),
    datasets: datasets[Graph],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "rgba(255,255,255,0.8)",
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
  };

  const changeGraph = (v) => {
    setGraph(v);
    setSelected(v);
  };

  return (
    <div className={"graphbox" + (History.fakeStatus ? " vanish" : " showup")}>
      <h2>Historical Analysis</h2>
      <div className="button-grp">
        <div className={selected === 0 ? "graphbtn focused" : "graphbtn"} onClick={() => changeGraph(0)}>
          Price
        </div>
        <div className={selected === 1 ? "graphbtn focused" : "graphbtn"} onClick={() => changeGraph(1)}>
          Market Cap
        </div>
        <div className={selected === 2 ? "graphbtn focused" : "graphbtn"} onClick={() => changeGraph(2)}>
          Total Volume
        </div>
      </div>
      <div className="graphwrapper">
        <div className="line-graph">
          <Line className="canvas-line" data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

const AboutCoin = () => {
  const { id } = useParams();

  const [About, setAbout] = useState(fakecoin);
  const [History, setHistory] = useState(fakehist);
  const [Error, setError] = useState(false);

  useEffect(() => {
    console.log("API call for: "+id);
    axios
      .get(Coin(id))
      .then((response) => {
        setAbout(response.data);
      })
      .catch((error) => {
        setError(true);
        // Handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log("Request denied with Status Code:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Unknown Error: ", error.message);
        }
      });
    axios
      .get(HistoricalChart(id))
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        // Handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log("Status Code:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error:", error.message);
        }
      });
  }, []);

  return (
    <>
      {Error ? (
        <ErrorPage />
      ) : (
        <div className="grand-about">
          <Loading toload={About.symbol === "" ? 1 : 0} />
          <div className={"grand-about" + (About.symbol === "" ? " vanish" : " showup")}>
            <div className="leftmain">
              <CoinIcon coin={About} />
              <Starter coin={About} />
            </div>
            <div className="rightmain">
              <div className="pairwrapper">
                <DataCard1 coin={About} />
                <DataCard2 coin={About} />
              </div>
              <GraphBox History={History} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutCoin;
