import React from 'react';
import ContestList from './DashboardComponents/ContestList';
import ImageFeed from './DashboardComponents/ImageFeed';
// import './Dashboard.css';
function Dashboard() {
  return (
    <div className='dashboard-container'>
      <div className='dashboard-contests'>
        <ContestList />
      </div>
      <div className='dashboard-feed'>
        <ImageFeed />
      </div>
    </div>
  );
}
export default Dashboard;
