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
    <div>
      <h2>Users Grouped by Role</h2>
      {loading ? <div>Loading...</div> : (
        Object.keys(grouped).length === 0 ? <div>No users found.</div> : (
          Object.keys(grouped).map(roleName => (
            <div key={roleName} style={{ marginBottom: 32 }}>
              <h3>{roleName}</h3>
              <table border={1} cellPadding={8} style={{ width: '100%', marginBottom: 8 }}>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {grouped[roleName].map(user => (
                    <tr key={user.id}>
                      <td>{user.full_name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default UsersList;
