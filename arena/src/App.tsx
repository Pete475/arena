import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard'; 

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <p>hello world</p>
    </div>
  );
}

export default App;
