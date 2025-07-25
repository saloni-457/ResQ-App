import React, { useState } from 'react';
import { MessageCircle, Lock, Send, Phone, Users, Scale, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ChatScreen = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const supportChannels = [
    {
      id: 'emergency',
      name: 'Emergency Support',
      description: 'Immediate crisis intervention',
      icon: Phone,
      status: 'online',
      lastMessage: 'Available 24/7 for urgent situations',
      respondTime: 'Immediate',
      color: 'text-destructive'
    },
    {
      id: 'counselor',
      name: 'Professional Counselor',
      description: 'Licensed mental health support',
      icon: Users,
      status: 'online',
      lastMessage: 'Hi, I\'m here to help. How are you feeling today?',
      respondTime: '~5 min',
      color: 'text-primary'
    },
    {
      id: 'legal',
      name: 'Legal Advisor',
      description: 'Free legal guidance and resources',
      icon: Scale,
      status: 'away',
      lastMessage: 'I can help with restraining orders and legal options',
      respondTime: '~15 min',
      color: 'text-warning'
    },
    {
      id: 'peer',
      name: 'Peer Support Group',
      description: 'Connect with others who understand',
      icon: Users,
      status: 'online',
      lastMessage: '12 members online • Safe space to share',
      respondTime: 'Active now',
      color: 'text-success'
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    // TODO: Implement encrypted messaging
    // - Encrypt message with AES-256
    // - Send via secure WebSocket
    // - Store encrypted in local DB
    // - Handle offline queueing

    toast({
      title: "Message Sent",
      description: "Your encrypted message has been delivered.",
    });

    setMessage('');
  };

  const handleQuickConnect = (chatId: string) => {
    setSelectedChat(chatId);
    // TODO: Implement chat connection
    // - Establish encrypted connection
    // - Load chat history
    // - Set up real-time messaging
    
    toast({
      title: "Connected",
      description: `Connected to ${supportChannels.find(c => c.id === chatId)?.name}`,
    });
  };

  if (selectedChat) {
    const chat = supportChannels.find(c => c.id === selectedChat);
    if (!chat) return null;

    return (
      <div className="space-y-4">
        {/* Chat Header */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedChat(null)}
              >
                ← Back
              </Button>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <chat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-text-heading">{chat.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      chat.status === 'online' ? 'bg-success' : 'bg-warning'
                    }`} />
                    <span className="text-xs text-text-body">
                      {chat.status === 'online' ? 'Online' : 'Away'}
                    </span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <Lock className="w-3 h-3 mr-1" />
                Encrypted
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages Area */}
        <Card className="shadow-card">
          <CardContent className="p-4 min-h-64">
            <div className="text-center text-text-body text-sm py-8">
              {/* TODO: Implement chat message display */}
              <Lock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p>End-to-end encrypted chat</p>
              <p className="text-xs mt-1">Messages appear here once conversation starts</p>
            </div>
          </CardContent>
        </Card>

        {/* Message Input */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-input border-border"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                variant="default"
                size="icon"
                disabled={!message.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-card">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-text-heading mb-2">Secure Support Chat</h2>
        <p className="text-text-body">Connect with trained professionals who care</p>
      </div>

      {/* Encryption Notice */}
      <Card className="border-primary/50 bg-primary/5 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-text-heading text-sm mb-1">
                End-to-End Encrypted
              </h4>
              <p className="text-text-body text-xs">
                All conversations are private and secure. Only you and your support person can read messages.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Channels */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-heading">Available Support</h3>
        <div className="space-y-3">
          {supportChannels.map((channel) => {
            const IconComponent = channel.icon;
            return (
              <Card 
                key={channel.id} 
                className="shadow-card hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
                onClick={() => handleQuickConnect(channel.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 ${channel.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-text-heading">{channel.name}</h4>
                        <div className={`w-2 h-2 rounded-full ${
                          channel.status === 'online' ? 'bg-success' : 'bg-warning'
                        }`} />
                      </div>
                      <p className="text-text-body text-sm mb-1">{channel.description}</p>
                      <p className="text-text-label text-xs">{channel.lastMessage}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-2">
                        {channel.respondTime}
                      </Badge>
                      <br />
                      <Button variant="default" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-text-heading">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="sos" size="lg" className="w-full">
            <Phone className="w-5 h-5 mr-2" />
            Call Crisis Hotline
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="discrete">
              Legal Resources
            </Button>
            <Button variant="discrete">
              Safety Planning
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatScreen;