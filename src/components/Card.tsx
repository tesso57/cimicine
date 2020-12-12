import React from "react";
import "./Card.css";

interface CardProps {
  title: string;
  star: number;
  caption: string;
}
export const Card: React.FC<CardProps> = ({ title, star, caption }) => {
  return (
    <div className="card">
      <h2 className="title" style={{ color: "black", opacity: 0.87 }}>
        {title}
      </h2>
      <p className="star">☆ Star {star}</p>
      <p className="caption">{caption}</p>
    </div>
  );
};
