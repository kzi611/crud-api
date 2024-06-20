import React from 'react';

const Header = () => {
  const headerStyle = {
    backgroundColor: 'lightblue',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    textAlign: 'center'
  };

  const paragraphStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'navy'
  };

  return (
    <header className="header" style={headerStyle}>
       <p style={paragraphStyle}>Header</p>
    </header>
  );
};

export default Header;