import React from 'react';
import { useState } from 'react';

function ContestList() {

const initialContests = [
    { id: 1, name: 'waterfalls' },
    { id: 2, name: 'rainbows' },
    { id: 3, name: 'puppies' },
]

  const [contestList, setContestList] = useState(initialContests);
  const [inputValue, setInputValue] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!inputValue.trim()) return; 
    const newContest = { id: contestList.length + 1, name: inputValue}; 
    setContestList(prevList => [...prevList, newContest]); 
    setInputValue(''); 
  }

  const handleChange = (e) => {
    setInputValue(e.target.value) 
  }


  return (
    <div>
    <ul>
        {contestList.map(contest => (
            <li key={contest.id}>{contest.name}</li>
        ))}
    </ul>

    <form onSubmit={handleSubmit}>
        <label>
            Start Your Own Contest: 
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
            />
        </label>
<button type="submit">Add New Contest</button>
    </form>
     
      
    </div>
  );
}

export default ContestList;
