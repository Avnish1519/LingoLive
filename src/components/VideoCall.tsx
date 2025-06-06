
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Copy,
  Users
} from 'lucide-react';
import { WebRTCService } from '@/services/webrtc';
import { useToast } from '@/hooks/use-toast';

interface VideoCallProps {
  onCallEnd: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ onCallEnd }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [webrtc] = useState(() => new WebRTCService());
  const [callId, setCallId] = useState('');
  const [inputCallId, setInputCallId] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [webcamStarted, setWebcamStarted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (remoteVideoRef.current && webrtc.remoteStream) {
      remoteVideoRef.current.srcObject = webrtc.remoteStream;
    }
  }, [webrtc.remoteStream]);

  const startWebcam = async () => {
    try {
      const stream = await webrtc.startWebcam();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setWebcamStarted(true);
      toast({
        title: "Webcam Started",
        description: "Your camera and microphone are now active.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to access camera and microphone.",
        variant: "destructive",
      });
    }
  };

  const createCall = async () => {
    if (!webcamStarted) {
      await startWebcam();
    }
    
    try {
      const id = await webrtc.createCall();
      setCallId(id);
      setIsInCall(true);
      toast({
        title: "Call Created",
        description: `Call ID: ${id}. Share this ID with the person you want to call.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create call.",
        variant: "destructive",
      });
    }
  };

  const answerCall = async () => {
    if (!inputCallId) {
      toast({
        title: "Error",
        description: "Please enter a call ID.",
        variant: "destructive",
      });
      return;
    }

    if (!webcamStarted) {
      await startWebcam();
    }

    try {
      await webrtc.answerCall(inputCallId);
      setCallId(inputCallId);
      setIsInCall(true);
      toast({
        title: "Joined Call",
        description: `Connected to call ${inputCallId}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join call.",
        variant: "destructive",
      });
    }
  };

  const hangUp = () => {
    webrtc.hangUp();
    setIsInCall(false);
    setCallId('');
    setInputCallId('');
    setWebcamStarted(false);
    onCallEnd();
    toast({
      title: "Call Ended",
      description: "You have left the call.",
    });
  };

  const toggleMute = () => {
    if (webrtc.localStream) {
      const audioTrack = webrtc.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  const toggleVideo = () => {
    if (webrtc.localStream) {
      const videoTrack = webrtc.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn(!isVideoOn);
      }
    }
  };

  const copyCallId = () => {
    navigator.clipboard.writeText(callId);
    toast({
      title: "Copied!",
      description: "Call ID copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      {!isInCall ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="mr-2 h-5 w-5" />
                Start New Call
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={createCall} 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                Create Call
              </Button>
              {callId && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Share this Call ID:</p>
                  <div className="flex gap-2">
                    <Input value={callId} readOnly />
                    <Button onClick={copyCallId} size="icon" variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Join Call
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter Call ID"
                value={inputCallId}
                onChange={(e) => setInputCallId(e.target.value)}
              />
              <Button 
                onClick={answerCall} 
                variant="outline" 
                className="w-full"
              >
                Join Call
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  className="w-full h-64 bg-gray-900 rounded-lg object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  You
                </div>
              </div>
              <div className="relative">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  className="w-full h-64 bg-gray-900 rounded-lg object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  Remote
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="icon"
                onClick={toggleMute}
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                variant={!isVideoOn ? "destructive" : "outline"}
                size="icon"
                onClick={toggleVideo}
              >
                {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
              <Button
                variant="destructive"
                onClick={hangUp}
                className="px-6"
              >
                <PhoneOff className="mr-2 h-4 w-4" />
                End Call
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoCall;
