import React from "react";

interface CardProps {
  data: Record<string, any>;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default Card;
