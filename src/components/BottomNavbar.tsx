import { 
  Home, 
  Camera, 
  Dumbbell, 
  BarChart3, 
  User, 
  LogOut 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Camera, label: 'Alimentação', path: '/meal' },
    { icon: Dumbbell, label: 'Treino', path: '/workouts' },
    { icon: BarChart3, label: 'Stats', path: '/stats' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="flex flex-col items-center p-2 text-red-500 hover:text-red-700"
        >
          <LogOut size={20} />
          <span className="text-xs mt-1">Sair</span>
        </Button>
      </div>
    </nav>
  );
};

export default BottomNavbar;