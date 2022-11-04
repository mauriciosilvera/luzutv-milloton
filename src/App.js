import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import PollManagement from './views/PollManagement/PollManagement';
import Results from './views/Results/Results';
import PollDetail from './views/PollDetail/PollDetail';
import Home from './views/Home/Home';
import Form from './views/Forms/Forms';
import FallBackView from './views/FallBackView';
import RequireAuth from './util/requireAuth';
import GroupManagement from './views/GroupManagement/GroupManagement';
import GroupResults from './views/GroupResults/GroupResults';
import ImageManagement from './views/Images/ImageManagement';
import PollResults from './views/PollResults/PollResults';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarButtonDisplayed, setIsSidebarButtonDisplayed] =
    useState(false);
  const [imageHasChanged, setImageHasChanged] = useState(false);

  return (
    <div className="container">
      <Header
        isSidebarButtonDisplayed={isSidebarButtonDisplayed}
        setIsSidebarOpen={setIsSidebarOpen}
        imageHasChanged={imageHasChanged}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="body">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarButtonDisplayed={isSidebarButtonDisplayed}
          setIsSidebarButtonDisplayed={setIsSidebarButtonDisplayed}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ADMIN */}
          <Route
            path="admin/login"
            element={
              <Form
                setIsSidebarButtonDisplayed={setIsSidebarButtonDisplayed}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            }
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
            path="admin/group-results/:groupId"
            element={
              <RequireAuth>
                <GroupResults />
              </RequireAuth>
            }
          />
          <Route
            path="admin/poll-results/:pollId"
            element={
              <RequireAuth>
                <PollResults />
              </RequireAuth>
            }
          />
          <Route
            path="admin/results"
            element={
              <RequireAuth>
                <Results />
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
    </div>
  );
}

export default App;
