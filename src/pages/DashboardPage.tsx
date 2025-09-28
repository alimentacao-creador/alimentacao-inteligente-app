import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUsageLimits } from '@/hooks/useUsageLimits';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Dumbbell, 
  BarChart3, 
  Crown, 
  Zap,
  TrendingUp,
  Target
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const { limits } = useUsageLimits();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Analisar Refeição',
      description: 'Tire uma foto da sua comida',
      icon: Camera,
      path: '/meal',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Meus Treinos',
      description: 'Ver plano de exercícios',
      icon: Dumbbell,
      path: '/workouts',
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Estatísticas',
      description: 'Acompanhar progresso',
      icon: BarChart3,
      path: '/stats',
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Bem-vindo de volta!
        </h2>
        <p className="text-gray-600">
          Continue sua jornada de saúde hoje
        </p>
      </div>

      {/* Usage Limits */}
      {limits && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Plano Atual</CardTitle>
              <div className="flex items-center space-x-1">
                {limits.plano_atual === 'premium' ? (
                  <Crown className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Zap className="h-5 w-5 text-gray-500" />
                )}
                <span className="text-sm font-medium capitalize">
                  {limits.plano_atual}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Análises de refeições</span>
              <span className="text-sm font-medium">
                {limits.limits.meals.remaining}/{limits.limits.meals.max}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all" 
                style={{ 
                  width: `${(limits.limits.meals.remaining / limits.limits.meals.max) * 100}%` 
                }}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Mensagens IA</span>
              <span className="text-sm font-medium">
                {limits.limits.messages.remaining}/{limits.limits.messages.max}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all" 
                style={{ 
                  width: `${(limits.limits.messages.remaining / limits.limits.messages.max) * 100}%` 
                }}
              />
            </div>

            {limits.plano_atual === 'free' && (
              <Button 
                variant="outline" 
                className="w-full mt-3"
                onClick={() => navigate('/subscription')}
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade para Premium
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Ações Rápidas</h3>
        <div className="grid gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.path}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="flex items-center p-4">
                  <div className={`${action.color} p-3 rounded-full mr-4`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progresso Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-xs text-gray-600">Meta Calorias</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">12k</div>
              <div className="text-xs text-gray-600">Passos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">45min</div>
              <div className="text-xs text-gray-600">Exercício</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Target className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900">Dica do Dia</h4>
              <p className="text-sm text-gray-600 mt-1">
                Beba pelo menos 2 litros de água hoje para manter-se hidratado e acelerar o metabolismo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;