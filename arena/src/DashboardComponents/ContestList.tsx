import React, { useState, useEffect } from 'react';

type Contest = {
  contestid: number;
  contestName: string;
};

type ContestListProps = {
  onContestClick: (contestid: number) => void;
};

function ContestList({ onContestClick }: ContestListProps) {
  const [contestList, setContestList] = useState<Contest[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:3334/api/contests')
      .then((res) => res.json())
      .then((data) => setContestList(data))
      .catch((err) => console.error('Failed to load contests', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      const res = await fetch('http://localhost:3334/api/contests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contestName: inputValue }),
      });
      const newContest = await res.json();
      setContestList((prev) => [...prev, newContest]);
      setInputValue('');
    } catch (err) {
      console.error('Error adding contest:', err);
    }
  };

  return (
    <div>
      <h2>Contest List</h2>
      <ul>
        {contestList.map((c) => (
          <li
            key={c.contestid}
            onClick={() => onContestClick(c.contestid)}
            style={{ cursor: 'pointer' }}
          >
            {c.contestName}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit'>Add Contest</button>
      </form>
    </div>
  );
}

export default ContestList;
