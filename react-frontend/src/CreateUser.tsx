import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const rolesList = ["Author", "Editor", "Subscriber", "Administrator"];

const CreateUser: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/users", {
        full_name: fullName,
        email,
        roles,
      });
      setLoading(false);
      setSuccess("User created successfully!");
      setFullName("");
      setEmail("");
      setRoles([]);
      setTimeout(() => {
        navigate("/users");
      }, 1200);
    } catch (err: any) {
      setLoading(false);
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).flat().join(' '));
      } else if (err.message === "Network Error") {
        setError("Network error: Unable to reach the server.");
      } else {
        setError(err.response?.data?.message || "Error creating user");
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8, background: '#fafafa' }}>
      <h2 style={{ textAlign: 'center' }}>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Full Name:</label>
          <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Roles:</label>
          <select multiple value={roles} onChange={e => setRoles(Array.from(e.target.selectedOptions, option => option.value))} required style={{ width: '100%', padding: 8, height: 100 }}>
            {rolesList.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }} disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
        {success && <div style={{color: 'green', marginTop: 16}}>{success}</div>}
        {error && <div style={{color: 'red', marginTop: 16}}>{error}</div>}
      </form>
    </div>
  );
};

export default CreateUser;
