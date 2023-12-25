import { ToastContainer, ToastOptions, toast } from "react-toastify";

type ToastType = "success" | "error" | "warning" | "info";

interface ShowToastifyProps {
    data: any
    type?: ToastType
    isDefault?: boolean
    className?: string
    toastOptions?: ToastOptions 
}

export const ShowToastify = ({} : ShowToastifyProps)  => {
    // return toast(data, {
    //     type: type,
    //     ...toastOptions,
    //     className: className,
    //     icon: isDefault,
    // });
    return (
        <ToastContainer />
    )
};