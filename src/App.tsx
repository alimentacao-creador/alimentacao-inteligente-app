import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import { Toaster } from '@/components/ui/toaster';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold">Perfil</h1>
                    <p className="text-gray-600 mt-2">Em desenvolvimento...</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/meal" 
              element={
                <ProtectedRoute>
                  <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold">Análise de Refeições</h1>
                    <p className="text-gray-600 mt-2">Em desenvolvimento...</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/workouts" 
              element={
                <ProtectedRoute>
                  <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold">Treinos</h1>
                    <p className="text-gray-600 mt-2">Em desenvolvimento...</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/stats" 
              element={
                <ProtectedRoute>
                  <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold">Estatísticas</h1>
                    <p className="text-gray-600 mt-2">Em desenvolvimento...</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/subscription" 
              element={
                <ProtectedRoute>
                  <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold">Assinatura</h1>
                    <p className="text-gray-600 mt-2">Em desenvolvimento...</p>
                  </div>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;