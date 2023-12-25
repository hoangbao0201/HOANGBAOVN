import { IconProps } from "@/lib/types";

const IconSearch: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                width={size}
                height={size}
                {...attributes}
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                        d="M15 15L21 21"
                        stroke="#323232"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>{" "}
                    <path
                        d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="#323232"
                        strokeWidth="2"
                    ></path>{" "}
                </g>
            </svg>
        </>
    );
};

export default IconSearch;