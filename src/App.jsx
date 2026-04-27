import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Play from './pages/Play';
import Puzzles from './pages/Puzzles';
import Rankings from './pages/Rankings';
import Watch from './pages/Watch';
import WatchGame from './pages/WatchGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/play" element={<Play />} />
        <Route path="/puzzles" element={<Puzzles />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/watch/:id" element={<WatchGame />} />
        {/* Redirection vers login par défaut */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
