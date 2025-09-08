import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  full_name: string;
  email: string;
  roles: { id: number; name: string }[];
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      });
  }, []);

  // Group users by role name
  const grouped: { [role: string]: User[] } = {};
  users.forEach(user => {
    user.roles.forEach(role => {
      if (!grouped[role.name]) grouped[role.name] = [];
      grouped[role.name].push(user);
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-8 border border-gray-100 rounded-2xl bg-white shadow-2xl">
  <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900 tracking-tight">Users Grouped by Role</h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          Object.keys(grouped).length === 0 ? (
            <div className="text-center text-gray-500">No users found.</div>
          ) : (
            Object.keys(grouped).map(roleName => (
              <div key={roleName} className="mb-10">
                <h3 className="text-2xl font-bold mb-4 text-blue-700 tracking-wide">{roleName}</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-100 rounded-xl shadow-lg">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <tr>
                        <th className="py-3 px-6 text-left font-semibold text-gray-700">Full Name</th>
                        <th className="py-3 px-6 text-left font-semibold text-gray-700">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grouped[roleName].map(user => (
                        <tr key={user.id} className="border-t hover:bg-blue-50 transition">
                          <td className="py-3 px-6 text-gray-900 font-medium">{user.full_name}</td>
                          <td className="py-3 px-6 text-gray-900 font-medium">{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default UsersList;
