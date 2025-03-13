'use client';

import { useState, useEffect } from 'react';

interface Admin {
  email: string;
}

interface AdminListProps {
  isSuper: boolean;
  userEmail: string;
}

const AdminList: React.FC<AdminListProps> = ({ isSuper, userEmail }) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState<string>('');

  useEffect(() => {
    {/* Fetch current list of admin users */}
    fetch('/api/prisma/admin_list')
      .then((res) => res.json())
      .then((data) => setAdmins(data.admins));
  }, []);

  {/* */}
  const handleAddAdmin = async () => {
    const response = await fetch('/api/prisma/admin_list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newAdminEmail }), 
    });

    if (response.ok) {
      const newAdmin = await response.json();
      setAdmins([...admins, newAdmin]);
      setNewAdminEmail('');
    } else {
      console.error('Failed to add new admin');
    }
  };

  const handleRemoveAdmin = async (email: string) => {
    const response = await fetch('/api/prisma/admin_list', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setAdmins(admins.filter((admin) => admin.email !== email));
    } else {
      console.error('Failed to remove admin');
    }
  };

  return (
    <div className="flex-col-centered h-[40vh]">
      <div>
        <p className="text-2xl text-center font-semibold underline mb-4">Admin Users</p>
      </div>
      <div className="w-80 mb-4">
        <ul>
          {admins.map((admin) => (
            <li className="text-lg flex flex-col mb-2" key={admin.email}>
              <div className="flex items-center justify-between">
                <span>{admin.email}</span>
                {isSuper && admin.email !== userEmail && (
                  <div className="hoverable-div">
                    <button
                      className="bg-red-500 rounded-full shadow-sm border border-solid border-black/[.16] transition-colors flex items-center justify-center text-white text-base h-8 w-18 px-2 py-2 hover:bg-red-800"
                      onClick={() => handleRemoveAdmin(admin.email)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {isSuper && (
          <div className="flex-row-centered">
            <div>
              <input
                type="email"
                className="text-base mr-6 p-2 w-60 rounded-lg border-2 border-gray-400 focus:border-gray-800 focus:outline-none"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="Enter new admin email"
              />
            </div>
            <div className="hoverable-div">
              <button className="bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.16] transition-colors flex items-center justify-center text-white text-base h-8 w-18 px-2 py-2 hover:bg-coffee-green" onClick={handleAddAdmin}>Add Admin</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminList;
