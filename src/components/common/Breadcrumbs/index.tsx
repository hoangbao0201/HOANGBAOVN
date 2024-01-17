import Link from "next/link"

import IconChevronsRight from "@/components/modules/icons/IconChevronsRight"
// import { styled } from "styled-components"

// const BreadcrumbsStyle = styled.div`
    
// `

interface BreadcrumbsProps {
    className?: string
    listBreadcrumbs: { id?: number, title: string, slug: string }[]
}
const Breadcrumbs = ({ className, listBreadcrumbs }: BreadcrumbsProps) => {

    // const listBreadcrumbs = [
    //     { id: 1, title: "title 1", slug: "#"},
    //     { id: 2, title: "title 2", slug: "#"},
    //     { id: 3, title: "title 3", slug: "#"},
    // ]

    return (
        <div className={className}>
            <ul itemScope itemType="http://schema.org/BreadcrumbList" className="flex items-center flex-wrap">
                <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem" className="flex items-center font-medium text-gray-600 fill-gray-500">
                    <Link
                        itemType="http://schema.org/Thing"
                        itemProp="item"
                        title={`Trang chủ HOANGBAO`}
                        href={`/`}
                    >
                        <span itemProp="name">hoangbao</span>
                    </Link>
                    <meta itemProp="position" content={`${1}`}></meta>
                </li>
                {
                    listBreadcrumbs.map((item, index) => {
                        return (
                            <li key={index} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem" className="flex items-center font-medium text-gray-600 fill-gray-500">
                                <IconChevronsRight size={12} className="mx-2"/>
                                <Link
                                    itemType="http://schema.org/Thing"
                                    itemProp="item"
                                    title={item?.title}
                                    href={item?.slug}
                                >
                                    <span itemProp="name">{item?.title}</span>
                                </Link>
                                <meta itemProp="position" content={`${index+2}`}></meta>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Breadcrumbs;