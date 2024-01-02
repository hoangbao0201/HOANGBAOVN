import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";

import { Toc } from "@/types";
import Link from "next/link";


interface TOCInlineProps {
    toc: Toc;
    indentDepth?: number;
    fromHeading?: number;
    toHeading?: number;
    asDisclosure?: boolean;
    exclude?: string | string[];
}
const TOCInline = ({
    toc,
    indentDepth = 3,
    fromHeading = 1,
    toHeading = 6,
    asDisclosure = false,
    exclude = "",
}: TOCInlineProps) => {
    const re = Array.isArray(exclude)
        ? new RegExp("^(" + exclude.join("|") + ")$", "i")
        : new RegExp("^(" + exclude + ")$", "i");

    const filteredToc = toc.filter(
        (heading) =>
            heading.depth >= fromHeading &&
            heading.depth <= toHeading &&
            !re.test(heading.value)
    );

    function getIDs(items: any) {
        return items.map((item: any) => item.url.slice(1));
    }

    function useActiveId(itemIds: any) {
        const [activeId, setActiveId] = useState(``);
    
        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(entry.target.id);
                        }
                    });
                },
                { rootMargin: `0% 0% -70% 0%` }
            );
    
            itemIds.forEach((id: any) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.observe(element);
                } else {
                    console.error(`Element with ID ${id} not found`);
                }
            });
        }, [itemIds]);
    
        return activeId;
    }

    const idList = getIDs(toc);
    const activeId = useActiveId(idList);

    // const handleChangeTagTOC = (url: string) => {
    //     router.push(`${url}`, { shallow: true })
    // }

    const tocList = (
        <ul>
            {filteredToc.map((heading) => (
                <li
                    key={heading.value}
                    className={`${
                        heading.url.slice(1) === activeId
                            ? `text-indigo-700 opacity-100 active-see`
                            : ` text-gray-900`
                    } cursor-pointer font-medium select-none line-clamp-2 transition-all item-toc mb-2hover:underline hover:text-indigo-800`}
                >
                    {/* <div title={heading.value} onClick={() => handleChangeTagTOC(heading.url)}>{heading.value}</div> */}
                    {/* <Link title={heading.value} href={``}>{heading.value}</Link> */}
                    <a href={heading.url}>{heading.value}</a>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="mb-8">
            <h3 className="mb-2 font-bold">📖 Mục lục</h3>
            <Suspense>
                <div className="">{tocList}</div>
            </Suspense>
        </div>
    );
};

export default TOCInline;
