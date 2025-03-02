'use client';

import React, { useState } from 'react';

const sus_topics: string[] = ["Renewable Energy", "Sustainable Transportation", "Energy Efficiency", "Waste Reduction", "Water Conservation"];

const AdminDash: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  
  const handleRadioChange = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleGetUsers = async () => {
    if (!selectedTopic) {
      alert('Please select a topic first!');
      return;
    }

    try {
      const response = await fetch(`/api/prisma/admin_display?user_topic=${encodeURIComponent(selectedTopic)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user emails');
      }

      const data = await response.json();
      const emails = data.emails;

      const blob = new Blob([emails.join('\n')], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user_emails.txt';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error fetching user emails:', error);
    }
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
      <button onClick={handleGetUsers}>Get users</button>
    </div>
  );
};

export default AdminDash;
