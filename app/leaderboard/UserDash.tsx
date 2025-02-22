'use client';

import React, { useState, useEffect } from 'react';

// Define the categories in the same order as in the API
const sus_topics = ["Renewable Energy", "Sustainable Transportation", "Energy Efficiency", "Waste Reduction", "Water Conservation"];

const UserDash: React.FC = () => {
  const [userCounts, setUserCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const response = await fetch('/api/prisma/user_count', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user counts');
        }

        const data = await response.json();
        setUserCounts(data.counts);
      } catch (error) {
        console.error('Error fetching user counts:', error);
      }
    };

    fetchUserCounts();
  }, []);

  return (
    <div>
      <h2>User Counts by Interest Category</h2>
      <ul>
        {sus_topics.map((topic, index) => (
          <li key={index}>{topic}: {userCounts[index]}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDash;
