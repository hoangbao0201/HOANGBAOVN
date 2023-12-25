"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Dispatch,
    Fragment,
    ReactNode,
    SetStateAction,
    useEffect,
} from "react";

import { Dialog, Transition } from "@headlessui/react";


// const solutions = [
//     {
//         name: "Linh kiện robot hút bụi",
//         description: "Linh kiện robot hút bụi độc đáo, chính xác và hiệu quả, mang đến khả năng làm sạch tối ưu cho mọi góc nhỏ trong ngôi nhà của bạn.",
//         href: "##",
//         icon: "robot-cleaner-vacuum.png"
//     },
//     {
//         name: "PHỤ KIỆN ECOVACS",
//         description: "Phụ kiện Ecovacs độc đáo, tối ưu hóa hiệu suất robot hút bụi, giúp làm sạch hiệu quả trong mọi không gian",
//         href: "##",
//         icon: "ecovacs-home.png"    
//     },
//     {
//         name: "ĐÔNG CƠ VÀ ĐIỀU KHIỂN",
//         description: "Động cơ và điều khiển chất lượng, mang đến sức mạnh và kiểm soát hoàn hảo cho thiết bị hiện đại",
//         href: "##",
//         icon: "engine-motor.png"    
//     },
//     {
//         name: "PIN VÀ PHỤ KIỆN",
//         description: "Pin và phụ kiện độc đáo, tăng cường năng lượng và tính linh hoạt cho thiết bị, đảm bảo hoạt động liên tục.",
//         href: "##",
//         icon: "battery-full-charging.png"    
//     },
// ];


interface ModalMenuProps {
    children?: ReactNode;
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
}

const ModalMenu = ({ isShow, setIsShow }: ModalMenuProps) => {

    const router = useRouter();
    // useEffect(() => {
    //     const handleRouteChange = () => {
    //         setIsShow(false);
    //     };

    //     router.events.on("routeChangeStart", handleRouteChange);

    //     return () => {
    //         router.events.off("routeChangeStart", handleRouteChange);
    //     };
    // }, [router]);

    return (
        <>
            <Transition show={isShow} as={Fragment}>
                <Dialog onClose={() => setIsShow(false)} >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="-translate-x-1/2 opacity-0 scale-100"
                        enterTo="translate-x-0 opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="translate-x-0 opacity-100 scale-100"
                        leaveTo="-translate-x-1/2 opacity-0 scale-100"
                    >
                        <Dialog.Panel className="bg-white fixed inset-0 w-3/4 z-50 shadow-md">
                            <Dialog.Title>
                                <div className="relative h-screen">
                                    <div className="text-black">
                                        <p className="px-6 py-4 font-semibold text-lg border-b mb-3">
                                            VESMART
                                        </p>
                                        <div className="">
                                            <div className="border-b pb-4 px-2">
                                                <Link href={"/"}>
                                                    <p className="px-4 py-2 rounded-md hover:bg-gray-100">
                                                        Trang chủ
                                                    </p>
                                                </Link>
                                                <Link href={"/bai-viet"}>
                                                    <p className="px-4 py-2 rounded-md hover:bg-gray-100">
                                                        Bài viết
                                                    </p>
                                                </Link>
                                            </div>

                                            {/* <Link href={"/gioi-thieu"}>
                                                <p className="px-4 py-2 rounded-md hover:bg-gray-100">
                                                    Giới thiệu
                                                </p>
                                            </Link> */}
                                        </div>
                                    </div>

                                </div>
                            </Dialog.Title>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    );
};

export default ModalMenu;

// export function useModalMenu() {
//     const [isModalMenu, setIsModalMenu] = useState(false);

//     const ModalMenuCallback = useCallback(() => {
//         return <ModalMenu isShow={isModalMenu} setIsShow={setIsModalMenu} />;
//     }, [isModalMenu, setIsModalMenu]);

//     return useMemo(
//         () => ({ setIsModalMenu, ModalMenu: ModalMenuCallback }),
//         [setIsModalMenu, ModalMenuCallback]
//     );
// }
