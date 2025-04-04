import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MedicalChatbot from './pages/MedicalChatbot';
import Dashboard from './pages/Dashboard'; // Import Dashboard page

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<MedicalChatbot />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

