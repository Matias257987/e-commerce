import React from "react";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div>
      <input
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        placeholder=" "
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Input;
