
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, X, Globe, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PhraseData {
  phrase: string;
  pronunciation: string;
  meaning: string;
  language: string;
  culturalTip: string;
}

const PhraseOfTheDay: React.FC = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(true);
  const [phraseData, setPhraseData] = useState<PhraseData>({
    phrase: "¡Que tengas un buen día!",
    pronunciation: "keh TEHN-gahs oon bwehn DEE-ah",
    meaning: "Have a good day!",
    language: "Spanish",
    culturalTip: "In Spanish-speaking cultures, this warm farewell shows genuine care for the person's wellbeing."
  });

  const phrases = [
    {
      phrase: "¡Que tengas un buen día!",
      pronunciation: "keh TEHN-gahs oon bwehn DEE-ah",
      meaning: "Have a good day!",
      language: "Spanish",
      culturalTip: "In Spanish-speaking cultures, this warm farewell shows genuine care for the person's wellbeing."
    },
    {
      phrase: "頑張って！",
      pronunciation: "ganbatte",
      meaning: "Good luck! / Do your best!",
      language: "Japanese",
      culturalTip: "This encouraging phrase is deeply rooted in Japanese work culture and shows support."
    },
    {
      phrase: "Bonne chance!",
      pronunciation: "bun shahnss",
      meaning: "Good luck!",
      language: "French",
      culturalTip: "French speakers often use this before important events or challenges."
    }
  ];

  useEffect(() => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setPhraseData(randomPhrase);
  }, []);

  const playPronunciation = () => {
    toast({
      title: "Playing Pronunciation",
      description: `"${phraseData.pronunciation}"`,
    });
  };

  if (!isVisible) return null;

  return (
    <Card className="fixed top-20 right-4 w-80 z-40 border-0 shadow-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-fade-in">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              Phrase of the Day
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white/20 p-1 h-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-bold mb-1">{phraseData.phrase}</h3>
            <p className="text-sm opacity-90">{phraseData.meaning}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={playPronunciation}
              className="text-white hover:bg-white/20 text-xs p-2"
            >
              <Volume2 className="h-3 w-3 mr-1" />
              {phraseData.pronunciation}
            </Button>
          </div>
          
          <div className="text-xs opacity-90">
            <strong>Cultural Tip:</strong> {phraseData.culturalTip}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhraseOfTheDay;
