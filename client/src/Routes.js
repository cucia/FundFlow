import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Make sure to import Routes and Route

import HomePage from './components/Home';
import AboutPage from './components/About';
import GalleryPage from './components/Gallery';
import NotificationPage from './components/Notification';
import DashboardPage from './components/Dashboard';
import LoginPage from './components/Login';
import User from './components/user';



const RoutesComponent = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/notification" element={<NotificationPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user" element={<User />} />
      
    </Routes>
  );
};

export default RoutesComponent;
