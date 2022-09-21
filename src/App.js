import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import PollManagement from './views/PollManagement/PollManagement';

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
        <View>
          <Routes>
            <Route path="/" element={<PollManagement />} />

            {/* ADMIN */}
            <Route path="admin/login" element={<PollManagement />} />
            <Route
              path="admin/password-recovery"
              element={<PollManagement />}
            />
            <Route path="admin/poll-management" element={<PollManagement />} />
            <Route path="admin/active-polls" element={<PollManagement />} />
          </Routes>
        </View>
      </div>
    </div>
  );
}

export default App;

// STYLES

const View = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffe5b4;
`;
