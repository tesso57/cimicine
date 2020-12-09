import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { Card } from "./Card";
import "./Home.css";

const trendMockData = [
  {
    title: "Frontend Developer Roadmap",
    star: 999999,
    caption:
      "Step by step guide to becoming a modern frontend developer in 2020",
  },
  {
    title: "Frontend Developer Roadmap",
    star: 999999,
    caption:
      "Step by step guide to becoming a modern frontend developer in 2020",
  },
  {
    title: "Frontend Developer Roadmap",
    star: 999999,
    caption:
      "Step by step guide to becoming a modern frontend developer in 2020",
  },
  {
    title: "Frontend Developer Roadmap",
    star: 999999,
    caption:
      "Step by step guide to becoming a modern frontend developer in 2020",
  },
  {
    title: "Frontend Developer Roadmap",
    star: 999999,
    caption:
      "Step by step guide to becoming a modern frontend developer in 2020",
  },
];
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
