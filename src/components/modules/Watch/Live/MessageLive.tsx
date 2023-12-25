import { useEffect, useState } from "react";
import { useSocket } from "../../Provider/SocketProvider";


const MessageLive = () => {

    const { socket, isConnected } = useSocket();
    
    const [valueMessage, setValueMessage] = useState<string>("");
    const [receiverId, setReceiverId] = useState<string>("");
    const [listMessage, setListMessage] = useState<any[]>([
        "test 1"
    ]);

    const handleSendMessage = () => {
        try {
            // setListMessage(state => [...state, valueMessage]);
            // setValueMessage("");
            if (socket && isConnected) {
                socket.emit("createMessage", { senderId: socket.id, receiverId: receiverId, message: valueMessage });
                setValueMessage("");
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on("message", (data: string) => {
                setListMessage(state => [...state, data]);
            });
        }

        return () => {
            if (socket) {
                socket.off("message");
            }
        };
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on("message", (data: string) => {
                setListMessage(state => [...state, data]);
            });
        }

        return () => {
            if (socket) {
                socket.off("message");
            }
        };
    }, [socket]);

    return (
        <div>
            Message
            <div>
                {listMessage.map((message, index) => {
                    return <div key={index}>{message}</div>
                })}
            </div>
            <div>
                <button
                    className="py-2 px-3 rounded-md bg-blue-500"
                    onClick={handleSendMessage}
                    style={{ marginBottom: '30px' }}
                >
                    Send Message
                </button>
    
                <input
                    value={valueMessage}
                    placeholder="message"
                    className="py-2 px-3 border outline-none"
                    onChange={(e) => setValueMessage(e.target.value)}
                />
                <input
                    value={receiverId}
                    placeholder="to"
                    className="py-2 px-3 border outline-none"
                    onChange={(e) => setReceiverId(e.target.value)}
                />
            </div>
        </div>
    )
}

export default MessageLive;