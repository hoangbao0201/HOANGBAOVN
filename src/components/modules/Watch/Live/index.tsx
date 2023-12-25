import { useEffect } from "react";
import { useSocket } from "../../Provider/SocketProvider";


const LiveScreen = (props: any) => {
    const { socket, isConnected } = useSocket();

    // const myPeer = useRef<Peer | null>(null);
    // const remoteVideoRef = useRef<any>(null);
    // const videoRef = useRef<HTMLVideoElement>(null);
    // const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        // webRTCHandler.getLocalStream();
        // webRTCGroupHandler.connectWithMyPeer();
    }, []);

    return (
        <div>
            {/* <video
                ref={videoRef}
                autoPlay={true}
                className="aspect-video w-full"
            /> */}
            {/* <video
                ref={remoteVideoRef}
                autoPlay={true}
                className="aspect-video w-full"
            /> */}
            {/* <MessageLive /> */}
        </div>
    );
};

export default LiveScreen;

// useEffect(() => {
//     const enableVideoStream = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({
//                 video: true,
//             });

//             setMediaStream(stream);
//         } catch (error) {
//             console.error("Error accessing webcam", error);
//         }
//     };

//     enableVideoStream();
// }, []);

// useEffect(() => {
//     if (videoRef.current && mediaStream) {
//         videoRef.current.srcObject = mediaStream;
//     }
// }, [videoRef, mediaStream]);

// useEffect(() => {
//     if (socket) {
//         socket.on("stream", (data: string) => {
//             console.log(data);
//         });
//     }

//     return () => {
//         if (socket) {
//             socket.off("stream");
//         }
//     };
// }, [socket]);

// useEffect(() => {
//     if (socket) {
//         socket.on("video-call", (data: any) => {
//             if (data) {
//                 remoteVideoRef.current.srcObject = mediaStream;
//             }
//         });
//     }

//     return () => {
//         if (socket) {
//             socket.off("video-call");
//         }
//     };
// }, [socket]);