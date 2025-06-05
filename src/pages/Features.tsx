
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  MessageSquare, 
  Video, 
  Headphones, 
  Settings, 
  Clock,
  CheckCircle,
  Star,
  Mic,
  Languages
} from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: Languages,
      title: "50+ Languages Supported",
      description: "Comprehensive language coverage including major world languages, regional dialects, and emerging languages.",
      color: "from-blue-500 to-blue-600",
      highlights: ["Real-time detection", "Context awareness", "Dialect support"]
    },
    {
      icon: Zap,
      title: "Ultra-Low Latency",
      description: "Industry-leading translation speed with less than 200ms delay for natural conversation flow.",
      color: "from-yellow-500 to-orange-500",
      highlights: ["< 200ms delay", "Real-time processing", "Seamless experience"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "End-to-end encryption, Firebase authentication, and GDPR compliance for maximum data protection.",
      color: "from-green-500 to-green-600",
      highlights: ["E2E encryption", "GDPR compliant", "Zero-trust security"]
    },
    {
      icon: Video,
      title: "HD Video Calls",
      description: "Crystal-clear video quality with adaptive bitrate and automatic background noise reduction.",
      color: "from-purple-500 to-purple-600",
      highlights: ["1080p quality", "Noise reduction", "Auto-optimization"]
    }
  ];

  const additionalFeatures = [
    {
      icon: MessageSquare,
      title: "Live Chat Translation",
      description: "Instant text translation alongside voice for comprehensive communication."
    },
    {
      icon: Users,
      title: "Multi-User Calls",
      description: "Support for up to 50 participants with individual language preferences."
    },
    {
      icon: Headphones,
      title: "Audio Enhancement",
      description: "AI-powered noise cancellation and echo reduction for crystal-clear audio."
    },
    {
      icon: Settings,
      title: "Custom Preferences",
      description: "Personalized translation settings, voice selection, and language priorities."
    },
    {
      icon: Clock,
      title: "Conversation History",
      description: "Secure storage and searchable history of all translated conversations."
    },
    {
      icon: Mic,
      title: "Voice Cloning",
      description: "Preserve your natural voice tone and speaking style in translations."
    }
  ];

  const languages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", "Russian",
    "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Turkish", "Dutch",
    "Polish", "Swedish", "Norwegian", "Danish", "Finnish", "Greek", "Hebrew",
    "Thai", "Vietnamese", "Indonesian", "Malay", "Filipino", "Ukrainian",
    "Czech", "Hungarian", "Romanian", "Bulgarian", "Croatian", "Slovak"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Powerful <span className="gradient-text">Features</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Everything you need for seamless global communication, powered by 
            cutting-edge AI and designed for real-world conversations.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Core Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.highlights.map((highlight, hIndex) => (
                      <Badge key={hIndex} variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Enhanced Capabilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Language Support */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Supported Languages</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive language support with continuous updates and improvements
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {languages.map((language, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-blue-300 dark:hover:border-blue-600 transition-colors border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    {language}
                  </Badge>
                ))}
              </div>
              <div className="text-center mt-6">
                <Badge className="lingo-gradient text-white">
                  <Star className="h-3 w-3 mr-1" />
                  50+ Languages & Growing
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
        <div className="container mx-auto">
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl font-bold mb-6">Technical Excellence</h2>
            <p className="text-xl text-blue-100 dark:text-blue-200 max-w-2xl mx-auto">
              Built with industry-leading technology for reliability and performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2">&lt; 200ms</div>
              <div className="text-blue-100 dark:text-blue-200">Translation Latency</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100 dark:text-blue-200">Uptime Guarantee</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100 dark:text-blue-200">Supported Languages</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2">E2E</div>
              <div className="text-blue-100 dark:text-blue-200">Encryption</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Experience LingoLive?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users worldwide who are already breaking language barriers
          </p>
          <Link to="/signup">
            <Button size="lg" className="lingo-gradient text-white border-0 text-lg px-8 py-6">
              <Globe className="mr-2 h-5 w-5" />
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;
