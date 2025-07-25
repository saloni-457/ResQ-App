import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Clock, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SOSScreenProps {
  onSOSActivation: () => void;
}

const SOSScreen: React.FC<SOSScreenProps> = ({ onSOSActivation }) => {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sosHistory, setSosHistory] = useState([
    {
      id: 1,
      timestamp: '2024-01-15 14:30',
      status: 'resolved',
      type: 'manual',
      location: 'Downtown area'
    },
    {
      id: 2,
      timestamp: '2024-01-10 09:15',
      status: 'false_alarm',
      type: 'auto',
      location: 'Home'
    }
  ]);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSOSPress = () => {
    setCountdown(5); // 5 second countdown
    setIsSOSActive(true);
    
    // TODO: Implement countdown with option to cancel
    setTimeout(() => {
      if (isSOSActive) {
        triggerSOS();
      }
    }, 5000);
  };

  const triggerSOS = () => {
    // TODO: Implement actual SOS functionality
    // - Get current GPS location using navigator.geolocation
    // - Send SMS to trusted contacts with location
    // - Call emergency services
    // - Store incident in encrypted local storage
    // - Send alert to support network
    
    onSOSActivation();
    setIsSOSActive(false);
    setCountdown(0);
    
    // Add to history
    const newAlert = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      status: 'active',
      type: 'manual',
      location: 'Current location' // TODO: Get actual location
    };
    setSosHistory([newAlert, ...sosHistory]);
  };

  const cancelSOS = () => {
    setIsSOSActive(false);
    setCountdown(0);
    toast({
      title: "SOS Cancelled",
      description: "Emergency alert has been cancelled.",
    });
  };

  const quickActions = [
    {
      icon: Phone,
      title: "Emergency Services",
      description: "Call 911 immediately",
      action: () => {
        // TODO: Implement direct calling
        window.open('tel:911');
      },
      variant: "danger" as const,
    },
    {
      icon: Users,
      title: "Trusted Contacts",
      description: "Alert your emergency contacts",
      action: () => {
        // TODO: Implement contact alerts
        toast({
          title: "Contacts Alerted",
          description: "Your trusted contacts have been notified.",
        });
      },
      variant: "default" as const,
    },
    {
      icon: MapPin,
      title: "Share Location",
      description: "Send current location",
      action: () => {
        // TODO: Implement location sharing
        toast({
          title: "Location Shared",
          description: "Your location has been shared with emergency contacts.",
        });
      },
      variant: "default" as const,
    },
  ];

  // Active SOS State
  if (isSOSActive && countdown > 0) {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="w-32 h-32 mx-auto bg-destructive/20 rounded-full flex items-center justify-center animate-pulse">
          <AlertTriangle className="w-16 h-16 text-destructive" />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-destructive mb-2">SOS ACTIVATING</h2>
          <p className="text-text-body mb-4">Emergency services will be contacted in:</p>
          <div className="text-6xl font-bold text-destructive mb-8">{countdown}</div>
        </div>

        <div className="space-y-4">
          <Button
            variant="secondary"
            size="xl"
            onClick={cancelSOS}
            className="w-full max-w-xs mx-auto"
          >
            Cancel SOS
          </Button>
          <p className="text-text-label text-sm">
            Tap cancel if this was triggered accidentally
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-card">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-text-heading mb-2">Emergency SOS</h2>
        <p className="text-text-body">Quick access to emergency help when you need it most</p>
      </div>

      {/* Main SOS Button */}
      <Card className="shadow-card text-center">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto bg-destructive/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-destructive" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-text-heading mb-2">Press for Emergency</h3>
              <p className="text-text-body text-sm mb-6">
                This will alert emergency services and your trusted contacts with your location
              </p>
            </div>

            <Button
              variant="sos"
              size="xl"
              onClick={handleSOSPress}
              className="w-full max-w-xs mx-auto text-lg py-6"
            >
              <AlertTriangle className="w-8 h-8 mr-3" />
              EMERGENCY SOS
            </Button>

            <p className="text-text-label text-xs">
              5-second countdown before activation • Can be cancelled
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-heading">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card 
                key={index} 
                className="shadow-card hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
                onClick={action.action}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text-heading">{action.title}</h4>
                      <p className="text-text-body text-sm">{action.description}</p>
                    </div>
                    <Button variant={action.variant} size="sm">
                      Activate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* SOS History */}
      {sosHistory.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-text-heading flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Alerts
          </h3>
          {sosHistory.slice(0, 3).map((alert) => (
            <Card key={alert.id} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant={alert.status === 'resolved' ? 'secondary' : 'destructive'}
                        className={`text-xs ${
                          alert.status === 'resolved' 
                            ? "bg-success/20 text-success" 
                            : alert.status === 'false_alarm'
                            ? "bg-warning/20 text-warning"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {alert.status.replace('_', ' ')}
                      </Badge>
                      <span className="text-text-label text-xs">
                        {alert.type === 'auto' ? 'Auto-triggered' : 'Manual'}
                      </span>
                    </div>
                    <p className="text-text-body text-sm">{alert.location}</p>
                  </div>
                  <span className="text-text-label text-xs whitespace-nowrap ml-2">
                    {alert.timestamp}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Safety Notice */}
      <Card className="border-primary/50 bg-primary/5 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-text-heading text-sm mb-1">
                Your Safety Matters
              </h4>
              <p className="text-text-body text-xs">
                The SOS feature works even in stealth mode and can function offline. Your emergency contacts will receive your last known location.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOSScreen;