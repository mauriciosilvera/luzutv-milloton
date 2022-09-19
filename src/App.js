import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/home" element="" />

      {/* ADMIN */}
      <Route path="admin/login" element="" />
      <Route path="admin/password-recovery" element="" />
      <Route path="admin/poll-management" element="" />
    </Routes>
  );
}

export default App;
