'use client';

import { useState, useEffect } from 'react';

interface Admin {
  email: string;
}

const AdminList = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState<string>('');

  useEffect(() => {
    fetch('/api/prisma/admin_list')
      .then((res) => res.json())
      .then((data) => setAdmins(data.admins)); // Adjust to match the API response structure
  }, []);

  const handleAddAdmin = async () => {
    const response = await fetch('/api/prisma/admin_list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newAdminEmail }), // Adjust to match the API request format
    });

    if (response.ok) {
      const newAdmin = await response.json();
      setAdmins([...admins, newAdmin]);
      setNewAdminEmail('');
    } else {
      console.error('Failed to add new admin');
    }
  };

  return (
    <div>
      <h2>Admin Users</h2>
      <ul>
        {admins.map((admin) => (
          <li key={admin.email}>{admin.email}</li>
        ))}
      </ul>
      <input
        type="email"
        value={newAdminEmail}
        onChange={(e) => setNewAdminEmail(e.target.value)}
        placeholder="Enter new admin email"
      />
      <button onClick={handleAddAdmin}>Add Admin</button>
    </div>
  );
};

export default AdminList;
