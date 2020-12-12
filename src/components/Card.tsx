import React from "react";
import { useHistory } from "react-router-dom";
import { JsonTypes } from "../type";
import "./Card.css";

interface CardProps {
  data: JsonTypes;
}
export const Card: React.FC<CardProps> = ({ data }) => {
  const history = useHistory();
  return (
    <div className="card" onClick={() => history.push("view", data)}>
      <h2 className="title" style={{ color: "black", opacity: 0.87 }}>
        {data.data.title}
      </h2>
      <p className="star">☆ Star {data.data.star}</p>
      <p className="description">{data.data.caption}</p>
    </div>
  );
};
