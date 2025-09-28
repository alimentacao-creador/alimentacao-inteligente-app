import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, MessageCircle, Dumbbell, TrendingUp, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUsageLimits } from '@/hooks/useUsageLimits';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalMeals: number;
  totalCalories: number;
  weeklyWorkouts: number;
  currentStreak: number;
}

const DashboardPage = () => {
  const { user } = useAuth();
  const { limits, loading } = useUsageLimits();
  const [stats, setStats] = useState<DashboardStats>({
    totalMeals: 0,
    totalCalories: 0,
    weeklyWorkouts: 0,
    currentStreak: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, [user]);

  const fetchDashboardStats = async () => {
    if (!user) return;

    try {
      // Buscar estatísticas do último mês
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

      const { data: meals } = await supabase
        .from('meal_images')
        .select('calories_estimated, created_at')
        .eq('user_id', user.id)
        .gte('created_at', lastMonth.toISOString());

      const { data: workouts } = await supabase
        .from('workouts')
        .select('id, created_at')
        .eq('user_id', user.id)
        .gte('created_at', lastMonth.toISOString());

      const totalMeals = meals?.length || 0;
      const totalCalories = meals?.reduce((sum, meal) => sum + (meal.calories_estimated || 0), 0) || 0;
      const weeklyWorkouts = workouts?.length || 0;

      setStats({
        totalMeals,
        totalCalories,
        weeklyWorkouts,
        currentStreak: Math.min(totalMeals, 7) // Simplified streak calculation
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const quickActions = [
    {
      title: 'Analisar Refeição',
      description: 'Tire uma foto da sua comida',
      icon: Camera,
      color: 'gradient-primary',
      path: '/photo-analysis',
      disabled: !limits?.limits.meals.remaining
    },
    {
      title: 'Chat IA',
      description: 'Converse com seu coach nutricional',
      icon: MessageCircle,
      color: 'gradient-secondary',
      path: '/chat',
      disabled: !limits?.limits.messages.remaining
    },
    {
      title: 'Treinos',
      description: 'Gerencie seus treinos semanais',
      icon: Dumbbell,
      color: 'bg-accent',
      path: '/fitness',
      disabled: false
    },
    {
      title: 'Progresso',
      description: 'Veja suas estatísticas',
      icon: TrendingUp,
      color: 'bg-primary',
      path: '/stats',
      disabled: false
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-lg">AI</span>
          </div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo de volta! Vamos continuar sua jornada saudável.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.totalMeals}</div>
            <div className="text-sm text-muted-foreground">Refeições Analisadas</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{Math.round(stats.totalCalories)}</div>
            <div className="text-sm text-muted-foreground">Calorias Totais</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{stats.weeklyWorkouts}</div>
            <div className="text-sm text-muted-foreground">Treinos Este Mês</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Sequência Atual</div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Limits */}
      {limits && (
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-6 h-6 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-xs text-primary-foreground font-bold">📊</span>
              </div>
              Limites Diários
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Análises de Refeições</span>
              <div className="text-right">
                <div className="text-sm font-medium">
                  {limits.limits.meals.remaining} / {limits.limits.meals.max}
                </div>
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-primary transition-all duration-300"
                    style={{ 
                      width: `${(limits.limits.meals.used / limits.limits.meals.max) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Mensagens IA</span>
              <div className="text-right">
                <div className="text-sm font-medium">
                  {limits.limits.messages.remaining} / {limits.limits.messages.max}
                </div>
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-secondary transition-all duration-300"
                    style={{ 
                      width: `${(limits.limits.messages.used / limits.limits.messages.max) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </div>

            {limits.subscription_status === 'free' && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">
                  Plano Gratuito • Atualize para mais funcionalidades
                </p>
                <Button size="sm" className="w-full gradient-primary">
                  Upgrade para Premium
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className={`border-border/50 shadow-soft transition-smooth hover:shadow-elevated cursor-pointer ${
                action.disabled ? 'opacity-50' : 'hover:border-primary/20'
              }`}
              onClick={() => {
                if (!action.disabled) {
                  window.location.href = action.path;
                }
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                    {action.disabled && (
                      <p className="text-xs text-destructive mt-1">Limite diário atingido</p>
                    )}
                  </div>
                  <Plus className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-xs text-accent-foreground font-bold">📈</span>
            </div>
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Camera className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Análise de refeição concluída</p>
                <p className="text-xs text-muted-foreground">Hoje às 12:30</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Consulta com IA realizada</p>
                <p className="text-xs text-muted-foreground">Ontem às 18:45</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Treino de peito concluído</p>
                <p className="text-xs text-muted-foreground">Anteontem às 07:00</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;