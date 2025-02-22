'use client';

import React, { useState } from 'react';

const sus_topics: string[] = ["Renewable Energy", "Sustainable Transportation", "Energy Efficiency", "Waste Reduction", "Water Conservation"];

const AdminDash: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  
  const handleRadioChange = (topic: string) => {
    setSelectedTopic(topic);
  };

  return (
    <div>
      <h2>Admin user found</h2>
      <div>
        {sus_topics.map((topic, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="radio"
              id={`radio-${index}`}
              name="sustainability-topic"
              value={topic}
              style={{ marginRight: '10px' }}
              onChange={() => handleRadioChange(topic)}
              checked={selectedTopic === topic}
            />
            <label htmlFor={`radio-${index}`} style={{ marginRight: '10px' }}>
              {topic}
            </label>
          </div>
        ))}
      </div>
      <button>Get users</button>
    </div>
  );
};

export default AdminDash;
