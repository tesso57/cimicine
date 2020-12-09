import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { Card } from "./Card";
import "./Home.css";
import { trendMockData } from "../util/mock";
const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="search">
        <SearchIcon fontSize="large" />
        <input
          className="search__input"
          type="text"
          placeholder="ロードマップを探す"
        />
      </div>
      <h1 style={{ color: "white", margin: "24px 0 16px" }}>
        🔥 急上昇のロードマップ
      </h1>
      {trendMockData.map((d, index) => (
        <Card title={d.title} star={d.star} caption={d.caption} key={index} />
      ))}
    </div>
  );
};

export default Home;
