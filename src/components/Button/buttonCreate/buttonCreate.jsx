import React from 'react';
import './buttonCreate.css';

const ButtonCreate = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="create-button">
      {label}
    </button>
  );
};

export default ButtonCreate;