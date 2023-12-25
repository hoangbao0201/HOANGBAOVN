import { useEffect, useRef } from "react";

type ClickOutsideHandler = () => void;

export const useClickOutSide = (node: any, handler: ClickOutsideHandler) => {

    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        const handleClickOutside = (e : any) => {
            if (node.current && !node.current.contains(e.target)) {
                handlerRef.current();
            }
        };

        const handleRouteChange = () => {
            handlerRef.current();
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [node]);

    return node;
};
