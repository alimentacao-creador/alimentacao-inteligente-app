import React from 'react';

const AuthPage = () => {
  console.log('AuthPage rendering...');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Alimentação Inteligente
        </h1>
        <p className="text-gray-600">
          Transforme sua saúde com IA personalizada
        </p>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <p className="text-lg">App carregando...</p>
          <p className="text-sm text-gray-500 mt-2">
            Sistema de autenticação em desenvolvimento
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;