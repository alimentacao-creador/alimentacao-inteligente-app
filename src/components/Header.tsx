import { Bell, Menu, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUsageLimits } from '@/hooks/useUsageLimits';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useAuth();
  const { limits } = useUsageLimits();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon">
            <Menu size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Alimentação Inteligente
            </h1>
            <p className="text-xs text-gray-500">
              Olá, {user?.email?.split('@')[0] || 'Usuário'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {limits?.plano_atual === 'free' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/subscription')}
              className="text-xs flex items-center space-x-1 text-orange-600 border-orange-200"
            >
              <Crown size={14} />
              <span>Premium</span>
            </Button>
          )}
          
          <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;