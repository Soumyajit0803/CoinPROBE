import { Link } from "react-router-dom";

export const ChangeClass = (price) => {
  if (price.charAt(0) === "+") return "positive";
  if (price.charAt(0) === "-") return "negative";
  else return "";
};

export const formatPrice = (price, addsign = false) => {
  var amount = parseFloat(price);
  var symbol = addsign && amount > 0 ? "+" : "";
  if (price >= 1e9) {
    const formattedAmount = (amount / 1e9).toFixed(2);
    return `${symbol}${formattedAmount} Bn`;
  }
  if (price >= 1e6) {
    const formattedAmount = (amount / 1e6).toFixed(2);
    return `${symbol}${formattedAmount} Mn`;
  }
  if (price >= 1e3) {
    const formattedAmount = (amount / 1e3).toFixed(2);
    return `${symbol}${formattedAmount} K`;
  }
  return `${symbol}${amount.toFixed(2)}`;
};

const Leaf = ({ coin }) => {
  const mktStatus = ChangeClass(formatPrice(coin.market_cap_change_percentage_24h, true));
  return (
    <Link
      className="small"
      style={{
        textDecoration: "none", // Remove underline
        color: "inherit", // Use the default text color
      }}
      key={coin.symbol}
      to={`/aboutcoin/${coin.id}`}
    >
      <div className="grid-rank">{coin.market_cap_rank}</div>
      <div className="leaf-name">
        <img alt="coin-img" src={coin.image} style={{ width: "2rem", height: "2rem" }} />
        <h5>{coin.name}</h5>
        <p>{coin.symbol.toUpperCase()}</p>
      </div>
      <div className="leaf-value">
        <div>$ {formatPrice(coin.market_cap)}</div>
        <p className={mktStatus}>{formatPrice(coin.market_cap_change_percentage_24h, true)}</p>
      </div>
    </Link>
  );
};

const MiniTable = ({ data }) => {
  return (
    <div className="side-table">
      <h4>Other Cryptocurrencies</h4>

      {data &&
        data.map((coin, rank) => {
          return <Leaf key={coin.symbol} coin={coin} rank={rank + 4} />;
        })}
      <div className="more">
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/coinslist">
          <div>Explore more</div>
        </Link>
      </div>
    </div>
  );
};

export default MiniTable;
