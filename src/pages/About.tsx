
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Globe, Users, Heart, Target, Award, Lightbulb, ArrowRight } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former Google Translate engineer with 10+ years in NLP and machine translation.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder", 
      bio: "AI researcher and full-stack developer specializing in real-time communication systems.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      name: "Dr. Yuki Tanaka",
      role: "Head of AI Research",
      bio: "PhD in Computational Linguistics, former research scientist at OpenAI and DeepMind.",
      gradient: "from-green-500 to-green-600"
    },
    {
      name: "Elena Volkov",
      role: "VP of Engineering",
      bio: "Scaled engineering teams at Zoom and Discord, expert in WebRTC and distributed systems.",
      gradient: "from-pink-500 to-pink-600"
    }
  ];

  const values = [
    {
      icon: Globe,
      title: "Global Connection",
      description: "We believe language should never be a barrier to human connection and understanding."
    },
    {
      icon: Heart,
      title: "Privacy First",
      description: "Your conversations are private. We use local processing and end-to-end encryption."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously pushing the boundaries of what's possible with AI and real-time communication."
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making advanced translation technology accessible to everyone, everywhere."
    }
  ];

  const milestones = [
    { year: "2023", event: "LingoLive founded with initial AI research" },
    { year: "2024", event: "First MVP launched with 10 languages" },
    { year: "2024", event: "Reached 10,000 beta users worldwide" },
    { year: "2024", event: "Expanded to 50+ languages with Ollama integration" },
    { year: "2025", event: "Planning enterprise solutions and mobile apps" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">LingoLive</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            We're on a mission to break down language barriers and connect the world 
            through real-time AI-powered translation technology.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
            <Card className="border-0 shadow-xl">
              <CardContent className="p-12">
                <p className="text-2xl text-muted-foreground leading-relaxed">
                  "To create a world where language is never a barrier to human connection, 
                  understanding, and collaboration. We envision real-time translation that's 
                  so natural and seamless, it feels like magic."
                </p>
                <div className="mt-8 flex items-center justify-center">
                  <div className="w-12 h-12 lingo-gradient rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{milestone.year}</span>
                    </div>
                  </div>
                  <Card className="flex-1 card-hover border-0 shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-lg">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Recognition & Awards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="card-hover border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">TechCrunch Disrupt</h3>
                <p className="text-muted-foreground">Finalist 2024</p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">AI Innovation Award</h3>
                <p className="text-muted-foreground">Winner 2024</p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Product Hunt</h3>
                <p className="text-muted-foreground">#1 Product of the Day</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Help us break down language barriers and connect the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                Start Using LingoLive
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
