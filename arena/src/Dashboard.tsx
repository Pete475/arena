import React, { useState } from 'react';
import ContestList from './DashboardComponents/ContestList';
import ImageFeed from './DashboardComponents/ImageFeed';
import './Dashboard.css';

function Dashboard() {
  const [selectedContestId, setSelectedContestId] = useState< number | null>(null);

  const handleContestClick = (contestid: number) => {
    setSelectedContestId(contestid);
  };

  return (
    <div className='dashboard'>
      <div className='contest-list'>
        <ContestList onContestClick={handleContestClick} />
      </div>
      <div className='image-feed'>
        <ImageFeed contestid={selectedContestId} />
      </div>
    </div>
  );
}

export default Dashboard;
