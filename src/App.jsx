import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import CoinsList from "./pages/CoinsList";
import AboutCoin from "./pages/AboutCoin";
import ErrorPage from "./components/ErrorPage";
import { Analytics } from '@vercel/analytics/react';
export default function App() {
  return (
    <div className="page">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coinslist" element={<CoinsList />} />
          <Route path="/aboutcoin/:id" element={<AboutCoin />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <Analytics />
    </div>
  );
}
