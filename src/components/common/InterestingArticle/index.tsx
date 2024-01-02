import { useDebounce } from "@/hook/useDebounce";
import { GetBlogsProps } from "@/lib/services/blog.service";
import { useEffect, useState } from "react";

interface InterestingArticleProps {
    blogs: GetBlogsProps[]
}
const InterestingArticle = ({ blogs }: InterestingArticleProps) => {

    function getIDs(items: any) {
        return items.map((item: any) => item.blogId);
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

    const idList = getIDs(blogs);
    const activeId = useActiveId(idList);

    const interestArticle = useDebounce(activeId, 5000);

    useEffect(() => {
        if(activeId === interestArticle) {
            console.log("Interesting Articles: ", interestArticle);
        }
    }, [interestArticle])

    return (
        <div></div>
    )
}

export default InterestingArticle;