import React from 'react';
import Header from './Header';
import './Home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="content">
        <h1>Welcome to Our Website</h1>
        <p>This is the homepage of our application.</p>
        <p>Feel free to explore!</p>
      </div>
    </div>

  );
};

export default HomePage;