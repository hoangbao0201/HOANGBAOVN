import Script from "next/script";

const Footer = () => {
    return (
        <footer>
            <div className="w-full border-t bg-slate-800 shadow-sm py-4 h-20">
                <div className="max-w-7xl w-full mx-auto px-3 text-white">
                    <p>Footer</p>
                    <div></div>
                </div>
            </div>
            <Script src="https://www.vipads.live/vn/c-1617-25.js"/>
        </footer>
    );
};
export default Footer;
