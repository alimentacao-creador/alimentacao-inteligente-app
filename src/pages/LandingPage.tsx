import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Alimentação Inteligente</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">🌐 PT 🇵🇹</span>
          </div>
          <button 
            onClick={() => navigate('/auth')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Entrar
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-4 py-16 max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-green-600 mb-6 leading-tight">
          Your smart companion
          <br />
          for nutrition, fitness and
          <br />
          daily health
        </h2>
        
        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          AI recipes, calorie recognition, fitness tracking and more —
          <br />
          all in one app.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          <button 
            onClick={() => navigate('/auth')}
            className="bg-green-600 hover:bg-green-700 text-white h-14 text-lg font-medium rounded-xl transition-colors"
          >
            Comece Grátis Agora →
          </button>
          
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 h-14 text-lg rounded-xl transition-colors">
            Ver Planos Premium
          </button>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-4 py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-green-600 mb-6">
            Funcionalidades Principais
          </h3>
          <p className="text-lg text-gray-600 mb-12">
            Combinamos inteligência artificial com nutrição científica
            <br />
            para criar a experiência alimentar perfeita para si.
          </p>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍎</span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900">Análise Nutricional</h4>
              <p className="text-gray-600">
                Reconhecimento automático de alimentos e análise detalhada de calorias e nutrientes
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900">Treinos Personalizados</h4>
              <p className="text-gray-600">
                Planos de exercício adaptados aos seus objetivos e nível de fitness
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900">Acompanhamento</h4>
              <p className="text-gray-600">
                Monitorização em tempo real do seu progresso e objetivos de saúde
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">
            © 2024 Alimentação Inteligente. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;