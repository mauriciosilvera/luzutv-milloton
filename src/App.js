import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import PollManagement from './views/PollManagement/PollManagement';
import TestView from './views/TestView';
import PollDetail from './views/PollDetail/PollDetail';
import Home from './views/Home/Home';

function App() {
  const location = useLocation();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const hideHeaderButtons = location.pathname === '/';
  const hideSidebar =
    location.pathname === '/' ||
    location.pathname === '/admin/login' ||
    location.pathname === '/admin/password-recovery';

  return (
    <div className="container">
      <Header
        hideButtons={hideHeaderButtons}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <div className="body">
        <Sidebar
          hidden={hideSidebar}
          isOpen={isSideBarOpen}
          setIsOpen={setIsSideBarOpen}
        />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ADMIN */}
          <Route path="admin/login" element={<TestView />} />
          <Route path="admin/password-recovery" element={<TestView />} />
          <Route path="admin/polls-management" element={<PollManagement />} />
          <Route path="admin/poll-details/:pollId" element={<PollDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
