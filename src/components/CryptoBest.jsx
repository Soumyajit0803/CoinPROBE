import { Link } from "react-router-dom";
import { ChangeClass } from "./MiniTable";

export const formatPrice2 = (price, addsign = false) => {
  var amount = parseFloat(price);
  var symbol = addsign && amount > 0 ? "+" : "";
  if (price >= 1e9) {
    const formattedAmount = (amount / 1e9).toFixed(2);
    return [`${symbol}${formattedAmount}`, "Bn"];
  }
  if (price >= 1e6) {
    const formattedAmount = (amount / 1e6).toFixed(2);
    return [`${symbol}${formattedAmount}`, "Mn"];
  }
  if (price >= 1e3) {
    const formattedAmount = (amount / 1e3).toFixed(2);
    return [`${symbol}${formattedAmount}`, "K"];
  }
  return [`${symbol}${amount.toFixed(2)}`, ""];
};

const Infocard = ({ val, label, trackChange = 0, preunit = "", postunit = "" }) => {
  const name = trackChange ? ChangeClass(val[0]) : "";
  return (
    <div className={"label " + name}>
      <h4 style={{ display: "flex", alignItems: "baseline" }}>
        <div style={{ fontSize: "1rem", paddingRight: "0.2rem" }}>{preunit}</div>
        <div>{val[0]}</div>
        <div style={{ fontSize: "0.9rem", paddingLeft: "0.2rem" }}>{val[1]+" "+postunit}</div>
      </h4>
      <p>{label}</p>
    </div>
  );
};

function CryptoBest({ coin }) {
  return (
    <div className="cardholder" style={{ flexDirection: "column" }}>
      <Link
        style={{
          textDecoration: "none", // Remove underline
          color: "inherit", // Use the default text color
        }}
        key={coin.symbol}
        to={`/aboutcoin/${coin.id}`}
      >
        <div className="card-header">
          <img className="icon" src={coin.image} alt="Sample" />
          <div className="card-name">
            <h4>{coin.name}</h4>
            <p>{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
      </Link>

      <div className="data">
        <Infocard preunit="$" val={formatPrice2(coin.market_cap)} label={"Market Cap"} />
        <Infocard preunit="$" val={formatPrice2(coin.current_price)} label={"Current Price"} />
        <Infocard val={formatPrice2(coin.total_volume)} label={"Total Volume"} />

        <Infocard
          trackChange={coin.price_change_percentage_24h}
          val={formatPrice2(coin.price_change_percentage_24h, true)}
          label={"24h Price Change"}
          postunit="%"
        />

        <Infocard postunit={coin.symbol.toUpperCase()} val={formatPrice2(coin.circulating_supply)} label={"Circulating Supply"} />
        <Infocard
          postunit="%"
          trackChange={coin.market_cap_change_percentage_24h}
          val={formatPrice2(coin.market_cap_change_percentage_24h, true)}
          label={"24h Market Cap Change"}
        />
      </div>
    </div>
  );
}

export default CryptoBest;


