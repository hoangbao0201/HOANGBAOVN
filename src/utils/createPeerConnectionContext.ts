import { API_BASE_URL } from '@/lib/constants';
import { Socket, io } from "socket.io-client";

export class PeerConnectionSession {
    private _onConnected?: () => void;
    private _onDisconnected?: () => void;
    private _room?: string;
    private socket: Socket;
    private peerConnections: Record<string, RTCPeerConnection> = {};
    private senders: RTCRtpSender[] = [];
    private listeners: Record<string, (event: Event) => void> = {}

    constructor(socket: Socket) {
        this.socket = socket;
        this.onCallMade();
    }

    addPeerConnection(id: string, stream: MediaStream, callback: (stream: MediaStream) => void): void {
        this.peerConnections[id] = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });

        stream.getTracks().forEach((track) => {
            this.senders.push(this.peerConnections[id].addTrack(track, stream));
        });

        this.listeners[id] = (event: Event) => {
            // @ts-ignore
            const fn = this['_on' + capitalizeFirstLetter(this.peerConnections[id].connectionState)];
            fn && fn(event, id);
        };

        this.peerConnections[id].addEventListener('connectionstatechange', this.listeners[id]);

        // @ts-ignore
        this.peerConnections[id].ontrack = function ({ streams: [stream] }: { streams: [MediaStream] }): void {
            console.log({ id, stream });
            callback(stream);
        };

        console.log(this.peerConnections);
    }

    removePeerConnection(id: string): void {
        this.peerConnections[id].removeEventListener('connectionstatechange', this.listeners[id]);
        delete this.peerConnections[id];
        delete this.listeners[id];
    }

    isAlreadyCalling = false;

    async callUser(to: string): Promise<void> {
        if (this.peerConnections[to].iceConnectionState === 'new') {
            const offer = await this.peerConnections[to].createOffer();
            await this.peerConnections[to].setLocalDescription(new RTCSessionDescription(offer));

            this.socket.emit('call-user', { offer, to });
        }
    }

    onConnected(callback: () => void): void {
        this._onConnected = callback;
    }

    onDisconnected(callback: () => void): void {
        this._onDisconnected = callback;
    }

    joinRoom(room: string): void {
        this._room = room;
        this.socket.emit('joinRoom', room);
    }

    onCallMade(): void {
        this.socket.on('call-made', async (data: { socket: string; offer: RTCSessionDescriptionInit }) => {
            await this.peerConnections[data.socket].setRemoteDescription(new RTCSessionDescription(data.offer));
            const answer = await this.peerConnections[data.socket].createAnswer();
            await this.peerConnections[data.socket].setLocalDescription(new RTCSessionDescription(answer));

            this.socket.emit('make-answer', {
                answer,
                to: data.socket,
            });
        });
    }

    onAddUser(callback: (user: string) => void): void {
        this.socket.on(`${this._room}-add-user`, async ({ user }: { user: string }) => {
            callback(user);
        });
    }

    onRemoveUser(callback: (socketId: string) => void): void {
        this.socket.on(`${this._room}-remove-user`, ({ socketId }: { socketId: string }) => {
            callback(socketId);
        });
    }

    onUpdateUserList(callback: (users: string[], current: string) => void): void {
        this.socket.on(`${this._room}-update-user-list`, ({ users, current }: { users: string[]; current: string }) => {
            callback(users, current);
        });
    }

    onAnswerMade(callback: (socket: string) => void): void {
        this.socket.on('answer-made', async (data: { socket: string; answer: RTCSessionDescriptionInit }) => {
            await this.peerConnections[data.socket].setRemoteDescription(new RTCSessionDescription(data.answer));
            callback(data.socket);
        });
    }

    clearConnections(): void {
        this.socket.close();
        this.senders = [];
        Object.keys(this.peerConnections).forEach(this.removePeerConnection.bind(this));
    }
}

export const createPeerConnectionContext = () => {
    const socket = io(API_BASE_URL as string);

    return new PeerConnectionSession(socket);
};
