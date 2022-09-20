import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PollManagement from './views/admin/PollManagement/PollManagement';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PollManagement />} />

      {/* ADMIN */}
      <Route path="admin/login" element="" />
      <Route path="admin/password-recovery" element="" />
      <Route path="admin/poll-management" element={<PollManagement />} />
      <Route path="admin/active-polls" element={<PollManagement />} />
    </Routes>
  );
}

export default App;
