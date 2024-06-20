import React from 'react';

const Input = ({ type = 'text', value, onChange }) => {
  return (
    <input
    type={type}
    value={value}
    onChange={onChange}
    className="input-field"
    />
  );
};

export default Input;