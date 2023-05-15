import React from "react";
import User from "./Usuario";

interface UsuarioListProps {
  data: Record<string, any>[];
  title: string;
}

const UsuarioList: React.FC<UsuarioListProps> = ({ data, title }) => {
  return (
    <div>
      <div>
        <p>{title}</p>
      </div>
      <div>
        {data.map((user) => (
          <User key={user.id} data={user} />
        ))}
      </div>
    </div>
  );
};

export default UsuarioList;
