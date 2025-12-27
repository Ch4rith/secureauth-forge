import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Terminal, Shield, Key, Activity, ChevronRight, Github } from 'lucide-react';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background effects */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--gradient-glow)' }}
      />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Terminal className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold">
              <span className="text-gradient">Auth</span>
              <span className="text-foreground">System</span>
            </span>
          </div>
          <Link to="/auth">
            <Button variant="terminal" size="sm">
              Sign in
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="mx-auto max-w-3xl animate-fade-in">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">
                PRODUCTION-READY • SECURE • MINIMAL
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-gradient">Authentication</span>
              <br />
              <span className="text-foreground">for AI SaaS</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              A clean, production-style authentication system with JWT tokens, 
              role-based access control, and login activity tracking.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/auth">
                <Button variant="glow" size="xl">
                  Get Started
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="xl">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="mx-auto mt-24 grid max-w-4xl gap-6 md:grid-cols-3">
            <div className="group rounded-xl border border-border/50 bg-card/50 p-6 text-left backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">JWT Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Secure token-based auth with access and refresh tokens for session management.
              </p>
            </div>

            <div className="group rounded-xl border border-border/50 bg-card/50 p-6 text-left backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Role-Based Access</h3>
              <p className="text-sm text-muted-foreground">
                User and admin roles with secure, server-side role verification functions.
              </p>
            </div>

            <div className="group rounded-xl border border-border/50 bg-card/50 p-6 text-left backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Activity Logging</h3>
              <p className="text-sm text-muted-foreground">
                Track login events with timestamps, IP addresses, and user agent data.
              </p>
            </div>
          </div>

          {/* Code snippet preview */}
          <div className="mx-auto mt-16 max-w-2xl">
            <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-destructive/60" />
                <span className="h-3 w-3 rounded-full bg-warning/60" />
                <span className="h-3 w-3 rounded-full bg-success/60" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">
                  AuthContext.tsx
                </span>
              </div>
              <pre className="p-4 text-left text-sm overflow-x-auto">
                <code className="font-mono text-muted-foreground">
                  <span className="text-primary">const</span> {`{ user, role, signIn } = `}
                  <span className="text-primary">useAuth</span>();{'\n'}
                  <span className="text-muted-foreground/60">// JWT tokens handled automatically</span>{'\n'}
                  <span className="text-muted-foreground/60">// Role-based access with has_role()</span>{'\n'}
                  <span className="text-muted-foreground/60">// Login activity tracked per session</span>
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-muted-foreground font-mono">
                Built with React • Vite • Lovable Cloud
              </p>
              <p className="text-xs text-muted-foreground">
                A reference implementation for authentication
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
