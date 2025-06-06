
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

interface CallDetails {
  id: string;
  password: string;
}

type ConnectionState = 'idle' | 'starting' | 'connecting' | 'connected' | 'failed';

const VideoCall: React.FC<VideoCallProps> = ({ onCallEnd }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [webRTC] = useState(() => new WebRTCService());
  const [callDetails, setCallDetails] = useState<CallDetails | null>(null);
  const [inputCallId, setInputCallId] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [connectionState, setConnectionState] = useState<ConnectionState>('idle');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Monitor connection state
    const checkConnectionState = () => {
      const state = webRTC.pc.connectionState;
      const iceState = webRTC.pc.iceConnectionState;
      console.log('🔗 WebRTC states - Connection:', state, 'ICE:', iceState);
      
      if (state === 'connecting' || iceState === 'checking') {
        setConnectionState('connecting');
      } else if (state === 'connected' || iceState === 'connected') {
        setConnectionState('connected');
        toast({
          title: "Call Connected! 🎉",
          description: "You are now connected to your peer.",
        });
      } else if (state === 'failed' || iceState === 'failed') {
        setConnectionState('failed');
        setError('Connection failed. Please check your internet connection and try again.');
      } else if (state === 'disconnected' || iceState === 'disconnected') {
        setConnectionState('failed');
        setError('Connection lost. Please try reconnecting.');
      }
    };

    webRTC.pc.onconnectionstatechange = checkConnectionState;
    webRTC.pc.oniceconnectionstatechange = checkConnectionState;

    // Monitor remote stream changes
    webRTC.pc.ontrack = (event) => {
      console.log('🎵 Remote track received:', event.track.kind);
      event.streams[0].getTracks().forEach((track) => {
        console.log('🎵 Adding track to remote stream:', track.kind);
        webRTC.remoteStream?.addTrack(track);
      });
      
      // Update remote video when new tracks arrive
      if (remoteVideoRef.current && webRTC.remoteStream) {
        remoteVideoRef.current.srcObject = webRTC.remoteStream;
        console.log('📹 Remote video stream attached to DOM');
      }
    };

    return () => {
      webRTC.pc.onconnectionstatechange = null;
      webRTC.pc.oniceconnectionstatechange = null;
    };
  }, [webRTC, toast]);

  // Monitor remote stream updates
  useEffect(() => {
    if (remoteVideoRef.current && webRTC.remoteStream) {
      remoteVideoRef.current.srcObject = webRTC.remoteStream;
      console.log('📹 Remote video stream updated in DOM');
    }
  }, [webRTC.remoteStream]);

  const startCall = async () => {
    try {
      setConnectionState('starting');
      setError(null);
      console.log('🎬 Starting new call...');
      
      // Start webcam
      const localStream = await webRTC.startWebcam();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
        console.log('📹 Local video attached to DOM');
      }
      setWebcamStarted(true);
      
      setConnectionState('connecting');
      
      // Create call
      const callId = await webRTC.createCall();
      const password = Math.random().toString(36).slice(-6); // Generate 6-digit password
      
      setCallDetails({ id: callId, password });
      setIsInCall(true);
      
      console.log('✅ Call created with ID:', callId, 'Password:', password);
      toast({
        title: "Call Created! 🆔",
        description: `Call ID: ${callId}. Share this ID with the person you want to call.`,
        duration: 5000,
      });
    } catch (error) {
      console.error('❌ Start call error:', error);
      setConnectionState('failed');
      setError('Failed to create call. Please try again.');
      toast({
        title: "Error ❌",
        description: "Failed to create call. Please check your internet connection.",
        variant: "destructive",
      });
    }
  };

  const joinCall = async (callId: string) => {
    if (!callId.trim()) {
      toast({
        title: "Error ❌",
        description: "Please enter a valid call ID.",
        variant: "destructive",
      });
      return;
    }

    try {
      setConnectionState('starting');
      setError(null);
      console.log('🎬 Starting webcam for joining call...');
      
      // Start webcam
      const localStream = await webRTC.startWebcam();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
        console.log('📹 Local video attached to DOM');
      }
      setWebcamStarted(true);

      setConnectionState('connecting');
      console.log('📞 Joining call:', callId.trim());
      
      // Answer call
      await webRTC.answerCall(callId.trim());
      setCallDetails({ id: callId.trim(), password: '' });
      setIsInCall(true);
      
      console.log('✅ Successfully joined call');
      toast({
        title: "Joined Call! 🎉",
        description: `Connected to call ${callId}`,
      });
    } catch (error) {
      console.error('❌ Join call error:', error);
      setConnectionState('failed');
      setError('Failed to join call. Please check the call ID and try again.');
      toast({
        title: "Error ❌",
        description: "Failed to join call. Please check the call ID and your internet connection.",
        variant: "destructive",
      });
    }
  };

  const hangUp = () => {
    try {
      console.log('📴 Ending call...');
      webRTC.hangUp();
      setIsInCall(false);
      setCallDetails(null);
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
        title: "Call Ended 📴",
        description: "You have left the call.",
      });
    } catch (error) {
      console.error('❌ Hang up error:', error);
      toast({
        title: "Error ❌",
        description: "Error ending call.",
        variant: "destructive",
      });
    }
  };

  const toggleMute = () => {
    if (webRTC.localStream) {
      const audioTrack = webRTC.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
        setIsMuted(!isMuted);
        console.log('🎤 Audio', isMuted ? 'unmuted' : 'muted');
        toast({
          title: isMuted ? "Unmuted 🎤" : "Muted 🔇",
          description: isMuted ? "Your microphone is now on." : "Your microphone is now off.",
        });
      }
    }
  };

  const toggleVideo = () => {
    if (webRTC.localStream) {
      const videoTrack = webRTC.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn(!isVideoOn);
        console.log('📹 Video', !isVideoOn ? 'enabled' : 'disabled');
        toast({
          title: isVideoOn ? "Video Off 📹" : "Video On 🎥",
          description: isVideoOn ? "Your camera is now off." : "Your camera is now on.",
        });
      }
    }
  };

  const copyCallId = () => {
    if (callDetails?.id) {
      navigator.clipboard.writeText(callDetails.id);
      toast({
        title: "Copied! 📋",
        description: "Call ID copied to clipboard.",
      });
    }
  };

  const getConnectionStatusBadge = () => {
    switch (connectionState) {
      case 'starting':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            Starting Camera...
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
                onClick={startCall} 
                disabled={connectionState === 'starting' || connectionState === 'connecting'}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                {connectionState === 'starting' || connectionState === 'connecting' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Start Call'
                )}
              </Button>
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
                onClick={() => joinCall(inputCallId)} 
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
                      <p className="text-sm">
                        {connectionState === 'connecting' ? 'Connecting...' : 'Waiting for peer...'}
                      </p>
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

            {callDetails && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-gray-600">Call ID:</p>
                  <Button onClick={copyCallId} size="sm" variant="outline">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <p className="font-mono text-sm break-all">{callDetails.id}</p>
                {callDetails.password && (
                  <>
                    <p className="text-xs text-gray-600 mt-2 mb-1">Password:</p>
                    <p className="font-mono text-sm">{callDetails.password}</p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoCall;
