// components/TopicsList.tsx
'use client';

import React, { useState } from 'react';

interface TopicsListProps {
  userEmail: string;
}

const sus_topics: string[] = ["Renewable Energy", "Sustainable Transportation", "Energy Efficiency", "Waste Reduction", "Water Conservation"];

const TopicsList: React.FC<TopicsListProps> = ({ userEmail }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleCheckboxChange = (topic: string) => {
    setSelectedTopics(prevSelectedTopics =>
      prevSelectedTopics.includes(topic)
        ? prevSelectedTopics.filter(t => t !== topic)
        : [...prevSelectedTopics, topic]
    );
  };

  const getSelectedTopics = (): string[] => {
    return selectedTopics;
  };

  const handleUpdateTopics = async () => {
    console.log("Update topics call started")
    try {
    console.log("Entered try block")
      const response = await fetch('/api/prismaDB/updateUserTopics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_email: userEmail, new_user_topics: getSelectedTopics() }),
      });

      console.log("Done with call")
      if (!response.ok) {
        console.log("response is not ok")
        throw new Error('Failed to update user topics, response is not ok');
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.log("Generic error")
      console.error('Error updating user topics: generic error! :', error);
    }
  };

  return (
    <div id="topics-container">
      {sus_topics.map((topic, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="checkbox"
            id={`checkbox-${index}`}
            name="sustainability-topic"
            value={topic}
            style={{ marginRight: '10px' }}
            onChange={() => handleCheckboxChange(topic)}
            checked={selectedTopics.includes(topic)}
          />
          <label htmlFor={`checkbox-${index}`} style={{ marginRight: '10px' }}>
            {topic}
          </label>
        </div>
      ))}
      <button onClick={handleUpdateTopics}>Update Selected Topics</button>
    </div>
  );
};

export default TopicsList;
