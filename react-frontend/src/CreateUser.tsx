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

    // Frontend validation for empty fields
    if (!fullName.trim() || !email.trim() || roles.length === 0) {
      setError("All fields are required, including at least one role.");
      return;
    }

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
        // Laravel validation errors
        if (err.response.data.errors.email?.includes('unique')) {
          setError("This email address is already registered.");
        } else {
          setError(Object.values(err.response.data.errors).flat().join(' '));
        }
      } else if (err.message === "Network Error") {
        setError("Network error: Unable to reach the server.");
      } else {
        setError(err.response?.data?.message || "Error creating user");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 border border-gray-100 rounded-2xl bg-white shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 mb-2 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">U</div>
          <h2 className="text-3xl font-extrabold text-center text-gray-900 tracking-tight">Create User</h2>
          <p className="text-gray-500 text-sm mt-1">Add a new user to your team</p>
        </div>
  <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Roles</label>
            <select
              multiple
              value={roles}
              onChange={e => setRoles(Array.from(e.target.selectedOptions, option => option.value))}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 h-32"
            >
              {rolesList.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition duration-150"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
          {success && <div className="text-green-600 mt-4 text-center font-semibold">{success}</div>}
          {error && <div className="text-red-600 mt-4 text-center font-semibold">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
