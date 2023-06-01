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
        <ul>
          {data.categories.map((e: any) => (
            <li key={e.id}>{e.name}</li>
          ))}
        </ul>
        <ul>
          {data.consoles.map((e: any) => (
            <li key={e.id}>{e.name}</li>
          ))}
        </ul>
        <ul>
          {data.languages.map((e: any) => (
            <li key={e.id}>{e.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
