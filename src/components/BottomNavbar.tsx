import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ChefHat, MessageCircle, Camera, Heart, User } from 'lucide-react';

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: ChefHat, label: 'Receitas', path: '/recipes' },
    { icon: MessageCircle, label: 'Chat IA', path: '/chat' },
    { icon: Camera, label: '', path: '/photo-analysis', isCenter: true },
    { icon: Heart, label: 'Fitness', path: '/fitness' },
    { icon: User, label: 'Conta', path: '/account' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-pb">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
              item.isCenter 
                ? 'bg-primary text-primary-foreground w-14 h-14 rounded-full -mt-6 shadow-lg' 
                : location.pathname === item.path 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
            }`}
          >
            <item.icon size={item.isCenter ? 28 : 20} />
            {!item.isCenter && (
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;