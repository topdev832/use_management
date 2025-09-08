

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CreateUser from './CreateUser';
import UsersList from './UsersList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<CreateUser />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/" element={<Navigate to="/create" />} />
      </Routes>
    </Router>
  );
}

export default App;
