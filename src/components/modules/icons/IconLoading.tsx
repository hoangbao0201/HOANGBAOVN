import { IconProps } from "@/lib/types";

const IconLoading: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <>
            <svg
                viewBox="22 22 44 44"
                width={size}
                height={size}
                {...attributes}
            >
                <circle
                    cx="44"
                    cy="44"
                    r="20.2"
                    fill="none"
                    stroke-width="3.6"
                ></circle>
            </svg>
            ;
        </>
    );
};

export default IconLoading;
