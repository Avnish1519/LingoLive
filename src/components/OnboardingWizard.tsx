
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Globe, 
  Mic, 
  Volume2, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Shield,
  Zap,
  Heart,
  Play,
  Coffee,
  Handshake
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OnboardingWizardProps {
  onComplete: () => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [userPreferences, setUserPreferences] = useState({
    nativeLanguage: '',
    targetLanguages: [] as string[],
    useCase: '',
    voiceTested: false
  });

  const languages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", 
    "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Russian"
  ];

  const culturalTips = [
    {
      language: "Japanese",
      tip: "Always bow slightly when greeting, even in video calls",
      icon: Users,
      color: "from-red-500 to-pink-500"
    },
    {
      language: "Spanish",
      tip: "Personal space is smaller; closer conversation is normal",
      icon: Heart,
      color: "from-orange-500 to-red-500"
    },
    {
      language: "German",
      tip: "Punctuality is crucial; arrive exactly on time",
      icon: Coffee,
      color: "from-gray-500 to-gray-600"
    },
    {
      language: "French",
      tip: "Start meetings with polite greetings and small talk",
      icon: Handshake,
      color: "from-blue-500 to-purple-500"
    }
  ];

  const steps = [
    {
      title: "Welcome to LingoLive!",
      subtitle: "Let's personalize your experience",
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
            <Globe className="h-10 w-10 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Break Language Barriers</h3>
            <p className="text-muted-foreground">
              In just 3 minutes, we'll set up your perfect translation experience
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Secure</p>
            </div>
            <div>
              <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Fast</p>
            </div>
            <div>
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Easy</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Choose Your Languages",
      subtitle: "What languages will you be using?",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Your Native Language</label>
            <Select 
              value={userPreferences.nativeLanguage} 
              onValueChange={(value) => setUserPreferences(prev => ({ ...prev, nativeLanguage: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your native language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang.toLowerCase()}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-3">Languages You Want to Communicate In</label>
            <div className="grid grid-cols-2 gap-2">
              {languages.filter(lang => lang.toLowerCase() !== userPreferences.nativeLanguage).map((lang) => (
                <Button
                  key={lang}
                  variant={userPreferences.targetLanguages.includes(lang.toLowerCase()) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setUserPreferences(prev => ({
                      ...prev,
                      targetLanguages: prev.targetLanguages.includes(lang.toLowerCase())
                        ? prev.targetLanguages.filter(l => l !== lang.toLowerCase())
                        : [...prev.targetLanguages, lang.toLowerCase()]
                    }));
                  }}
                  className="text-xs"
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Cultural Tips",
      subtitle: "Learn some cultural insights",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Here are some cultural tips for your selected languages:
          </p>
          {culturalTips.slice(0, 3).map((tip, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${tip.color} rounded-lg flex items-center justify-center`}>
                    <tip.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2 text-xs">{tip.language}</Badge>
                    <p className="text-sm">{tip.tip}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    },
    {
      title: "Test Your Voice",
      subtitle: "Let's make sure everything sounds perfect",
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
            <Mic className="h-10 w-10 text-white" />
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">Voice Clone Preview</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Say: "Hello, this is a test of my voice for LingoLive"
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              className="w-full lingo-gradient text-white"
              onClick={() => {
                toast({
                  title: "Recording Started",
                  description: "Speak clearly into your microphone...",
                });
                setTimeout(() => {
                  setUserPreferences(prev => ({ ...prev, voiceTested: true }));
                  toast({
                    title: "Voice Captured!",
                    description: "Your voice clone is ready for translations.",
                  });
                }, 3000);
              }}
            >
              <Mic className="mr-2 h-4 w-4" />
              {userPreferences.voiceTested ? "Re-record Voice" : "Start Recording"}
            </Button>
            
            {userPreferences.voiceTested && (
              <Button variant="outline" className="w-full">
                <Play className="mr-2 h-4 w-4" />
                Play Voice Preview
              </Button>
            )}
          </div>
          
          {userPreferences.voiceTested && (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Voice clone ready!</span>
            </div>
          )}
        </div>
      )
    }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return userPreferences.nativeLanguage && userPreferences.targetLanguages.length > 0;
      case 2: return true;
      case 3: return userPreferences.voiceTested;
      default: return false;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <CardTitle className="text-lg">{steps[currentStep].title}</CardTitle>
          <p className="text-sm text-muted-foreground">{steps[currentStep].subtitle}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {steps[currentStep].content}
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="lingo-gradient text-white"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingWizard;
