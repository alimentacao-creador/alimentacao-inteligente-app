import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from '@/pages/AuthPage';

function App() {
  console.log('App component rendering...');
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;