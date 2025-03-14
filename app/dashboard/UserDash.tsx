'use client';

import React, { useState, useEffect } from 'react';

// Define the categories in the same order as in the API, currently hardcoded
const sus_topics = ["Renewable Energy", "Sustainable Transportation", "Energy Efficiency", "Waste Reduction", "Water Conservation"];

const UserDash: React.FC = () => {
  const [userCounts, setUserCounts] = useState<number[]>([]);

  useEffect(() => {
    /* Get number of users subscribed to each sustainability topic using user_count API */
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

  /* User dashboard contents */
  return (
    <div className="centered-flex-col align-center w-[30vw] mb-6">
      <div>
        <h2 className="text-2xl mb-4 text-center font-semibold underline"> Topic Subscriber Count </h2>
      </div>
      <div>
        <ul className="grid-list">
              {sus_topics.map((topic, index) => (
                <li key={index} className="grid-item">
                  <span className="topic text-xl">{topic}</span> <span className="count font-semibold text-4xl ml-2">{userCounts[index]}</span>
                  <hr className="border-gray-600 w-full mx-auto" style={{ opacity: 0.75, borderWidth: '1px' }} />
                </li>
              ))}
            </ul>
      </div>
    </div>
  );
};

export default UserDash;
