
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Copy,
  Users,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { WebRTCService } from '@/services/webrtc';
import { useToast } from '@/hooks/use-toast';

interface VideoCallProps {
  onCallEnd: () => void;
}

type ConnectionState = 'idle' | 'starting' | 'connecting' | 'connected' | 'failed';

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
  const [connectionState, setConnectionState] = useState<ConnectionState>('idle');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up video refs when streams are available
    if (localVideoRef.current && webrtc.localStream) {
      localVideoRef.current.srcObject = webrtc.localStream;
    }
    
    if (remoteVideoRef.current && webrtc.remoteStream) {
      remoteVideoRef.current.srcObject = webrtc.remoteStream;
    }

    // Monitor connection state
    const checkConnectionState = () => {
      const state = webrtc.pc.connectionState;
      console.log('WebRTC connection state:', state);
      
      switch (state) {
        case 'connecting':
          setConnectionState('connecting');
          break;
        case 'connected':
          setConnectionState('connected');
          toast({
            title: "Call Connected!",
            description: "You are now connected to your peer.",
          });
          break;
        case 'failed':
        case 'disconnected':
          setConnectionState('failed');
          setError('Connection failed. Please try again.');
          break;
        default:
          break;
      }
    };

    webrtc.pc.onconnectionstatechange = checkConnectionState;
    webrtc.pc.oniceconnectionstatechange = checkConnectionState;

    return () => {
      webrtc.pc.onconnectionstatechange = null;
      webrtc.pc.oniceconnectionstatechange = null;
    };
  }, [webrtc, toast]);

  const startWebcam = async () => {
    try {
      setConnectionState('starting');
      setError(null);
      const stream = await webrtc.startWebcam();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setWebcamStarted(true);
      setConnectionState('idle');
      toast({
        title: "Webcam Started",
        description: "Your camera and microphone are now active.",
      });
    } catch (error) {
      console.error('Webcam error:', error);
      setConnectionState('failed');
      setError('Failed to access camera and microphone. Please check permissions.');
      toast({
        title: "Camera Error",
        description: "Failed to access camera and microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const createCall = async () => {
    try {
      if (!webcamStarted) {
        await startWebcam();
      }
      
      setConnectionState('connecting');
      setError(null);
      const id = await webrtc.createCall();
      setCallId(id);
      setIsInCall(true);
      
      toast({
        title: "Call Created Successfully!",
        description: `Call ID: ${id}. Share this ID with the person you want to call.`,
      });
    } catch (error) {
      console.error('Create call error:', error);
      setConnectionState('failed');
      setError('Failed to create call. Please try again.');
      toast({
        title: "Error",
        description: "Failed to create call. Please check your internet connection.",
        variant: "destructive",
      });
    }
  };

  const answerCall = async () => {
    if (!inputCallId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid call ID.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!webcamStarted) {
        await startWebcam();
      }

      setConnectionState('connecting');
      setError(null);
      await webrtc.answerCall(inputCallId.trim());
      setCallId(inputCallId.trim());
      setIsInCall(true);
      
      toast({
        title: "Joined Call Successfully!",
        description: `Connected to call ${inputCallId}`,
      });
    } catch (error) {
      console.error('Answer call error:', error);
      setConnectionState('failed');
      setError('Failed to join call. Please check the call ID and try again.');
      toast({
        title: "Error",
        description: "Failed to join call. Please check the call ID and your internet connection.",
        variant: "destructive",
      });
    }
  };

  const hangUp = () => {
    try {
      webrtc.hangUp();
      setIsInCall(false);
      setCallId('');
      setInputCallId('');
      setWebcamStarted(false);
      setConnectionState('idle');
      setError(null);
      
      // Clear video elements
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
      
      onCallEnd();
      toast({
        title: "Call Ended",
        description: "You have left the call.",
      });
    } catch (error) {
      console.error('Hang up error:', error);
      toast({
        title: "Error",
        description: "Error ending call.",
        variant: "destructive",
      });
    }
  };

  const toggleMute = () => {
    if (webrtc.localStream) {
      const audioTrack = webrtc.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
        setIsMuted(!isMuted);
        toast({
          title: isMuted ? "Unmuted" : "Muted",
          description: isMuted ? "Your microphone is now on." : "Your microphone is now off.",
        });
      }
    }
  };

  const toggleVideo = () => {
    if (webrtc.localStream) {
      const videoTrack = webrtc.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn(!isVideoOn);
        toast({
          title: isVideoOn ? "Video Off" : "Video On",
          description: isVideoOn ? "Your camera is now off." : "Your camera is now on.",
        });
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

  const getConnectionStatusBadge = () => {
    switch (connectionState) {
      case 'starting':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            Starting...
          </Badge>
        );
      case 'connecting':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            Connecting...
          </Badge>
        );
      case 'connected':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Connected
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive">
            <AlertCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex justify-center">
        {getConnectionStatusBadge()}
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center text-red-700">
              <AlertCircle className="mr-2 h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

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
                disabled={connectionState === 'starting' || connectionState === 'connecting'}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                {connectionState === 'starting' || connectionState === 'connecting' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Call'
                )}
              </Button>
              {callId && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Share this Call ID:</p>
                  <div className="flex gap-2">
                    <Input value={callId} readOnly className="font-mono text-sm" />
                    <Button onClick={copyCallId} size="icon" variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-green-600">
                    ✅ Call created! Waiting for someone to join...
                  </p>
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
                className="font-mono"
              />
              <Button 
                onClick={answerCall} 
                disabled={connectionState === 'starting' || connectionState === 'connecting' || !inputCallId.trim()}
                variant="outline" 
                className="w-full"
              >
                {connectionState === 'starting' || connectionState === 'connecting' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Join Call'
                )}
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
                  playsInline
                  className="w-full h-64 bg-gray-900 rounded-lg object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  You {!isVideoOn && '(Video Off)'}
                </div>
                {!isVideoOn && (
                  <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center">
                    <VideoOff className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="relative">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 bg-gray-900 rounded-lg object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  Remote
                </div>
                {connectionState !== 'connected' && (
                  <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Users className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Waiting for peer...</p>
                    </div>
                  </div>
                )}
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

            {callId && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Call ID:</p>
                <p className="font-mono text-sm">{callId}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoCall;
