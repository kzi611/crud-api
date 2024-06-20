import React from 'react';
import Select from 'react-select';

const Dropdown = ({ options, value, onChange, placeholder }) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="dropdown"
      classNamePrefix="select"
    />
  );
};

export default Dropdown;