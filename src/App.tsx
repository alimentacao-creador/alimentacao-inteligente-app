import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/DashboardPage';
import FitnessPage from '@/pages/FitnessPage';
import PhotoAnalysisPage from '@/pages/PhotoAnalysisPage';
import ChatPage from '@/pages/ChatPage';
import AccountPage from '@/pages/AccountPage';
import RecipesPage from '@/pages/RecipesPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-lg">AI</span>
          </div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <LandingPage />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Layout><DashboardPage /></Layout> : <Navigate to="/" />} 
        />
        <Route 
          path="/recipes" 
          element={user ? <Layout><RecipesPage /></Layout> : <Navigate to="/" />} 
        />
        <Route 
          path="/chat" 
          element={user ? <Layout><ChatPage /></Layout> : <Navigate to="/" />} 
        />
        <Route 
          path="/photo-analysis" 
          element={user ? <Layout><PhotoAnalysisPage /></Layout> : <Navigate to="/" />} 
        />
        <Route 
          path="/fitness" 
          element={user ? <Layout><FitnessPage /></Layout> : <Navigate to="/" />} 
        />
        <Route 
          path="/account" 
          element={user ? <Layout><AccountPage /></Layout> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;