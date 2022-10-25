import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import PollManagement from './views/PollManagement/PollManagement';
import PollDetail from './views/PollDetail/PollDetail';
import Home from './views/Home/Home';
import Form from './views/Forms/Forms';
import FallBackView from './views/FallBackView';
import RequireAuth from './util/requireAuth';
import GroupManagement from './views/GroupManagement/GroupManagement';
import GroupDetail from './views/GroupDetail/GroupDetail';
import Footer from './components/Footer/Footer';
import ImageManagement from './views/Images/ImageManagement';

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [imageHasChanged, setImageHasChanged] = useState(false);

  return (
    <div className="container">
      <Header
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        imageHasChanged={imageHasChanged}
      />
      <div className="body">
        <Sidebar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ADMIN */}
          <Route
            path="admin/login"
            element={<Form setIsOpen={setIsSideBarOpen} />}
          />
          <Route path="admin/password-recovery" element={<Form recovery />} />
          <Route
            path="admin/polls-management"
            element={
              <RequireAuth>
                <PollManagement />
              </RequireAuth>
            }
          />
          <Route
            path="admin/groups-management"
            element={
              <RequireAuth>
                <GroupManagement />
              </RequireAuth>
            }
          />
          <Route
            path="admin/image-management"
            element={
              <RequireAuth>
                <ImageManagement
                  setImageHasChanged={setImageHasChanged}
                  imageHasChanged={imageHasChanged}
                />
              </RequireAuth>
            }
          />
          <Route
            path="admin/poll-details/:pollId"
            element={
              <RequireAuth>
                <PollDetail />
              </RequireAuth>
            }
          />
          <Route
            path="admin/group-details/:groupId"
            element={
              <RequireAuth>
                <GroupDetail />
              </RequireAuth>
            }
          />

          {/* ADMIN FALLBACK */}
          <Route
            path="admin/*"
            element={
              <RequireAuth>
                <FallBackView />
              </RequireAuth>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<FallBackView />} />
        </Routes>
      </div>
      {console.log(imageHasChanged)}
      <Footer imageHasChanged={imageHasChanged} />
    </div>
  );
}

export default App;
