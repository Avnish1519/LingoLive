
import { firestore } from '@/config/firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  updateDoc 
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

  constructor() {
    this.pc = new RTCPeerConnection(servers);
    this.remoteStream = new MediaStream();
    
    this.pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        this.remoteStream?.addTrack(track);
      });
    };
  }

  async startWebcam(): Promise<MediaStream> {
    this.localStream = await navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: true 
    });

    this.localStream.getTracks().forEach((track) => {
      this.pc.addTrack(track, this.localStream!);
    });

    return this.localStream;
  }

  async createCall(): Promise<string> {
    const callDoc = doc(collection(firestore, 'calls'));
    const offerCandidates = collection(callDoc, 'offerCandidates');
    const answerCandidates = collection(callDoc, 'answerCandidates');

    this.callId = callDoc.id;

    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(offerCandidates, event.candidate.toJSON());
      }
    };

    const offerDescription = await this.pc.createOffer();
    await this.pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { offer });

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!this.pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        this.pc.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          this.pc.addIceCandidate(candidate);
        }
      });
    });

    return callDoc.id;
  }

  async answerCall(callId: string): Promise<void> {
    const callDoc = doc(firestore, 'calls', callId);
    const offerCandidates = collection(callDoc, 'offerCandidates');
    const answerCandidates = collection(callDoc, 'answerCandidates');

    this.callId = callId;

    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(answerCandidates, event.candidate.toJSON());
      }
    };

    const callData = (await getDoc(callDoc)).data();
    
    if (callData?.offer) {
      const offerDescription = callData.offer;
      await this.pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

      const answerDescription = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await updateDoc(callDoc, { answer });

      onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const data = change.doc.data();
            this.pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }
  }

  hangUp(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
    }
    this.pc.close();
  }
}
