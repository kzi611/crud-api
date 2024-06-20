import React from 'react';
import './button.css';

const ButtonEdit = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="edit-button">
      {label}
    </button>
  );
};

export default ButtonEdit;
