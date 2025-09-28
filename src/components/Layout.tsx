import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavbar from '@/components/BottomNavbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">
        {children}
      </main>
      <BottomNavbar />
    </div>
  );
};

export default Layout;