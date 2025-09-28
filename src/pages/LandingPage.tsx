import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">AI</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground">Alimentação Inteligente</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">🌐 PT 🇵🇹</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/auth')}
            className="text-foreground border-border hover:bg-muted"
          >
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-4 py-16 max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-primary mb-6 leading-tight">
          Your smart companion
          <br />
          for nutrition, fitness and
          <br />
          daily health
        </h2>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          AI recipes, calorie recognition, fitness tracking and more —
          <br />
          all in one app.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg font-medium rounded-xl"
            onClick={() => navigate('/auth')}
          >
            Comece Grátis Agora →
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="h-14 text-lg border-border text-foreground hover:bg-muted rounded-xl"
          >
            Ver Planos Premium
          </Button>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-primary mb-6">
            Funcionalidades Principais
          </h3>
          <p className="text-lg text-muted-foreground mb-12">
            Combinamos inteligência artificial com nutrição científica
            <br />
            para criar a experiência alimentar perfeita para si.
          </p>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍎</span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-card-foreground">Análise Nutricional</h4>
              <p className="text-muted-foreground">
                Reconhecimento automático de alimentos e análise detalhada de calorias e nutrientes
              </p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-card-foreground">Treinos Personalizados</h4>
              <p className="text-muted-foreground">
                Planos de exercício adaptados aos seus objetivos e nível de fitness
              </p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-card-foreground">Acompanhamento</h4>
              <p className="text-muted-foreground">
                Monitorização em tempo real do seu progresso e objetivos de saúde
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Alimentação Inteligente. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;