import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import BottomNavbar from '@/components/BottomNavbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-20 pt-4">
        {children}
      </main>
      <BottomNavbar />
    </div>
  );
};

export default Layout;