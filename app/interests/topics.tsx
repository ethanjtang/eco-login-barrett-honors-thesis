// components/TopicsList.tsx

"use client";

import React, { useState } from 'react';

import * as dbUtils from "@/db/getUserAccount"

interface TopicsListProps {
    user_email: string;
  }

const sus_topics: string[] = ["Renewable Energy", "Sustainable Transportation", "Energy Efficiency", "Waste Reduction", "Water Conservation"];

const TopicsList: React.FC<TopicsListProps> = ({ user_email }) => {
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
      <button onClick={() => dbUtils.updateUserTopics(user_email, getSelectedTopics())}>Update Selected Topics</button>
    </div>
  );
};

export default TopicsList;
