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
  }, []);
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
      <h1
        style={{
          color: "#383838",
          margin: "24px 0 16px",
          fontFamily: "HiraKakuProN-W3",
          borderBottom: "1px solid lightgray",
          // padding: 4,
          // backgroundColor: "white",
        }}
      >
        🛫 最新ロードマップ
      </h1>
      <div className="home__cardContainer">
        {allRoadmap.map((d, index) => (
          // @ts-ignore
          <Card data={d} key={index} />
        ))}
      </div>
      <h1 style={{ color: "white", margin: "24px 0 0 ", paddingBottom: 16 }}>
        🔥 急上昇中のロードマップ
      </h1>
    </div>
  );
};

export default Home;
