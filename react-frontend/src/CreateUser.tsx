import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const rolesList = ["Author", "Editor", "Subscriber", "Administrator"];

const CreateUser: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post("http://localhost:8000/api/users", {
        full_name: fullName,
        email,
        roles,
      });
      navigate("/users");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Roles:</label>
          <select multiple value={roles} onChange={e => setRoles(Array.from(e.target.selectedOptions, option => option.value))} required>
            {rolesList.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <button type="submit">Create</button>
        {error && <div style={{color: 'red'}}>{error}</div>}
      </form>
    </div>
  );
};

export default CreateUser;
