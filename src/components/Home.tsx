import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { Card } from "./Card";
import "./Home.css";
import {trendMockData} from "../utils/mock";
import TextField from "@material-ui/core/TextField";

const Home: React.FC = () => {
    return (
        <div className="home">
            <div className={"search"}>
                <SearchIcon fontSize="large"/>
                <TextField
                    InputProps={{
                        'aria-label': 'naked',
                        disableUnderline: true,
                        style: {
                            color: `#000`,
                            fontSize: 20,
                            fontWeight:"bold"
                        }
                    }}
                    placeholder={"ロードマップを探す"}
                    fullWidth={true}
                />
            </div>
            <h1 style={{color: "white", margin: "24px 0 16px"}}>
                🔥 急上昇のロードマップ
            </h1>
            {trendMockData.map((d, index) => (
                <Card title={d.title} star={d.star} caption={d.caption} key={index}/>
            ))}

        </div>
    );
};

export default Home;
