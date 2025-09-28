import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, MessageCircle, Heart, TrendingUp, ChefHat } from 'lucide-react';

const DashboardPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Bem-vindo de volta!</h1>
        <p className="mb-4 opacity-90">Continue a sua jornada para uma alimentação mais saudável.</p>
        <Button variant="secondary" className="flex items-center gap-2">
          <Camera size={20} />
          Analisar Comida
        </Button>
      </Card>

      {/* Daily Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <div className="text-2xl font-bold text-foreground">1,850</div>
          <div className="text-sm text-muted-foreground">Calorias consumidas</div>
          <div className="text-xs text-muted-foreground mt-1">Hoje</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-foreground">5</div>
          <div className="text-sm text-muted-foreground">Treinos realizados</div>
          <div className="text-xs text-muted-foreground mt-1">Esta semana</div>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <ChefHat className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Receitas IA</h3>
            <p className="text-sm text-muted-foreground mb-3">Ver Receitas</p>
          </Card>
          
          <Card className="p-4 text-center">
            <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Chat IA</h3>
            <p className="text-sm text-muted-foreground mb-3">Abrir Chat</p>
          </Card>
          
          <Card className="p-4 text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Fitness</h3>
            <p className="text-sm text-muted-foreground mb-3">Ver Treinos</p>
          </Card>
          
          <Card className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Progresso</h3>
            <p className="text-sm text-muted-foreground mb-3">Ver Stats</p>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Atividade Recente</h2>
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Há 2 horas</span>
          </div>
          <p className="text-foreground">Treino HIIT Cardio completado - 180 cal queimadas</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;