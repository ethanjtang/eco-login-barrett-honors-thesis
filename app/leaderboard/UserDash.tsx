"use client";

import React from 'react';

import { prisma } from "@/db/prisma";

const UserDash: React.FC = () => {
    const updateInterestCounts = async (): Promise<number[]> =>
        {
            {/* Renewable Energy, Sustainable Transportation, Energy Efficiency, Waste Reduction, Water Conservation */}
            let re_int = 0;
            let st_int = 0;
            let ee_int = 0;
            let wr_int = 0;
            let wc_int = 0;
      
            try {
              // Retrieve all users from the database
              const users = await prisma.user.findMany();
          
              // Iterate through the list of users
              users.forEach((user) => {
                console.log(`User: ${user.name}`);
          
                // Check the interests field
                user.interests.forEach((interest) => {
                  console.log(`Interest: ${interest}`);
                });
              });
              } catch (error) {
                console.error('Error retrieving users:', error);
              } finally {
                await prisma.$disconnect();
              }
      
            return [re_int, st_int, ee_int, wr_int, wc_int];
        }

    const handleClick = async () => {
        await updateInterestCounts();
        };    
    return (
    <div>
        <button onClick={handleClick}>Check User Interests</button>
        <div> User dash </div>
    </div>
    ); 
}

export default UserDash;


