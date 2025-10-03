import { useState } from 'react';

function Vote() {
  const [totalVotes, setTotalVotes] = useState(0);

  const handleClick = () => {
    setTotalVotes(totalVotes + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Vote</button>
      <div>
        {totalVotes === 1 ? (
          <p>{totalVotes} vote</p>
        ) : (
          <p>{totalVotes} votes</p>
        )}
      </div>
    </div>
  );
}

export default Vote;
