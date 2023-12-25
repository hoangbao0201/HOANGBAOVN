import { PeerConnectionSession, createPeerConnectionContext } from "@/utils/createPeerConnectionContext";
import { RefObject, useEffect, useMemo, useState } from "react";

interface UseStartPeerSessionProps {
    room: string;
    userMediaStream: MediaStream | null;
    localVideoRef: RefObject<HTMLVideoElement>;
  }

  interface UseStartPeerSessionReturn {
    connectedUsers: string[];
    peerVideoConnection: PeerConnectionSession;
    shareScreen: () => Promise<void>;
    cancelScreenSharing: () => Promise<void>;
    isScreenShared: boolean;
}

export const useStartPeerSession = ({ room, userMediaStream, localVideoRef }: UseStartPeerSessionProps): UseStartPeerSessionReturn => {
    const peerVideoConnection = useMemo(
        () => createPeerConnectionContext(),
        []
    );

    const [displayMediaStream, setDisplayMediaStream] = useState(null);
    const [connectedUsers, setConnectedUsers] = useState<any>([]);

    console.log("displayMediaStream: ", displayMediaStream);
    console.log("connectedUsers: ", connectedUsers);

    useEffect(() => {
        if (userMediaStream) {
            peerVideoConnection.joinRoom(room);
            peerVideoConnection.onAddUser((user) => {
                // @ts-ignore
                setConnectedUsers((users) => [...users, user]);
                peerVideoConnection.addPeerConnection(
                    `${user}`,
                    userMediaStream,
                    (_stream) => {
                        // @ts-ignore
                        document.getElementById(user).srcObject = _stream;
                    }
                );
                peerVideoConnection.callUser(user);
            });

            peerVideoConnection.onRemoveUser((socketId) => {
                // @ts-ignore
                setConnectedUsers((users) =>
                    // @ts-ignore
                    users.filter((user) => user !== socketId)
                );
                peerVideoConnection.removePeerConnection(socketId);
            });

            peerVideoConnection.onUpdateUserList(async (users) => {
                setConnectedUsers(users);
                for (const user of users) {
                    peerVideoConnection.addPeerConnection(
                        `${user}`,
                        userMediaStream,
                        (_stream) => {
                            // @ts-ignore
                            document.getElementById(user).srcObject = _stream;
                        }
                    );
                }
            });

            peerVideoConnection.onAnswerMade((socket) =>
                peerVideoConnection.callUser(socket)
            );
        }

        return () => {
            if (userMediaStream) {
                peerVideoConnection.clearConnections();
                userMediaStream?.getTracks()?.forEach((track) => track.stop());
            }
        };
    }, [peerVideoConnection, room, userMediaStream]);

    const cancelScreenSharing = async () => {
        // @ts-ignore
        const senders = await peerVideoConnection.senders.filter(
            // @ts-ignore
            (sender) => sender.track.kind === "video"
        );

        if (senders) {
            senders.forEach((sender) =>
                sender.replaceTrack(
                    // @ts-ignore
                    userMediaStream
                        .getTracks()
                        .find((track) => track.kind === "video")
                )
            );
        }
        // @ts-ignore
        localVideoRef.current.srcObject = userMediaStream;
        // @ts-ignore
        displayMediaStream.getTracks().forEach((track) => track.stop());
        setDisplayMediaStream(null);
    };

    const shareScreen = async () => {
        const stream =
            displayMediaStream ||
            (await navigator.mediaDevices.getDisplayMedia());

        // @ts-ignore
        const senders = await peerVideoConnection.senders.filter(
            // @ts-ignore
            (sender) => sender.track.kind === "video"
        );

        if (senders) {
            senders.forEach((sender) =>
                sender.replaceTrack(stream.getTracks()[0])
            );
        }

        stream.getVideoTracks()[0].addEventListener("ended", () => {
            // @ts-ignore
            cancelScreenSharing(stream);
        });

        // @ts-ignore
        localVideoRef.current.srcObject = stream;

        // @ts-ignore
        setDisplayMediaStream(stream);
    };

    return {
        connectedUsers,
        peerVideoConnection,
        shareScreen,
        cancelScreenSharing,
        isScreenShared: !!displayMediaStream,
    };
};
