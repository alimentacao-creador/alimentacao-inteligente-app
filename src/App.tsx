import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-primary">Alimentação Inteligente</h1>
          <p className="text-muted-foreground">Nutrição & Treino</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Bem-vindo!</h2>
          <p className="text-lg text-muted-foreground">
            App inteligente para análise nutricional, treinos personalizados e acompanhamento de progresso
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;