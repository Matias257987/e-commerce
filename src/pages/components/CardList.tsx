import React from "react";
import Card from "./Card";

interface CardListProps {
  data: Record<string, any>[];
  title: string;
}

const CardList: React.FC<CardListProps> = ({ data, title }) => {
  return (
    <div>
      <div>
        <p>{title}</p>
      </div>
      <div>
        {data.map((vj) => (
          <Card key={vj.id} data={vj} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
