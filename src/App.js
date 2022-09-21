import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import PollManagement from './views/PollManagement/PollManagement';
import TestView from './views/TestView';
import PollResults from './views/PollManagement/PollResults/PollResults';

function App() {
  const location = useLocation();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const hideHeader = location.pathname === '/';
  const hideSidebar =
    location.pathname === '/' ||
    location.pathname === '/admin/login' ||
    location.pathname === '/admin/password-recovery';

  return (
    <div className="container">
      <Header
        hidden={hideHeader}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <div className={`body ${hideHeader ? 'no-header' : ''}`}>
        <Sidebar
          hidden={hideSidebar}
          isOpen={isSideBarOpen}
          setIsOpen={setIsSideBarOpen}
        />
        <Routes>
          <Route path="/" element={<PollResults />} />

          {/* ADMIN */}
          <Route path="admin/login" element={<TestView />} />
          <Route path="admin/password-recovery" element={<TestView />} />
          <Route path="admin/poll-management" element={<PollManagement />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
