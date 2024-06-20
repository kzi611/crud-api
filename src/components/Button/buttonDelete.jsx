import React from 'react';
import './button.css';

const ButtonDelete = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="delete-button">
      {label}
    </button>
  );
};

export default ButtonDelete;