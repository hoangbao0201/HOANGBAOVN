import { IconProps } from "@/lib/types";

const IconChartLine: React.FC<IconProps> = ({
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
                <path d="M48 56c0-13.3-10.7-24-24-24S0 42.7 0 56V408c0 39.8 32.2 72 72 72H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H72c-13.3 0-24-10.7-24-24V56zM473 169c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119-79-79c-4.5-4.5-10.6-7-17-7s-12.5 2.5-17 7l-96 96c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l79-79 79 79c9.4 9.4 24.6 9.4 33.9 0L473 169z" />
            </svg>
        </>
    );
};

export default IconChartLine;