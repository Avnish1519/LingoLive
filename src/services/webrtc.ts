
import { firestore } from '@/config/firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  updateDoc,
  Unsubscribe 
} from 'firebase/firestore';

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export class WebRTCService {
  pc: RTCPeerConnection;
  localStream: MediaStream | null = null;
  remoteStream: MediaStream | null = null;
  callId: string | null = null;
  private unsubscribeCallDoc: Unsubscribe | null = null;
  private unsubscribeOfferCandidates: Unsubscribe | null = null;
  private unsubscribeAnswerCandidates: Unsubscribe | null = null;

  constructor() {
    this.pc = new RTCPeerConnection(servers);
    this.remoteStream = new MediaStream();
    
    // Set up remote stream handling
    this.pc.ontrack = (event) => {
      console.log('Received remote track:', event);
      event.streams[0].getTracks().forEach((track) => {
        this.remoteStream?.addTrack(track);
      });
    };

    // Connection state logging
    this.pc.onconnectionstatechange = () => {
      console.log('Connection state:', this.pc.connectionState);
    };

    this.pc.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', this.pc.iceConnectionState);
    };
  }

  async startWebcam(): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });

      // Add tracks to peer connection
      this.localStream.getTracks().forEach((track) => {
        if (this.localStream) {
          console.log('Adding local track:', track);
          this.pc.addTrack(track, this.localStream);
        }
      });

      return this.localStream;
    } catch (error) {
      console.error('Error accessing webcam:', error);
      throw error;
    }
  }

  async createCall(): Promise<string> {
    try {
      // Create new call document with auto-generated ID
      const callDoc = doc(collection(firestore, 'calls'));
      const offerCandidates = collection(callDoc, 'offerCandidates');
      const answerCandidates = collection(callDoc, 'answerCandidates');

      this.callId = callDoc.id;
      console.log('Creating call with ID:', this.callId);

      // Collect ICE candidates for caller
      this.pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('New ICE candidate (caller):', event.candidate);
          addDoc(offerCandidates, event.candidate.toJSON());
        }
      };

      // Create offer
      const offerDescription = await this.pc.createOffer();
      await this.pc.setLocalDescription(offerDescription);
      console.log('Created offer:', offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      // Save offer to Firestore
      await setDoc(callDoc, { offer });
      console.log('Offer saved to Firestore');

      // Listen for remote answer
      this.unsubscribeCallDoc = onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!this.pc.currentRemoteDescription && data?.answer) {
          console.log('Received answer:', data.answer);
          const answerDescription = new RTCSessionDescription(data.answer);
          this.pc.setRemoteDescription(answerDescription);
        }
      });

      // Listen for remote ICE candidates (from callee)
      this.unsubscribeAnswerCandidates = onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            console.log('Adding remote ICE candidate (from callee):', candidate);
            this.pc.addIceCandidate(candidate);
          }
        });
      });

      return callDoc.id;
    } catch (error) {
      console.error('Error creating call:', error);
      throw error;
    }
  }

  async answerCall(callId: string): Promise<void> {
    try {
      const callDoc = doc(firestore, 'calls', callId);
      const offerCandidates = collection(callDoc, 'offerCandidates');
      const answerCandidates = collection(callDoc, 'answerCandidates');

      this.callId = callId;
      console.log('Answering call with ID:', callId);

      // Collect ICE candidates for callee
      this.pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('New ICE candidate (callee):', event.candidate);
          addDoc(answerCandidates, event.candidate.toJSON());
        }
      };

      // Get the call document and offer
      const callSnapshot = await getDoc(callDoc);
      const callData = callSnapshot.data();
      
      if (!callData?.offer) {
        throw new Error('No offer found for this call ID');
      }

      console.log('Found offer:', callData.offer);

      // Set remote description (the offer)
      const offerDescription = new RTCSessionDescription(callData.offer);
      await this.pc.setRemoteDescription(offerDescription);

      // Create answer
      const answerDescription = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answerDescription);
      console.log('Created answer:', answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      // Save answer to Firestore
      await updateDoc(callDoc, { answer });
      console.log('Answer saved to Firestore');

      // Listen for remote ICE candidates (from caller)
      this.unsubscribeOfferCandidates = onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            console.log('Adding remote ICE candidate (from caller):', candidate);
            this.pc.addIceCandidate(candidate);
          }
        });
      });
    } catch (error) {
      console.error('Error answering call:', error);
      throw error;
    }
  }

  hangUp(): void {
    console.log('Hanging up call');
    
    // Stop local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        track.stop();
        console.log('Stopped track:', track);
      });
      this.localStream = null;
    }

    // Close peer connection
    this.pc.close();

    // Clean up Firestore listeners
    if (this.unsubscribeCallDoc) {
      this.unsubscribeCallDoc();
      this.unsubscribeCallDoc = null;
    }
    if (this.unsubscribeOfferCandidates) {
      this.unsubscribeOfferCandidates();
      this.unsubscribeOfferCandidates = null;
    }
    if (this.unsubscribeAnswerCandidates) {
      this.unsubscribeAnswerCandidates();
      this.unsubscribeAnswerCandidates = null;
    }

    // Reset call ID
    this.callId = null;

    // Create new peer connection for next call
    this.pc = new RTCPeerConnection(servers);
    this.remoteStream = new MediaStream();
    
    this.pc.ontrack = (event) => {
      console.log('Received remote track:', event);
      event.streams[0].getTracks().forEach((track) => {
        this.remoteStream?.addTrack(track);
      });
    };

    this.pc.onconnectionstatechange = () => {
      console.log('Connection state:', this.pc.connectionState);
    };

    this.pc.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', this.pc.iceConnectionState);
    };
  }
}
