import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Info } from 'lucide-react';

const PhotoAnalysisPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <h1 className="text-2xl font-bold text-primary text-center mb-2">Reconhecimento Nutricional</h1>
      <p className="text-center text-muted-foreground mb-8">
        Tire uma foto da sua comida para análise instantânea de calorias e macros
      </p>

      {/* Photo Upload Area */}
      <Card className="p-8 mb-6 border-2 border-dashed border-border">
        <div className="text-center">
          {selectedImage ? (
            <div className="mb-4">
              <img 
                src={selectedImage} 
                alt="Comida selecionada" 
                className="max-w-full h-48 object-cover rounded-lg mx-auto mb-4"
              />
              <Button 
                onClick={() => setSelectedImage(null)}
                variant="outline"
                size="sm"
              >
                Escolher outra imagem
              </Button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Adicionar Foto da Comida</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Tire uma foto ou selecione uma imagem da galeria
              </p>
            </>
          )}

          <div className="flex gap-3 justify-center">
            <label htmlFor="camera-input">
              <Button className="flex items-center gap-2">
                <Camera size={20} />
                Tirar Foto
              </Button>
              <input
                id="camera-input"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            
            <label htmlFor="gallery-input">
              <Button variant="outline" className="flex items-center gap-2">
                <Upload size={20} />
                Galeria
              </Button>
              <input
                id="gallery-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </Card>

      {selectedImage && (
        <Card className="p-4 mb-6 bg-primary/5 border-primary/20">
          <Button className="w-full text-lg py-3">
            Analisar Comida
          </Button>
        </Card>
      )}

      {/* How it works */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Como Funciona</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <p className="text-sm text-muted-foreground">Tire uma foto clara da sua comida</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <p className="text-sm text-muted-foreground">A nossa IA analisa os ingredientes e porções</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <p className="text-sm text-muted-foreground">Receba informações detalhadas sobre calorias e macros</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PhotoAnalysisPage;