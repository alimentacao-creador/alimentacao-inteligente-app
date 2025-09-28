import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  User, 
  Crown, 
  Globe, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Settings
} from 'lucide-react';

const AccountPage = () => {
  const { user, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();

  const languageOptions = [
    { code: 'pt', name: 'Português (Portugal)', flag: '🇵🇹' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <h1 className="text-2xl font-bold text-foreground mb-6">Conta</h1>

      {/* User Profile */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">João Silva</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-1 mt-1">
                <Crown className="w-4 h-4 text-primary" />
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Plano Gratuito
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </div>
      </Card>

      {/* Premium Upgrade */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 mb-6">
        <div className="flex items-start gap-3">
          <Crown className="w-6 h-6 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">Upgrade para Premium</h3>
            <p className="text-sm opacity-90 mb-4">Desbloqueie funcionalidades avançadas</p>
            <Button variant="secondary" size="sm">
              Ver Planos
            </Button>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <div className="space-y-1 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">Configurações</h3>
        
        {/* Language */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Idioma</h4>
                <p className="text-sm text-muted-foreground">{currentLanguage?.name}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Alterar
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Notificações</h4>
                <p className="text-sm text-muted-foreground">Gerir preferências</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Configurar
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>

        {/* Privacy */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Privacidade</h4>
                <p className="text-sm text-muted-foreground">Dados e segurança</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Ver
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>

        {/* Help & Support */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Ajuda e Suporte</h4>
                <p className="text-sm text-muted-foreground">FAQ e contacto</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Abrir
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Logout */}
      <Button 
        variant="destructive" 
        className="w-full"
        onClick={signOut}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Terminar Sessão
      </Button>
    </div>
  );
};

export default AccountPage;