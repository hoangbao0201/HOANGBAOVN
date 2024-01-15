import { IconProps } from "@/lib/types";

const IconClock: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <>
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                {...attributes}
                viewBox="0 0 512 512"
            >
                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
            </svg> */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={size}
                height={size}
                {...attributes}
            >
                <path xmlns="http://www.w3.org/2000/svg" d="M32 132V48c0-8.8-7.2-16-16-16S0 39.2 0 48V176c0 8.8 7.2 16 16 16H144c8.8 0 16-7.2 16-16s-7.2-16-16-16H53.6C89.5 84.3 166.7 32 256 32c123.7 0 224 100.3 224 224s-100.3 224-224 224c-73.3 0-138.3-35.2-179.2-89.6c-5.3-7.1-15.3-8.5-22.4-3.2s-8.5 15.3-3.2 22.4C97.9 471.8 172.2 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C159.6 0 75.7 53.3 32 132zm224-4c-8.8 0-16 7.2-16 16V256c0 4.2 1.7 8.3 4.7 11.3l80 80c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L272 249.4V144c0-8.8-7.2-16-16-16z"/>
            </svg>
        </>
    );
};

export default IconClock;
