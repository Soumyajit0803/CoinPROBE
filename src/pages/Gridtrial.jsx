import allData from "../components/CoinList.json";

const Gridtrial = () => {
  return (
    <div className="grid-list">
      {allData.map((coin) => {
        return (
          <div key={coin.id} className="grid-row">
            <div className="grid-cell">{coin.market_cap_rank}</div>
            <div className="grid-cell">{coin.name}</div>
            <div className="grid-cell">{coin.id}</div>
            <div className="grid-cell">{coin.symbol}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Gridtrial;
