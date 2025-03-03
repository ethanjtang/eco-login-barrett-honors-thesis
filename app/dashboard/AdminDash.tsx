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
    <div className="flex-col-centered h-[40vh]">
      <div className="text-2xl text-center font-semibold underline mb-4">
        Subscriber List Export
      </div>
      <div>
        {sus_topics.map((topic, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
            <input
              type="radio"
              id={`radio-${index}`}
              name="sustainability-topic"
              value={topic}
              style={{ marginRight: '10px' }}
              onChange={() => handleRadioChange(topic)}
              checked={selectedTopic === topic}
            />
            <label className="text-xl" htmlFor={`radio-${index}`} style={{ marginRight: '10px' }}>
              {topic}
            </label>
          </div>
        ))}
      </div>
      <div className="hoverable-div">
        <button className="bg-greenify-button-green mt-2 mb-4 mr-4 rounded-full shadow-sm border border-solid border-black/[.16] transition-colors flex items-center justify-center text-white text-xl h-10 w-18 px-4 py-2 hover:bg-coffee-green"
                onClick={handleGetUsers}>
          Export List
        </button>
      </div>
    </div>
  );
};

export default AdminDash;
