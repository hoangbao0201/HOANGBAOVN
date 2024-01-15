import { IconProps } from "@/lib/types";

const IconSignalStream: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <>
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width={size}
                height={size}
                {...attributes}
            >
                <path d="M99.8 69.4c10.2 8.4 11.6 23.6 3.2 33.8C68.6 144.7 48 197.9 48 256s20.6 111.3 55 152.8c8.4 10.2 7 25.3-3.2 33.8s-25.3 7-33.8-3.2C24.8 389.6 0 325.7 0 256S24.8 122.4 66 72.6c8.4-10.2 23.6-11.6 33.8-3.2zm376.5 0c10.2-8.4 25.3-7 33.8 3.2c41.2 49.8 66 113.8 66 183.4s-24.8 133.6-66 183.4c-8.4 10.2-23.6 11.6-33.8 3.2s-11.6-23.6-3.2-33.8c34.3-41.5 55-94.7 55-152.8s-20.6-111.3-55-152.8c-8.4-10.2-7-25.3 3.2-33.8zM248 256a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zm-61.1-78.5C170 199.2 160 226.4 160 256s10 56.8 26.9 78.5c8.1 10.5 6.3 25.5-4.2 33.7s-25.5 6.3-33.7-4.2c-23.2-29.8-37-67.3-37-108s13.8-78.2 37-108c8.1-10.5 23.2-12.3 33.7-4.2s12.3 23.2 4.2 33.7zM427 148c23.2 29.8 37 67.3 37 108s-13.8 78.2-37 108c-8.1 10.5-23.2 12.3-33.7 4.2s-12.3-23.2-4.2-33.7C406 312.8 416 285.6 416 256s-10-56.8-26.9-78.5c-8.1-10.5-6.3-25.5 4.2-33.7s25.5-6.3 33.7 4.2z" />
            </svg> */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width={size}
                height={size}
                {...attributes}
            >
                <path xmlns="http://www.w3.org/2000/svg" d="M64 96c-17.7 0-32 14.3-32 32V384c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H64zM0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64v47.2V336.8 384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM519.4 411.3L416 354.4V317.9l118.8 65.4c.9 .5 1.9 .8 3 .8c3.4 0 6.2-2.8 6.2-6.2V134.2c0-3.4-2.8-6.2-6.2-6.2c-1 0-2.1 .3-3 .8L416 194.1V157.6l103.4-56.9c5.6-3.1 12-4.7 18.4-4.7c21.1 0 38.2 17.1 38.2 38.2V377.8c0 21.1-17.1 38.2-38.2 38.2c-6.4 0-12.8-1.6-18.4-4.7z"/>
            </svg>
        </>
    );
};

export default IconSignalStream;
