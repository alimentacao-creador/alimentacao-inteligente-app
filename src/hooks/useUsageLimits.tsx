import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UsageLimits {
  subscription_status: string;
  plano_atual: string;
  trial_end_at: string | null;
  limits: {
    meals: {
      max: number;
      used: number;
      remaining: number;
    };
    messages: {
      max: number;
      used: number;
      remaining: number;
    };
  };
  today: string;
}

export const useUsageLimits = () => {
  const [limits, setLimits] = useState<UsageLimits | null>(null);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  const fetchLimits = async () => {
    if (!session) {
      setLimits(null);
      setLoading(false);
      return;
    }

    try {
      const response = await supabase.functions.invoke('limits', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        console.error('Error fetching limits:', response.error);
        return;
      }

      setLimits(response.data);
    } catch (error) {
      console.error('Error fetching limits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLimits();
  }, [session]);

  return { limits, loading, refetch: fetchLimits };
};