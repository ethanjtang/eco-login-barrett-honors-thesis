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
        const response = await fetch(`/api/prisma/user_interests?user_email=${encodeURIComponent(userEmail)}`, {
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
      const response = await fetch('/api/prisma/user_interests', {
        method: 'PUT',
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
    <div className="flex-col-centered mt-6">
      <div id="topics-container mt-3">
        {sus_topics.map((topic, index) => (
          <div className="mb-3" key={index} style={{ display: 'flex', alignItems: 'center', width: '400px'}}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              name="sustainability-topic"
              value={topic}
              style={{ width: '20px', height: '20px', marginRight: '10px' }}
              onChange={() => handleCheckboxChange(topic)}
              checked={selectedTopics.includes(topic)}
            />
            <label className="text-2xl" htmlFor={`checkbox-${index}`}>{topic}</label>
            {userTopics.includes(topic) && (
              <span className="text-sm" style={{ color: 'green', fontWeight: 'bold', marginLeft: '10px', minWidth: '80px', visibility: userTopics.includes(topic) ? 'visible' : 'hidden' }}>Subscribed!</span>
            )}
          </div>
        ))}
      </div>
      <div className="hoverable-div mt-3 mb-6">
        <button className="bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.16] transition-colors flex items-center justify-center text-white text-xl h-10 w-18 px-4 py-2 hover:bg-coffee-green" onClick={handleUpdateTopics}> Update</button>
      </div>
    </div>
  );
};

export default TopicsList;
