import React, { useState } from 'react';
import { FileText, Lock, Send, AlertTriangle, Camera, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const ReportScreen = () => {
  const [incidentType, setIncidentType] = useState('');
  const [reportText, setReportText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [includeLocation, setIncludeLocation] = useState(false);
  const { toast } = useToast();

  const incidentTypes = [
    { value: 'physical', label: 'Physical Violence' },
    { value: 'emotional', label: 'Emotional Abuse' },
    { value: 'sexual', label: 'Sexual Violence' },
    { value: 'financial', label: 'Financial Abuse' },
    { value: 'stalking', label: 'Stalking/Harassment' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmitReport = () => {
    if (!incidentType || !reportText.trim()) {
      toast({
        title: "Incomplete Report",
        description: "Please select an incident type and provide details.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement actual report submission
    // - Encrypt report data
    // - Submit to secure backend
    // - Generate report ID
    // - Store locally if offline
    
    toast({
      title: "Report Submitted",
      description: "Your report has been securely submitted and encrypted.",
    });

    // Reset form
    setIncidentType('');
    setReportText('');
    setIsAnonymous(true);
    setIncludeLocation(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-card">
            <FileText className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-text-heading mb-2">Anonymous Reporting</h2>
        <p className="text-text-body">Your report is encrypted and secure. You are not alone.</p>
      </div>

      {/* Privacy Notice */}
      <Card className="border-primary/50 bg-primary/5 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-text-heading text-sm mb-1">
                Your Privacy is Protected
              </h4>
              <p className="text-text-body text-xs">
                All reports are encrypted end-to-end. Your identity remains anonymous unless you choose otherwise.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-text-heading">Incident Report</CardTitle>
          <CardDescription>
            Provide as much detail as you feel comfortable sharing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Incident Type */}
          <div className="space-y-3">
            <Label className="text-text-heading font-medium">Type of Incident *</Label>
            <RadioGroup value={incidentType} onValueChange={setIncidentType}>
              {incidentTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <Label htmlFor={type.value} className="text-text-body">
                    {type.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Report Details */}
          <div className="space-y-3">
            <Label htmlFor="report-details" className="text-text-heading font-medium">
              Incident Details *
            </Label>
            <Textarea
              id="report-details"
              placeholder="Describe what happened. Include dates, times, and any relevant details you feel comfortable sharing..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              className="min-h-32 bg-input border-border text-text-body"
            />
            <p className="text-text-label text-xs">
              This information will be encrypted and stored securely.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked === true)}
              />
              <Label htmlFor="anonymous" className="text-text-body text-sm">
                Keep this report anonymous
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="location"
                checked={includeLocation}
                onCheckedChange={(checked) => setIncludeLocation(checked === true)}
              />
              <Label htmlFor="location" className="text-text-body text-sm">
                Include approximate location (helpful for authorities)
              </Label>
            </div>
          </div>

          {/* Evidence Options */}
          <div className="space-y-3">
            <Label className="text-text-heading font-medium">Add Evidence (Optional)</Label>
            <div className="flex gap-3">
              <Button variant="discrete" size="sm" className="flex-1">
                <Camera className="w-4 h-4 mr-2" />
                Photo
              </Button>
              <Button variant="discrete" size="sm" className="flex-1">
                <Mic className="w-4 h-4 mr-2" />
                Audio
              </Button>
            </div>
            <p className="text-text-label text-xs">
              Evidence is encrypted and only accessible by authorized support staff.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              onClick={handleSubmitReport}
              variant="sos"
              size="lg"
              className="w-full"
              disabled={!incidentType || !reportText.trim()}
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Secure Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Notice */}
      <Card className="border-warning/50 bg-warning/5 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-text-heading text-sm mb-1">
                Need Immediate Help?
              </h4>
              <p className="text-text-body text-xs mb-3">
                If you're in immediate danger, don't wait - call emergency services or use the SOS feature.
              </p>
              <Button variant="danger" size="sm">
                Emergency SOS
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportScreen;