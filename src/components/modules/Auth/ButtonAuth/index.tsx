import Image from "next/image";

interface ButtonAuthProps {
    handle: () => void;
    content: string;
    linkIcon: string;
    color: "white" | "black";
}

const ButtonAuth = ({
    handle,
    content,
    linkIcon,
    color = "black",
}: ButtonAuthProps) => {
    return (
        <div
            onClick={handle}
            className={`${
                color == "black"
                    ? "text-black bg-white hover:bg-gray-100 "
                    : "text-white bg-gray-900 hover:bg-gray-950"
            } mb-2 select-none relative flex items-center justify-center border text-lg h-13 py-2 px-2 cursor-pointer text-center rounded-md`}
        >
            <Image
                width={15}
                height={15}
                alt={`Icon ${content}`}
                className="w-7 h-7 block my-[5px] ml-3 border-r pr-2 left-0 absolute"
                src={linkIcon}
            />
            Đăng nhập với {content}
        </div>
    );
};

export default ButtonAuth;
