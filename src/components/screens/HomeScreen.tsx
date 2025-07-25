import React from 'react';
import { Shield, Phone, MapPin, Heart, AlertTriangle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HomeScreenProps {
  onSOSPress: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSOSPress }) => {
  const safetyResources = [
    {
      icon: Phone,
      title: "Emergency Hotline",
      description: "24/7 support available",
      action: "Call Now",
      variant: "sos" as const,
    },
    {
      icon: MapPin,
      title: "Safe Zones",
      description: "Find nearby safe locations",
      action: "View Map",
      variant: "default" as const,
    },
    {
      icon: Heart,
      title: "Support Groups",
      description: "Connect with others",
      action: "Join",
      variant: "default" as const,
    },
  ];

  const recentNotifications = [
    {
      type: "info",
      title: "Safety Check",
      message: "You're in a safe area",
      time: "2 min ago",
      status: "safe"
    },
    {
      type: "alert", 
      title: "New Resource Available",
      message: "Legal aid center opened nearby",
      time: "1 hour ago",
      status: "info"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-card">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-text-heading mb-2">Welcome to ResQ</h2>
        <p className="text-text-body mb-6">Your safety is our priority. You're not alone.</p>
        
        {/* Quick SOS Button */}
        <Button
          variant="sos"
          size="xl"
          onClick={onSOSPress}
          className="w-full max-w-xs mx-auto"
        >
          <AlertTriangle className="w-6 h-6 mr-3" />
          Emergency SOS
        </Button>
      </div>

      {/* AI Detection Status */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-text-heading font-medium">AI Protection Active</span>
            </div>
            <Badge variant="secondary" className="bg-success/20 text-success">
              Monitoring
            </Badge>
          </div>
          <p className="text-text-body text-sm mt-2">
            Advanced detection systems are monitoring your environment for threats
          </p>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      {recentNotifications.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-text-heading flex items-center gap-2">
            <Users className="w-5 h-5" />
            Recent Updates
          </h3>
          {recentNotifications.map((notification, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-text-heading text-sm">
                        {notification.title}
                      </h4>
                      <Badge 
                        variant={notification.status === "safe" ? "secondary" : "destructive"}
                        className={`text-xs ${
                          notification.status === "safe" 
                            ? "bg-success/20 text-success" 
                            : "bg-warning/20 text-warning"
                        }`}
                      >
                        {notification.status}
                      </Badge>
                    </div>
                    <p className="text-text-body text-sm">{notification.message}</p>
                  </div>
                  <span className="text-text-label text-xs whitespace-nowrap ml-2">
                    {notification.time}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Safety Resources */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-heading">Safety Resources</h3>
        <div className="grid gap-3">
          {safetyResources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-primary/20 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text-heading">{resource.title}</h4>
                      <p className="text-text-body text-sm">{resource.description}</p>
                    </div>
                    <Button variant={resource.variant} size="sm">
                      {resource.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Emergency Notice */}
      <Card className="border-warning/50 bg-warning/5 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-text-heading text-sm mb-1">
                In Immediate Danger?
              </h4>
              <p className="text-text-body text-xs mb-3">
                If you're in immediate danger, call emergency services or use the SOS button above.
              </p>
              <div className="flex gap-2">
                <Button variant="danger" size="sm">
                  Call 911
                </Button>
                <Button variant="discrete" size="sm">
                  Local Police
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeScreen;