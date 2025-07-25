import React, { useState } from 'react';
import { Home, FileText, MessageCircle, AlertTriangle, Menu, Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Component imports - these will be created separately
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen';
import ChatScreen from './screens/ChatScreen';
import SOSScreen from './screens/SOSScreen';
import AIBotDrawer from './features/AIBotDrawer';

type TabType = 'home' | 'report' | 'chat' | 'sos';

const ResQApp = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  const handleSOSActivation = () => {
    // TODO: Implement real SOS functionality
    // - Get GPS location
    // - Send SMS to trusted contacts  
    // - Call emergency services
    // - Log incident with timestamp
    toast({
      title: "SOS Alert Sent",
      description: "Emergency contacts have been notified with your location.",
      variant: "destructive",
    });
  };

  const toggleStealthMode = () => {
    setIsStealthMode(!isStealthMode);
    toast({
      title: isStealthMode ? "Stealth Mode Disabled" : "Stealth Mode Enabled",
      description: isStealthMode ? "App is now visible" : "App interface is now discrete",
    });
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onSOSPress={handleSOSActivation} />;
      case 'report':
        return <ReportScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'sos':
        return <SOSScreen onSOSActivation={handleSOSActivation} />;
      default:
        return <HomeScreen onSOSPress={handleSOSActivation} />;
    }
  };

  const tabs = [
    { id: 'home' as TabType, icon: Home, label: 'Home' },
    { id: 'report' as TabType, icon: FileText, label: 'Report' },
    { id: 'chat' as TabType, icon: MessageCircle, label: 'Chat' },
    { id: 'sos' as TabType, icon: AlertTriangle, label: 'SOS' },
  ];

  // Stealth mode overlay - makes app look like a different app
  if (isStealthMode) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security App
              </CardTitle>
              <CardDescription>System security status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>System Status</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Scan</span>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <Button 
                  onClick={toggleStealthMode}
                  variant="discrete"
                  className="w-full"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Header */}
      <header className="relative p-4 pb-2">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button
            variant="nav"
            size="nav"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-text-heading">ResQ</h1>
            <p className="text-xs text-text-body">Stay Safe & Protected</p>
          </div>

          <Button
            variant="nav"
            size="nav"
            onClick={toggleStealthMode}
            className="relative"
          >
            {isStealthMode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-20">
        <div className="max-w-md mx-auto">
          {renderActiveScreen()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-nav-bg border-t border-border">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <Button
                  key={tab.id}
                  variant="nav"
                  size="nav"
                  onClick={() => setActiveTab(tab.id)}
                  data-active={isActive}
                  className="flex flex-col items-center gap-1 p-2"
                >
                  <IconComponent className={`w-5 h-5 ${isActive ? 'text-nav-active' : 'text-nav-inactive'}`} />
                  <span className={`text-xs ${isActive ? 'text-nav-active' : 'text-nav-inactive'}`}>
                    {tab.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* AI Bot Drawer */}
      <AIBotDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </div>
  );
};

export default ResQApp;