// components/TopicsList.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface TopicsListProps {
  userEmail: string;
}

const sus_topics: string[] = ["Renewable Energy", "Sustainable Transportation", "Energy Efficiency", "Waste Reduction", "Water Conservation"];

const TopicsList: React.FC<TopicsListProps> = ({ userEmail }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [userTopics, setUserTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserTopics = async () => {
      try {
        const response = await fetch(`/api/prismaDB/getUserTopics?user_email=${encodeURIComponent(userEmail)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user topics');
        }

        const data = await response.json();
        setUserTopics(data.interests);
        setSelectedTopics(data.interests);
      } catch (error) {
        console.error('Error fetching user topics:', error);
      }
    };

    fetchUserTopics();
  }, [userEmail]);

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
    try {
      const response = await fetch('/api/prismaDB/updateUserTopics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_email: userEmail, new_user_topics: getSelectedTopics() }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user topics');
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error updating user topics:', error);
    }
    finally {
      setUserTopics(getSelectedTopics);
      
    }
  };

  return (
    <div>
      <div>
        <p>Your list of interests:</p>
        <div>{userTopics.join(', ')}</div>
      </div>
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
    </div>
  );
};

export default TopicsList;
