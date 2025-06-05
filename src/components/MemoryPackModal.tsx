
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Mail, 
  MessageSquare, 
  Volume2, 
  Star,
  Clock,
  Globe,
  Brain,
  X,
  Share
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MemoryPackModalProps {
  callData: {
    id: number;
    participant: string;
    duration: string;
    languages: string;
    summary: string;
  };
  onClose: () => void;
}

const MemoryPackModal: React.FC<MemoryPackModalProps> = ({ callData, onClose }) => {
  const { toast } = useToast();
  const [selectedDelivery, setSelectedDelivery] = useState<'email' | 'whatsapp' | 'download'>('email');

  const keyTerms = [
    { term: "Quarterly targets", translation: "Objetivos trimestrales", importance: "high" },
    { term: "Market expansion", translation: "Expansión del mercado", importance: "high" },
    { term: "Budget approval", translation: "Aprobación del presupuesto", importance: "medium" },
    { term: "Product launches", translation: "Lanzamientos de productos", importance: "medium" },
    { term: "Marketing campaign", translation: "Campaña de marketing", importance: "low" }
  ];

  const culturalInsights = [
    {
      tip: "In Latin American business culture, relationship-building often comes before discussing numbers",
      icon: Globe,
      category: "Business Etiquette"
    },
    {
      tip: "Use 'Usted' form when speaking with senior executives in Spanish-speaking countries",
      icon: Star,
      category: "Language Formality"
    },
    {
      tip: "Meetings may start with casual conversation about family and personal life",
      icon: MessageSquare,
      category: "Social Norms"
    }
  ];

  const generateMemoryPack = () => {
    toast({
      title: "Memory Pack Generated!",
      description: `Your post-call memory pack will be sent via ${selectedDelivery}`,
    });
    onClose();
  };

  const playTerm = (term: string) => {
    toast({
      title: "Playing Pronunciation",
      description: `"${term}"`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-purple-600" />
              Call Memory Pack
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {callData.participant} • {callData.duration} • {callData.languages}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="summary" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
              <TabsTrigger value="cultural">Cultural Tips</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                    Call Summary
                  </h3>
                  <p className="text-sm leading-relaxed">{callData.summary}</p>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-2">Key Action Items:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Budget approval for Mexico office</li>
                      <li>• Q4 marketing campaign timeline finalized</li>
                      <li>• Schedule follow-up meeting for next week</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vocabulary" className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-bold flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-green-600" />
                  Key Terms & Translations
                </h3>
                {keyTerms.map((item, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold">{item.term}</h4>
                            <Badge 
                              variant={item.importance === 'high' ? 'destructive' : item.importance === 'medium' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {item.importance}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.translation}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => playTerm(item.term)}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cultural" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center">
                  <Star className="mr-2 h-5 w-5 text-orange-600" />
                  Cultural Insights for Next Time
                </h3>
                {culturalInsights.map((insight, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <insight.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2 text-xs">{insight.category}</Badge>
                          <p className="text-sm">{insight.tip}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="delivery" className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Choose Delivery Method</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card 
                    className={`cursor-pointer border-2 ${selectedDelivery === 'email' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => setSelectedDelivery('email')}
                  >
                    <CardContent className="p-4 text-center">
                      <Mail className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-xs text-muted-foreground">PDF attachment</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer border-2 ${selectedDelivery === 'whatsapp' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                    onClick={() => setSelectedDelivery('whatsapp')}
                  >
                    <CardContent className="p-4 text-center">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h4 className="font-semibold">WhatsApp</h4>
                      <p className="text-xs text-muted-foreground">Instant message</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer border-2 ${selectedDelivery === 'download' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                    onClick={() => setSelectedDelivery('download')}
                  >
                    <CardContent className="p-4 text-center">
                      <Download className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <h4 className="font-semibold">Download</h4>
                      <p className="text-xs text-muted-foreground">PDF file</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={generateMemoryPack}
                    className="flex-1 lingo-gradient text-white"
                  >
                    Generate Memory Pack
                  </Button>
                  <Button variant="outline">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemoryPackModal;
