import { useEffect, useRef, useState } from "react";

import IconArrowUp from "@/components/modules/icons/IconArrowUp";

const ButtonOnTop = () => {
    const buttonRef = useRef<any>(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
            if (document.documentElement.scrollTop > 150) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        };
    }, []);

    const eventOnTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    return (
        <div>
            {showButton ? (
                <button
                    ref={buttonRef}
                    onClick={eventOnTop}
                    className="fixed right-7 bottom-7 z-50 bg-gray-300 rounded-full text-center flex flex-col justify-center items-center p-2"
                >
                    <IconArrowUp className="fill-gray-600" />
                </button>
            ) : <span></span>}
        </div>
    )
}

export default ButtonOnTop;