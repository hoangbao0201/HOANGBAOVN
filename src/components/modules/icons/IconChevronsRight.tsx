import { IconProps } from "@/lib/types";

const IconChevronRight: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={size}
                height={size}
                {...attributes}
            >
                <path d="M465 239c9.4 9.4 9.4 24.6 0 33.9L273 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L239 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L465 239zM81 47L273 239c9.4 9.4 9.4 24.6 0 33.9L81 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L47 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
            </svg>
        </>
    );
};

export default IconChevronRight;
