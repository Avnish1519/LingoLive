
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mic, MessageSquare, Languages, Volume2, Shield, Database, Cpu, Cloud, ArrowRight, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Mic,
      title: "Capture Voice",
      description: "High-quality audio capture using Web Audio API with noise reduction and echo cancellation.",
      tech: "Whisper ASR"
    },
    {
      icon: MessageSquare,
      title: "Transcribe Speech",
      description: "Advanced speech-to-text conversion with context awareness and speaker identification.",
      tech: "OpenAI Whisper"
    },
    {
      icon: Languages,
      title: "Translate Text",
      description: "Local LLM processing for accurate, context-aware translation preserving meaning and tone.",
      tech: "LLaMA 3 + Ollama"
    },
    {
      icon: Volume2,
      title: "Generate Speech",
      description: "Natural-sounding voice synthesis with emotion and accent preservation.",
      tech: "Coqui TTS / Google TTS"
    }
  ];

  const techStack = [
    {
      category: "Frontend",
      icon: Cloud,
      technologies: ["React", "TypeScript", "Tailwind CSS", "WebRTC"]
    },
    {
      category: "Authentication",
      icon: Shield,
      technologies: ["Firebase Auth", "Google OAuth", "Email/Password"]
    },
    {
      category: "Database",
      icon: Database,
      technologies: ["Firebase Firestore", "Real-time Sync", "Chat History"]
    },
    {
      category: "AI Processing",
      icon: Cpu,
      technologies: ["Ollama", "LLaMA 3", "Whisper ASR", "Coqui TTS"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            How <span className="gradient-text">LingoLive</span> Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Discover the cutting-edge technology that powers real-time language translation 
            in video calls, making global communication effortless and natural.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Translation Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="card-hover border-0 shadow-lg h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-sm font-medium text-primary mb-2">{step.tech}</div>
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-blue-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Technical Architecture</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                      <tech.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold">{tech.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {tech.technologies.map((technology, techIndex) => (
                      <li key={techIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {technology}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Details */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Integration & Security</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-blue-500" />
                  Firebase Integration
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <strong>Authentication:</strong> Secure user login with Google OAuth and email/password options
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <strong>Real-time Database:</strong> Instant chat synchronization across all participants
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <strong>Cloud Storage:</strong> Secure storage of translation history and user preferences
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Cpu className="h-6 w-6 mr-2 text-purple-500" />
                  AI Processing
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <strong>Local LLM:</strong> Ollama-powered LLaMA 3 for privacy-focused translation
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <strong>Speech Recognition:</strong> OpenAI Whisper for accurate multi-language transcription
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <strong>Voice Synthesis:</strong> Coqui TTS for natural-sounding speech output
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience the Technology
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ready to see LingoLive in action? Start your first translated conversation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6">
                View All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
