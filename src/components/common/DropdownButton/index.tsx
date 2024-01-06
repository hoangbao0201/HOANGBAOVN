import { Dispatch, ReactNode, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useClickOutSide } from '@/hook/useClickOutSide';


interface DropdownButtonProps {
    isOptions: boolean
    setIsOptions: Dispatch<React.SetStateAction<boolean>>
    children: ReactNode
    content: ReactNode
    className?: string
    placement?: string
}
export interface DropdownButtonRef {
    hiddentOptions: () => void;
};
const DropdownButton = ({ isOptions, setIsOptions, children, content, placement, className }: DropdownButtonProps) => {

    const optionRef = useRef<HTMLDivElement>(null)
    
    useClickOutSide(optionRef, () => setIsOptions(false));
      
    return (
        <div ref={optionRef} className='relative'>
            <button onClick={() => setIsOptions(value => !value)}>
                {children}
            </button>
            {
                isOptions && (
                    <div className={`absolute z-10 ${className} dropdown-button-bf`}>
                        {content}
                    </div>
                )
            }
        </div>
    )
};

export default DropdownButton;  