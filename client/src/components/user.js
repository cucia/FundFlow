import React from 'react';
import apiService from '../services/apiService'; // Import the apiService module

const User = () => {
  const handleLogout = async () => {
    try {
      await apiService.logout();
      // After successful logout, redirect to the login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout Error:', error);
      // Handle error if necessary
    }
  };

  return (
    <div className="user">
      <header>
        <h2>Welcome User</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <div className="content">
        <p>This is the user page. You can add more content here.</p>
      </div>
    </div>
  );
};

export default User;
