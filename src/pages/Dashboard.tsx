import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Plus, 
  Settings, 
  Globe, 
  Users, 
  MessageSquare, 
  LogOut,
  History,
  Languages,
  Download,
  FileText,
  Headphones,
  Zap,
  Sparkles,
  BookOpen,
  Building,
  GraduationCap,
  Brain,
  Rewind
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PhraseOfTheDay from '@/components/PhraseOfTheDay';
import OnboardingWizard from '@/components/OnboardingWizard';
import MemoryPackModal from '@/components/MemoryPackModal';
import VideoCall from '@/components/VideoCall';

const Dashboard = () => {
  const { toast } = useToast();
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [targetLanguage, setTargetLanguage] = useState('spanish');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('onboardingCompleted');
  });
  const [showMemoryPack, setShowMemoryPack] = useState<any>(null);
  
  const recentCalls = [
    {
      id: 1,
      participant: "Maria Garcia",
      languages: "English ↔ Spanish",
      duration: "45 min",
      time: "2 hours ago",
      status: "completed",
      recordingAvailable: true,
      summary: "Discussed quarterly sales targets, new market expansion in Latin America, and upcoming product launches. Key decisions: Budget approval for Mexico office, Q4 marketing campaign timeline finalized."
    },
    {
      id: 2,
      participant: "Yuki Tanaka",
      languages: "English ↔ Japanese",
      duration: "23 min",
      time: "1 day ago",
      status: "completed",
      recordingAvailable: true,
      summary: "Technical review of mobile app localization. Covered UI/UX adaptations for Japanese market, cultural considerations, and testing protocols. Action items: Implement right-to-left text support, schedule user testing in Tokyo."
    },
    {
      id: 3,
      participant: "Pierre Dubois",
      languages: "English ↔ French",
      duration: "67 min",
      time: "3 days ago",
      status: "completed",
      recordingAvailable: true,
      summary: "Strategic partnership discussion with French distributors. Negotiated pricing models, distribution channels, and marketing collaboration. Outcome: 3-year partnership agreement draft prepared, legal review scheduled."
    }
  ];

  const activeUsers = [
    { name: "Sarah Chen", language: "Chinese", status: "online" },
    { name: "Alex Mueller", language: "German", status: "online" },
    { name: "Priya Sharma", language: "Hindi", status: "in-call" },
    { name: "João Silva", language: "Portuguese", status: "online" }
  ];

  const languages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", 
    "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Russian"
  ];

  const postCallFeatures = [
    {
      title: "AI Voice Dubbing",
      description: "Get your call dubbed in any language using your AI-cloned voice",
      icon: Headphones,
      color: "from-purple-500 to-pink-500",
      action: "Generate Dubbed Video",
      useCase: "Perfect for content creators and international presentations"
    },
    {
      title: "Rewind & Translate",
      description: "Replay any moment from your call translated into different languages",
      icon: Rewind,
      color: "from-blue-500 to-cyan-500",
      action: "Access Rewind Mode",
      useCase: "Great for training videos and meeting reviews"
    },
    {
      title: "Smart Summaries",
      description: "AI-powered call summaries with key topics and action items",
      icon: FileText,
      color: "from-green-500 to-teal-500",
      action: "View Summary",
      useCase: "Essential for business meetings and documentation"
    },
    {
      title: "Memory Pack",
      description: "Get post-call learning materials with vocabulary and cultural tips",
      icon: Brain,
      color: "from-orange-500 to-red-500",
      action: "Generate Memory Pack",
      useCase: "Helps you learn and reflect after each conversation"
    }
  ];

  const useCaseCards = [
    {
      title: "Online Creators",
      description: "Create multilingual content effortlessly",
      icon: Sparkles,
      color: "from-orange-500 to-red-500",
      features: ["AI voice dubbing", "Content localization", "Global reach"]
    },
    {
      title: "Training Videos",
      description: "Make learning accessible worldwide",
      icon: GraduationCap,
      color: "from-indigo-500 to-purple-500",
      features: ["Multi-language training", "Rewind & review", "Progress tracking"]
    },
    {
      title: "International Meetings",
      description: "Seamless global collaboration",
      icon: Building,
      color: "from-teal-500 to-green-500",
      features: ["Real-time translation", "Meeting summaries", "Action items"]
    }
  ];

  const completeOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setShowOnboarding(false);
    toast({
      title: "Welcome to LingoLive!",
      description: "Your personalized translation experience is ready.",
    });
  };

  const startCall = () => {
    setShowVideoCall(true);
    toast({
      title: "Starting WebRTC Call!",
      description: `Translation active: ${currentLanguage} ↔ ${targetLanguage}`,
    });
  };

  const endCall = () => {
    setShowVideoCall(false);
    toast({
      title: "Call Ended",
      description: "Translation session saved to history.",
    });
  };

  const handlePostCallFeature = (feature: string, callId?: number) => {
    if (feature === "dubbing") {
      toast({
        title: "AI Dubbing Started",
        description: "Generating dubbed video in your selected language...",
      });
    } else if (feature === "rewind") {
      toast({
        title: "Rewind Mode Activated",
        description: "You can now replay and translate any moment from your call.",
      });
    } else if (feature === "summary") {
      if (callId) {
        const call = recentCalls.find(c => c.id === callId);
        setSelectedCall(call);
      }
    } else if (feature === "memory pack") {
      if (callId) {
        const call = recentCalls.find(c => c.id === callId);
        setShowMemoryPack(call);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {showOnboarding && <OnboardingWizard onComplete={completeOnboarding} />}
      {showMemoryPack && <MemoryPackModal callData={showMemoryPack} onClose={() => setShowMemoryPack(null)} />}
      <PhraseOfTheDay />

      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg lingo-gradient">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">LingoLive</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Call Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 dark:text-white">Welcome back!</h1>
              <p className="text-xl text-muted-foreground">Ready to connect with the world?</p>
            </div>

            {/* Language Selection */}
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Languages className="mr-2 h-5 w-5" />
                  Language Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block dark:text-gray-300">Your Language</label>
                    <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang.toLowerCase()}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block dark:text-gray-300">Target Language</label>
                    <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang.toLowerCase()}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Call Interface */}
            {showVideoCall ? (
              <VideoCall onCallEnd={endCall} />
            ) : (
              <Card className="border-0 shadow-lg card-hover">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Start WebRTC Video Call</h3>
                  <p className="text-muted-foreground mb-6">Begin a new real-time translated video call with WebRTC</p>
                  <Button onClick={startCall} className="w-full lingo-gradient text-white border-0">
                    <Plus className="mr-2 h-4 w-4" />
                    Start Call
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Post-Call Features */}
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Zap className="mr-2 h-5 w-5" />
                  Post-Call AI Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {postCallFeatures.map((feature, index) => (
                    <Card key={index} className="card-hover border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800">
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold mb-2 dark:text-white">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mb-4">{feature.useCase}</p>
                        <Button 
                          size="sm" 
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
                          onClick={() => handlePostCallFeature(feature.title.toLowerCase().includes('dubbing') ? 'dubbing' : feature.title.toLowerCase().includes('rewind') ? 'rewind' : feature.title.toLowerCase().includes('memory') ? 'memory pack' : 'summary')}
                        >
                          {feature.action}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Use Case Cards */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Perfect For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {useCaseCards.map((useCase, index) => (
                    <Card key={index} className="card-hover border-0 shadow-md">
                      <CardContent className="p-6">
                        <div className={`w-10 h-10 bg-gradient-to-r ${useCase.color} rounded-lg flex items-center justify-center mb-4`}>
                          <useCase.icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{useCase.description}</p>
                        <div className="space-y-1">
                          {useCase.features.map((feature, fIndex) => (
                            <div key={fIndex} className="flex items-center text-xs text-green-600">
                              <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Calls with Enhanced Features */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="mr-2 h-5 w-5" />
                  Recent Calls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCalls.map((call) => (
                    <Card key={call.id} className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900 border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>{call.participant.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium dark:text-white">{call.participant}</p>
                              <p className="text-sm text-muted-foreground">{call.languages}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium dark:text-white">{call.duration}</p>
                            <p className="text-xs text-muted-foreground">{call.time}</p>
                          </div>
                        </div>
                        
                        {call.recordingAvailable && (
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs"
                              onClick={() => handlePostCallFeature('dubbing', call.id)}
                            >
                              <Headphones className="h-3 w-3 mr-1" />
                              AI Dub
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs"
                              onClick={() => handlePostCallFeature('rewind', call.id)}
                            >
                              <Rewind className="h-3 w-3 mr-1" />
                              Rewind
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs"
                              onClick={() => handlePostCallFeature('summary', call.id)}
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              Summary
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
                              onClick={() => handlePostCallFeature('memory pack', call.id)}
                            >
                              <Brain className="h-3 w-3 mr-1" />
                              Memory Pack
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call Summary Modal/Section */}
            {selectedCall && (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Call Summary - {selectedCall.participant}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedCall(null)}
                    >
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Duration: {selectedCall.duration}</span>
                      <span>Languages: {selectedCall.languages}</span>
                      <span>{selectedCall.time}</span>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold mb-2 text-blue-700">Summary</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedCall.summary}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 text-white">
                        <Download className="h-3 w-3 mr-1" />
                        Export Summary
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Users */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.language}</p>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        user.status === 'online' ? 'bg-green-500' : 
                        user.status === 'in-call' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Stats */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Calls</span>
                  <span className="font-bold text-lg text-purple-600">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Languages Used</span>
                  <span className="font-bold text-lg text-blue-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Hours</span>
                  <span className="font-bold text-lg text-green-600">89.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">AI Dubs Created</span>
                  <span className="font-bold text-lg text-orange-600">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="font-bold text-lg text-pink-600">23 calls</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start hover:bg-purple-50">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat History
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-blue-50">
                  <Headphones className="mr-2 h-4 w-4" />
                  Voice Cloning Setup
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-green-50">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Link to="/features">
                  <Button variant="outline" className="w-full justify-start hover:bg-orange-50">
                    <Globe className="mr-2 h-4 w-4" />
                    View Features
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
