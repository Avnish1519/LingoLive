import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Video, 
  Plus, 
  Settings, 
  Globe, 
  Users, 
  Clock, 
  MessageSquare, 
  Mic, 
  MicOff,
  VideoIcon,
  VideoOff,
  LogOut,
  History,
  Languages,
  Phone,
  PhoneOff,
  Download,
  Play,
  Rewind,
  FileText,
  Headphones,
  Zap,
  Sparkles,
  BookOpen,
  Building,
  GraduationCap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { toast } = useToast();
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [targetLanguage, setTargetLanguage] = useState('spanish');
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [selectedCall, setSelectedCall] = useState<any>(null);
  
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

  const startCall = () => {
    setIsInCall(true);
    toast({
      title: "Call Started!",
      description: `Translation active: ${currentLanguage} ↔ ${targetLanguage}`,
    });
  };

  const endCall = () => {
    setIsInCall(false);
    toast({
      title: "Call Ended",
      description: "Translation session saved to history with recording available.",
    });
  };

  const joinCall = (callId: string) => {
    toast({
      title: "Joining Call",
      description: `Connecting to call ${callId}...`,
    });
    setIsInCall(true);
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg lingo-gradient">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">LingoLive</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
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
              <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
              <p className="text-xl text-muted-foreground">Ready to connect with the world?</p>
            </div>

            {/* Language Selection */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Languages className="mr-2 h-5 w-5" />
                  Language Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Language</label>
                    <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                      <SelectTrigger>
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
                    <label className="text-sm font-medium mb-2 block">Target Language</label>
                    <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                      <SelectTrigger>
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

            {/* Call Interface */}
            {!isInCall ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg card-hover">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Start New Call</h3>
                    <p className="text-muted-foreground mb-6">Begin a new translated video call</p>
                    <Button onClick={startCall} className="w-full lingo-gradient text-white border-0">
                      <Plus className="mr-2 h-4 w-4" />
                      Start Call
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg card-hover">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Join Call</h3>
                    <p className="text-muted-foreground mb-4">Enter a call ID to join</p>
                    <div className="space-y-4">
                      <Input placeholder="Enter call ID" />
                      <Button onClick={() => joinCall("ABC123")} variant="outline" className="w-full">
                        Join Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Badge className="lingo-gradient text-white mb-4">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      Live Translation Active
                    </Badge>
                    <h3 className="text-xl font-bold">
                      {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)} ↔ {targetLanguage.charAt(0).toUpperCase() + targetLanguage.slice(1)}
                    </h3>
                  </div>

                  {/* Mock Video Interface */}
                  <div className="bg-gray-900 rounded-lg p-8 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <div className="text-center text-white">
                          <VideoIcon className="h-12 w-12 mx-auto mb-2 opacity-70" />
                          <p className="text-sm">You</p>
                        </div>
                      </div>
                      <div className="aspect-video bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <div className="text-center text-white">
                          <VideoIcon className="h-12 w-12 mx-auto mb-2 opacity-70" />
                          <p className="text-sm">Remote</p>
                        </div>
                      </div>
                    </div>

                    {/* Live Translation Display */}
                    <div className="bg-black/50 text-white p-4 rounded-lg mb-4">
                      <div className="space-y-2">
                        <p className="text-sm opacity-75">You: "Hello, how are you today?"</p>
                        <p className="text-sm text-blue-300">→ "Hola, ¿cómo estás hoy?"</p>
                      </div>
                    </div>
                  </div>

                  {/* Call Controls */}
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant={isMuted ? "destructive" : "outline"}
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant={!isVideoOn ? "destructive" : "outline"}
                      size="icon"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <VideoIcon className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={endCall}
                      className="px-6"
                    >
                      <PhoneOff className="mr-2 h-4 w-4" />
                      End Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Post-Call Features */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Post-Call AI Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {postCallFeatures.map((feature, index) => (
                    <Card key={index} className="card-hover border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                        <p className="text-xs text-blue-600 mb-4">{feature.useCase}</p>
                        <Button 
                          size="sm" 
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
                          onClick={() => handlePostCallFeature(feature.title.toLowerCase().includes('dubbing') ? 'dubbing' : feature.title.toLowerCase().includes('rewind') ? 'rewind' : 'summary')}
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
                    <Card key={call.id} className="bg-gradient-to-r from-gray-50 to-blue-50 border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>{call.participant.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{call.participant}</p>
                              <p className="text-sm text-muted-foreground">{call.languages}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{call.duration}</p>
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
