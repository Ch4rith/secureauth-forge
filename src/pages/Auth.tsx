import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthForm } from '@/components/auth/AuthForm';
import { Loader2 } from 'lucide-react';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ background: 'var(--gradient-glow)' }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      <div className="relative z-10 w-full animate-fade-in">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">
              SECURE AUTHENTICATION
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-gradient">Auth</span>
            <span className="text-foreground">System</span>
          </h1>
          <p className="mt-2 text-muted-foreground font-mono text-sm">
            Production-ready authentication for AI SaaS
          </p>
        </div>
        
        {/* Auth Form */}
        <div className="flex justify-center">
          <AuthForm 
            mode={mode} 
            onToggleMode={() => setMode(mode === 'login' ? 'register' : 'login')} 
          />
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            JWT • Role-Based Access • Activity Logging
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
