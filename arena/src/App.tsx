import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import ImageFeed from './DashboardComponents/ImageFeed';

function App() {
  return (
    <div>
      <h1>Arena</h1>
      {/* <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes> */}
      <ImageFeed />
    </div>
  );
}

export default App;
