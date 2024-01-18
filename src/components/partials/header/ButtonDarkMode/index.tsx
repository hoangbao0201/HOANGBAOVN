import IconDark from "@/components/modules/icons/IconDark";
import IconLight from "@/components/modules/icons/IconLight";
import { useTheme } from "next-themes";

const ButtonDarkMode = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <button
            onClick={() =>
                theme == "dark" ? setTheme("light") : setTheme("dark")
            }
            className=""
        >
            <i className="w-10 bg-gray-100 dark:bg-slate-800/70 rounded-full block outline-blue-600 outline-2 hover:outline-dashed">
                {
                    currentTheme === "light" ? (
                        <IconLight size={20} className="h-10 mx-auto"/>
                    ) : (
                        <IconDark size={20} className="h-10 mx-auto"/>
                    )
                }
            </i>
        </button>
    );
};

export default ButtonDarkMode;
