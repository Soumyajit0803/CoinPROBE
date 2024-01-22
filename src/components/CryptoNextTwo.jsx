import { Link } from "react-router-dom";
import { formatPrice2 } from "./CryptoBest";
import { ChangeClass } from "./MiniTable";

const Infocard2 = ({ val, label, trackChange = 0, preunit = "", postunit = "" }) => {
  const name = trackChange ? ChangeClass(val[0]) : "";
  return (
    <div className={"label label-v2 " + name}>
      <h4 style={{ display: "flex", alignItems: "baseline" }}>
        <div style={{ fontSize: "1rem", paddingRight: "0.2rem" }}>{preunit}</div>
        <div>{val[0]}</div>
        <div style={{ fontSize: "0.9rem", paddingLeft: "0.2rem" }}>{val[1] + " " + postunit}</div>
      </h4>
      <p>{label}</p>
    </div>
  );
};

function CryptoNextTwo({ coin }) {
  const priceChange = formatPrice2(coin.price_change_percentage_24h, true);
  const change = ChangeClass(priceChange[0]);
  return (
    <div className="cardholder cardholder-v2">
      <Link
        style={{
          textDecoration: "none", // Remove underline
          color: "inherit", // Use the default text color
        }}
        key={coin.symbol}
        to={`/aboutcoin/${coin.id}`}
      >
        <div className="card-header card-header-v2">
          <img className="icon icon-v2" src={coin.image} alt="Sample" />
          <div className="card-name card-name-v2">
            <h5>{coin.name}</h5>
            <p>{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
      </Link>
      <div className="data data-v2">
        <Infocard2 preunit="$" val = {formatPrice2(coin.market_cap)} label = {"Market Cap"} />
        <Infocard2 preunit="$" val = {formatPrice2(coin.current_price)} label = {"Price"} />
        <Infocard2 val = {formatPrice2(coin.total_volume)} label = {"Total volume"} />
        <Infocard2 postunit="%" val = {priceChange} label = {"Price change"} trackChange />
      </div>
    </div>
  );
}

export default CryptoNextTwo;
