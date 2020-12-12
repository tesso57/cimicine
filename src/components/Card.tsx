import React from "react";
import "./Card.css";

interface CardProps {
  title: string;
  star: number;
  description: string;
}
export const Card: React.FC<CardProps> = ({ title, star, description }) => {
  return (
    <div className="card">
      <h2 className="title" style={{ color: "black", opacity: 0.87 }}>
        {title}
      </h2>
      <p className="star">☆ Star {star}</p>
      <p className="description">{description}</p>
    </div>
  );
};
