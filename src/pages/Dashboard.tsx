import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LogOut, 
  Shield, 
  User, 
  Clock, 
  Monitor,
  Terminal,
  Activity,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';

interface LoginActivity {
  id: string;
  ip_address: string | null;
  user_agent: string | null;
  login_at: string;
}

const Dashboard: React.FC = () => {
  const { user, role, signOut, isAdmin } = useAuth();
  const [loginActivity, setLoginActivity] = useState<LoginActivity[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    const fetchLoginActivity = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('login_activity')
          .select('*')
          .order('login_at', { ascending: false })
          .limit(5);
        
        if (error) throw error;
        setLoginActivity(data || []);
      } catch (err) {
        console.error('Error fetching login activity:', err);
      } finally {
        setLoadingActivity(false);
      }
    };

    fetchLoginActivity();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  // Parse user agent for display
  const parseUserAgent = (ua: string | null): string => {
    if (!ua) return 'Unknown device';
    if (ua.includes('Chrome')) return 'Chrome Browser';
    if (ua.includes('Firefox')) return 'Firefox Browser';
    if (ua.includes('Safari')) return 'Safari Browser';
    if (ua.includes('Edge')) return 'Edge Browser';
    return 'Browser';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">
                <span className="text-gradient">Auth</span>
                <span className="text-foreground">System</span>
              </h1>
              <p className="text-xs text-muted-foreground font-mono">Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                isAdmin 
                  ? 'bg-warning/10 text-warning' 
                  : 'bg-primary/10 text-primary'
              }`}>
                <Shield className="h-3 w-3" />
                {role?.toUpperCase() || 'USER'}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* User Info Card */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" />
                Profile
              </CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </label>
                <p className="mt-1 font-mono text-sm">{user?.email}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  User ID
                </label>
                <p className="mt-1 font-mono text-xs text-muted-foreground truncate">
                  {user?.id}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Role
                </label>
                <p className="mt-1 font-mono text-sm capitalize">{role || 'user'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Access Level Card */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-primary" />
                Access Level
              </CardTitle>
              <CardDescription>Role-based permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-3">
                <span className="text-sm">Dashboard access</span>
                <span className="text-xs text-success font-mono">GRANTED</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-3">
                <span className="text-sm">API access</span>
                <span className="text-xs text-success font-mono">GRANTED</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-3">
                <span className="text-sm">Admin panel</span>
                <span className={`text-xs font-mono ${isAdmin ? 'text-success' : 'text-muted-foreground'}`}>
                  {isAdmin ? 'GRANTED' : 'DENIED'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Session Info Card */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-primary" />
                Session
              </CardTitle>
              <CardDescription>Current session details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-mono">Active</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Authentication
                </label>
                <p className="mt-1 font-mono text-sm">JWT Token</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Login Activity */}
        <Card className="mt-6 border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              Recent Login Activity
            </CardTitle>
            <CardDescription>Your recent authentication events</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingActivity ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : loginActivity.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                No login activity recorded yet
              </p>
            ) : (
              <div className="space-y-3">
                {loginActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className={`flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-4 ${
                      index === 0 ? 'ring-1 ring-primary/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <Monitor className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {parseUserAgent(activity.user_agent)}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {activity.ip_address || 'IP not recorded'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono">
                        {format(new Date(activity.login_at), 'HH:mm:ss')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(activity.login_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    {index === 0 && (
                      <ChevronRight className="h-4 w-4 text-primary ml-2" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
