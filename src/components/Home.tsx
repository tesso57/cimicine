import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { db } from "../firebase/index";
import { Card } from "./Card";
import "./Home.css";
import TextField from "@material-ui/core/TextField";

const Home: React.FC = () => {
  const [allRoadmap, setAllRoadmap] = React.useState<any[]>([]);
  React.useEffect(() => {
    db.collection("flows")
      .limit(20)
      .onSnapshot((snapshot) =>
        setAllRoadmap(snapshot.docs.map((doc) => doc.data()))
      );
  });
  return (
    <div className="home">
      <div className={"search"}>
        <SearchIcon fontSize="large" />
        <TextField
          InputProps={{
            "aria-label": "naked",
            disableUnderline: true,
            style: {
              color: `#000`,
              fontSize: 20,
              fontWeight: "bold",
            },
          }}
          placeholder={"ロードマップを探す"}
          fullWidth={true}
        />
      </div>
      <h1 style={{ color: "white", margin: "24px 0 16px" }}>
        👨‍👩‍👧 みんなのロードマップ
      </h1>
      {allRoadmap.map((d, index) => (
        <Card data={d} key={index} />
      ))}
      <h1 style={{ color: "white", margin: "24px 0 0 ", paddingBottom: 16 }}>
        🔥 急上昇中のロードマップ
      </h1>
      {/* {trendMockData.map((d, index) => (
        <Card data={d} key={index} />
      ))} */}
    </div>
  );
};

export default Home;
