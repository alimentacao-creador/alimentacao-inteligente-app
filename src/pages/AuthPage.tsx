import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);
        
      if (error) {
        setError(error.message);
      } else if (isLogin) {
        navigate('/dashboard');
      } else {
        setError('Conta criada! Verifique o seu email para confirmar.');
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    }
    
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">AI</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? 'Aceda à sua conta' : 'Junte-se à Alimentação Inteligente'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'A processar...' : (isLogin ? 'Entrar' : 'Criar Conta')}
            </button>
          </form>

          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="mt-4 w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              <span>🔍</span>
              Continuar com Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-600 hover:text-green-700 text-sm"
            >
              {isLogin ? 'Não tem conta? Criar conta' : 'Já tem conta? Entrar'}
            </button>
          </div>
        </div>

        {/* Back to landing */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;