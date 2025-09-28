import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Zap, Target } from 'lucide-react';

const FitnessPage = () => {
  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <h1 className="text-2xl font-bold text-foreground mb-2">Seus Treinos</h1>
      <p className="text-muted-foreground mb-6">Planos personalizados baseados nos seus objetivos</p>

      {/* Weekly Progress */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Progresso da Semana</h2>
            <p className="opacity-90">5 de 7 treinos completados</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">1,250</div>
            <div className="text-sm opacity-90">calorias queimadas</div>
          </div>
        </div>
        <div className="w-full bg-primary-foreground/20 rounded-full h-2">
          <div className="bg-primary-foreground h-2 rounded-full" style={{ width: '71%' }}></div>
        </div>
      </Card>

      {/* Today's Workout */}
      <Card className="p-4 mb-6 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Treino de Hoje</span>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Recomendado</span>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">Treino HIIT Cardio</h3>
        <p className="text-sm text-muted-foreground mb-4">Baseado no seu plano personalizado</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>20 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={16} />
            <span>180 cal</span>
          </div>
        </div>
        
        <Button className="w-full">Iniciar</Button>
      </Card>

      {/* Workout Plans */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Planos de Treino</h2>
        
        <Card className="p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-foreground">Treino HIIT Cardio</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  20 min
                </span>
                <span className="flex items-center gap-1">
                  <Target size={14} />
                  8 exercícios
                </span>
                <span className="flex items-center gap-1">
                  <Zap size={14} />
                  180 cal
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">Cardio</span>
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">Moderado</span>
              </div>
            </div>
            <Button size="sm">Iniciar</Button>
          </div>
        </Card>

        <Card className="p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-foreground">Fortalecimento Core</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  15 min
                </span>
                <span className="flex items-center gap-1">
                  <Target size={14} />
                  6 exercícios
                </span>
                <span className="flex items-center gap-1">
                  <Zap size={14} />
                  120 cal
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">Força</span>
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">Fácil</span>
              </div>
            </div>
            <Button size="sm" variant="outline" disabled>Concluído</Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-foreground">Treino Completo</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  45 min
                </span>
                <span className="flex items-center gap-1">
                  <Target size={14} />
                  12 exercícios
                </span>
                <span className="flex items-center gap-1">
                  <Zap size={14} />
                  400 cal
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">Completo</span>
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">Intenso</span>
              </div>
            </div>
            <Button size="sm">Iniciar</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FitnessPage;