import React, { useState } from 'react';
import { X, Bot, Send, Mic, MicOff, Volume2, VolumeX, Heart, Scale, AlertTriangle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface AIBotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIBotDrawer: React.FC<AIBotDrawerProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hi, I'm your AI support companion. I'm here to provide emotional support, legal information, and emergency guidance. How can I help you today?",
      timestamp: new Date(),
    }
  ]);

  const quickActions = [
    {
      icon: Heart,
      title: "Emotional Support",
      description: "Need someone to talk to",
      action: () => sendQuickMessage("I need emotional support")
    },
    {
      icon: Scale,
      title: "Legal Information",
      description: "Learn about your rights",
      action: () => sendQuickMessage("I need legal information")
    },
    {
      icon: AlertTriangle,
      title: "Emergency Guidance",
      description: "What should I do right now?",
      action: () => sendQuickMessage("I need emergency guidance")
    },
    {
      icon: Settings,
      title: "Safety Planning",
      description: "Help me create a safety plan",
      action: () => sendQuickMessage("Help me create a safety plan")
    }
  ];

  const sendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: message,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);

    // TODO: Implement AI response
    // - Send to AI service (OpenAI, etc.)
    // - Handle context about domestic violence
    // - Provide empathetic, helpful responses
    // - Include crisis detection and escalation

    // Mock AI response for now
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: generateAIResponse(message),
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);

    setMessage('');
  };

  const sendQuickMessage = (quickMessage: string) => {
    setMessage(quickMessage);
    setTimeout(() => sendMessage(), 100);
  };

  const generateAIResponse = (userMessage: string) => {
    // TODO: Replace with actual AI integration
    const responses = [
      "I understand this is difficult. You're very brave for reaching out. Can you tell me more about what's happening?",
      "Your safety is the most important thing right now. Are you in a safe place where we can talk?",
      "I'm here to support you. Remember, what's happening to you is not your fault.",
      "Let's work together to find resources that can help you. What type of support do you need most right now?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleVoiceListening = () => {
    // TODO: Implement speech-to-text
    // - Use Web Speech API
    // - Handle privacy concerns
    // - Convert speech to text for input
    setIsListening(!isListening);
  };

  const toggleAudio = () => {
    // TODO: Implement text-to-speech
    // - Use Web Speech Synthesis API
    // - Read bot responses aloud
    // - Handle privacy/discretion settings
    setIsAudioEnabled(!isAudioEnabled);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-background h-full shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-heading">AI Support Companion</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-xs text-text-body">Online & Private</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b border-border">
            <h4 className="text-sm font-medium text-text-heading mb-3">Quick Support</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant="discrete"
                    size="sm"
                    onClick={action.action}
                    className="h-auto p-3 flex flex-col items-center gap-1"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-xs text-center">{action.title}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-card-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <Bot className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
              <Badge variant="secondary" className="bg-success/20 text-success">
                Private & Secure
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="pr-10"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8"
                  onClick={toggleVoiceListening}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 text-destructive" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleAudio}
              >
                {isAudioEnabled ? (
                  <Volume2 className="w-4 h-4 text-primary" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>
              
              <Button
                onClick={sendMessage}
                disabled={!message.trim()}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-xs text-text-label mt-2 text-center">
              {isListening ? "Listening..." : "Voice & text support available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBotDrawer;