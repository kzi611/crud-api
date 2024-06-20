import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './buttonSearch.css';

const ButtonSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDropdownChange = (option) => {
    setSelectedOption(option);
  };

  const handleSearch = async () => {
    try {
      let status = null;
      if (selectedOption) {
        status = selectedOption.value === 'active' ? 1 : 0;
      }

      const response = await axios.get('http://127.0.0.1:8000/api/people/search', {
        params: {
          name: `%${searchTerm}%`,
          status: status
        }
      });

      const filteredUsers = response.data;
      onSearch(filteredUsers); 
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const options = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  return (
    <div className="container">
      <div className="name">
        <label>Name</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
      </div>
      <div className="status">
        <label>Status</label>
        <Select
          options={options}
          value={selectedOption}
          onChange={handleDropdownChange}
          placeholder="Select status"
          className="dropdown"
          classNamePrefix="select"
        />
      </div>
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default ButtonSearch;