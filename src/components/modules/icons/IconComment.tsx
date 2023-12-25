import { IconProps } from "@/lib/types";

const IconComment: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <>
            <svg
                aria-label="Bình luận"
                fill="currentColor"
                role="img"
                width={size}
                height={size}
                {...attributes}
                viewBox="0 0 24 24"
            >
                <title>Bình luận</title>
                <path
                    d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                ></path>
            </svg>
        </>
    );
};

export default IconComment;