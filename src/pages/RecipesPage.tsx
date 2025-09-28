import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Clock, Users, Star } from 'lucide-react';

const RecipesPage = () => {
  const recipes = [
    {
      id: 1,
      title: "Salmão Grelhado com Quinoa",
      description: "Rico em proteína e ómega-3, perfeito para o jantar",
      time: "25 min",
      servings: "2 pessoas",
      calories: "420 cal",
      rating: 4.8,
      image: "🐟",
      difficulty: "Fácil"
    },
    {
      id: 2,
      title: "Smoothie Verde Energético",
      description: "Mistura perfeita de frutas e vegetais para começar o dia",
      time: "5 min",
      servings: "1 pessoa",
      calories: "180 cal",
      rating: 4.9,
      image: "🥬",
      difficulty: "Muito Fácil"
    },
    {
      id: 3,
      title: "Bowl de Açaí Proteico",
      description: "Antioxidantes naturais com granola caseira",
      time: "10 min",
      servings: "1 pessoa",
      calories: "320 cal",
      rating: 4.7,
      image: "🍓",
      difficulty: "Fácil"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <ChefHat className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Receitas IA</h1>
          <p className="text-sm text-muted-foreground">Criadas especialmente para si</p>
        </div>
      </div>

      {/* Featured Recipe */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-primary fill-current" />
          <span className="text-sm font-medium text-primary">Receita em Destaque</span>
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Salmão Grelhado com Quinoa</h2>
        <p className="text-muted-foreground mb-4">
          Recomendado com base nos seus objetivos nutricionais. Rico em proteína e ómega-3.
        </p>
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={16} />
            25 min
          </span>
          <span className="flex items-center gap-1">
            <Users size={16} />
            2 pessoas
          </span>
          <span>420 cal</span>
        </div>
        <Button>Ver Receita Completa</Button>
      </Card>

      {/* Recipe Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <Button variant="default" size="sm" className="whitespace-nowrap">Todas</Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">Pequeno-almoço</Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">Almoço</Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">Jantar</Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">Snacks</Button>
      </div>

      {/* Recipe List */}
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="p-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                {recipe.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground line-clamp-1">{recipe.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{recipe.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {recipe.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {recipe.servings}
                  </span>
                  <span>{recipe.calories}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    {recipe.difficulty}
                  </span>
                  <Button size="sm" variant="outline">Ver Receita</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <Button variant="outline" className="w-full mt-6">
        Carregar Mais Receitas
      </Button>
    </div>
  );
};

export default RecipesPage;