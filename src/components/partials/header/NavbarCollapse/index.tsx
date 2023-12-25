import { useState } from "react";
import ModalMenu from "./ModalMenu";
import IconBars from "@/components/modules/icons/IconBars";

const NavbarCollapse = () => {
    const [isOpenNavbar, setIsOpenNavbar] = useState(false);
    return (
        <div className="mr-3">
            <div>
                <button
                    onClick={() => setIsOpenNavbar((value) => !value)}
                    className="w-10 h-10 select-none flex items-center justify-center border rounded-md bg-gray-100"
                >
                    <IconBars size={25} />
                </button>
                <ModalMenu isShow={isOpenNavbar} setIsShow={setIsOpenNavbar} />
            </div>
        </div>
    );
};

export default NavbarCollapse;
