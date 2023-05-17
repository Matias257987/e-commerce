import React from "react";

interface UserProps {
  data: Record<string, any>;
}

const User: React.FC<UserProps> = ({ data }) => {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
      <p>{data.password}</p>
    </div>
  );
};

export default User;
