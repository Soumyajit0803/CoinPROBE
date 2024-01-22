import axios from "axios";
import { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

export default function MarketcapDom({ pieChart }) {
  const marketCap = {
    labels: pieChart.map((pieChart) => pieChart[0]),
    datasets: [
      {
        label: "Market Cap",
        data: pieChart.map((pieChart) => pieChart[1]),
      },
    ],
  };
  const Volume = {
    labels: pieChart.map((pieChart) => pieChart[0]),
    datasets: [
      {
        label: "Total volume",
        data: pieChart.map((pieChart) => pieChart[2]),
      },
    ],
  };
  return (
    <div className="home-graph">
      <div className="graph-label">Analysis amongst top 100 Cryptocoins</div>
      <div className="pieGroup">
        <div className="piechart">
          <label>Market cap dominance</label>
          <Pie data={marketCap} />
        </div>
        <div className="piechart">
          <label>Trading Volume distribution</label>
          <Pie data={Volume} />
        </div>
      </div>
    </div>
  );
}
