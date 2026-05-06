import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Home from './pages/Home';
import ActiveExercise from './pages/ActiveExercise';
import Settlement from './pages/Settlement';
import ServiceHub from './pages/ServiceHub';
import Appointment from './pages/Appointment';
import ScoreReport from './pages/ScoreReport';
import History from './pages/History';
import DataDetail from './pages/DataDetail';
import Profile from './pages/Profile';
import Feedback from './pages/Feedback';
import ProjectOverview from './pages/ProjectOverview';
import Register from './pages/Register';
import BottomNav from './components/BottomNav';
import VenueCheckin from './pages/VenueCheckin';
const App: React.FC = () => {
  const location = useLocation();
  
  // Pages that should NOT show the bottom navigation
  const hideNavPaths = ['/', '/login', '/active-exercise', '/splash', '/overview', '/register'];
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      {/* 加上 pb-20，给底部的导航栏留出空间，防止挡住页面内容 */}
      <div className={`w-full max-w-md min-h-screen bg-white relative shadow-2xl overflow-hidden ${showNav ? 'pb-20' : ''}`}>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/active-exercise" element={<ActiveExercise />} />
          <Route path="/settlement" element={<Settlement />} />
          <Route path="/services" element={<ServiceHub />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/report" element={<ScoreReport />} />
          <Route path="/history" element={<History />} />
          <Route path="/detail" element={<DataDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/overview" element={<ProjectOverview />} />
          <Route path="/venue-checkin" element={<VenueCheckin />} />
        </Routes>

        {/* 把导航栏移到这里！放到 max-w-md 这个容器的内部 */}
        {showNav && <BottomNav />}
      </div>
    </div>
  );
};

export default App;
