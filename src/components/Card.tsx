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
    <div
      className="card"
      onClick={() => history.push("/view/" + data.data.uid)}
    >
      <h2
        className="title"
        style={{ color: "black", opacity: 0.87, fontSize: 18 }}
      >
        {data.data.title}
      </h2>
      <p className="star">★ Star {data.data.star}</p>
      <p className="description">{data.data.description}</p>
    </div>
  );
};
