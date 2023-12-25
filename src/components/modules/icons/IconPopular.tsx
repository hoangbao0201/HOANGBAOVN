import { IconProps } from "@/lib/types";

const IconPopular: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <>
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                aria-hidden="true"
                width={size}
                height={size}
                {...attributes}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="m10 10.414 4 4 5.707-5.707L22 11V5h-6l2.293 2.293L14 11.586l-4-4-7.707 7.707 1.414 1.414z"></path>
            </svg>
        </>
    );
};

export default IconPopular;