
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import { Globe, Mic, Languages, Shield, Zap, Users, ArrowRight, Play, MessageSquare, Video } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Break Language
              <span className="gradient-text block">Barriers in Real-Time</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              AI-powered live translation for video calls. Speak naturally, connect globally. 
              Experience seamless conversations in 50+ languages.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
            <Link to="/signup">
              <Button size="lg" className="lingo-gradient text-white border-0 text-lg px-8 py-6">
                <Play className="mr-2 h-5 w-5" />
                Start Translating
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Demo Preview Mockup */}
          <div className="relative max-w-4xl mx-auto animate-float">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm ml-4">LingoLive Video Call</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Left participant */}
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <div className="text-center text-white">
                          <Video className="h-12 w-12 mx-auto mb-2 opacity-70" />
                          <p className="text-sm">Sarah (English)</p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-black/80 text-white text-sm p-2 rounded">
                        "Hello! How are you today?"
                      </div>
                    </div>
                    
                    {/* Right participant */}
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <div className="text-center text-white">
                          <Video className="h-12 w-12 mx-auto mb-2 opacity-70" />
                          <p className="text-sm">Marie (French)</p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-black/80 text-white text-sm p-2 rounded">
                        "Bonjour! Comment allez-vous aujourd'hui?"
                      </div>
                    </div>
                  </div>
                  
                  {/* Translation indicator */}
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Live Translation Active</span>
                    <Languages className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose LingoLive?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge AI technology meets intuitive design for seamless global communication
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Real-Time Translation</h3>
                <p className="text-muted-foreground">
                  Instant AI-powered translation with less than 200ms latency. 
                  Natural conversations without delays.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Private & Secure</h3>
                <p className="text-muted-foreground">
                  End-to-end encryption with Firebase authentication. 
                  Your conversations stay completely private.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">50+ Languages</h3>
                <p className="text-muted-foreground">
                  Comprehensive language support powered by advanced LLaMA 3 
                  models via Ollama infrastructure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Connect the World?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users already breaking language barriers with LingoLive
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              <Users className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg lingo-gradient">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">LingoLive</span>
          </div>
          <p className="text-gray-400 mb-6">Breaking language barriers, one conversation at a time.</p>
          <div className="flex justify-center space-x-6">
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            <Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
