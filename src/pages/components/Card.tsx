import React from "react";

interface CardProps {
  data: Record<string, any>;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div>
      <img src={data.image} alt="Caratula" />
      <div>
        <span>{data.title}</span>
        <span>{data.description}</span>
        <span>${data.price}</span>
      </div>
    </div>
  );
};

export default Card;
