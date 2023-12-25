import { API_BASE_URL } from "@/lib/constants";
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client";

type SocketContextType = {
    socket: any | any
    isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
});

export const useSocket = () => {
    return useContext(SocketContext);
}

const SocketProvider = ({ children }: { children: ReactNode }) => {

    // const [socket, setSocket] = useState<Socket | null>(null);
    // const [isConnected, setIsConnected] = useState(false);

    // useEffect(() => {
    //     const socketInstance = io(API_BASE_URL as string);

    //     socketInstance.on("connect", () => {
    //         console.log(
    //             `Connected with socket ID: ${socketInstance.id}.`
    //         );
    //         setIsConnected(true);
    //     });
    
    //     socketInstance.on("disconnect", () => {
    //         console.log(`Failed to connect socket`);
    //         setIsConnected(false);
    //     });
    
    //     setSocket(socketInstance);

    //     return () => {
    //         socketInstance.disconnect();
    //     }
    // }, [])

    return (
        <>
            {/* <SocketContext.Provider value={{ socket, isConnected }}> */}
                {children}
            {/* </SocketContext.Provider> */}
        </>
    )
}

export default SocketProvider;