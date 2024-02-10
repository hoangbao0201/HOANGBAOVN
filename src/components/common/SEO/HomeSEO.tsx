import { NextSeo } from "next-seo"
import siteMetadata from "@/lib/siteMetadata"
import { format } from "date-fns"

interface HomeSeoProps {
    title: string
    slug: string
    summary: string
    images: { url: string }[]
    createdAt: Date
    updatedAt: Date
}
const HomeSeo = ({ title, slug, summary, images, createdAt, updatedAt }: HomeSeoProps) => {
    return (
        <NextSeo
            title={`${title || ""} - HOANGBAODEV`}
            description={summary}
            canonical={`${siteMetadata?.siteUrl}${slug}`}
            openGraph={{
                url: `${siteMetadata?.siteUrl}${slug}`,
                title: title,
                description: summary,
                images: images,
                type: 'article',
                article: {
                    publishedTime: format(createdAt || new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    modifiedTime: format(updatedAt || new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    expirationTime: undefined,
                    section: undefined,
                    // authors: [
                    //     `${siteMetadata?.siteUrl}/user/${blog?.author.username}`,
                    // ],
                    // tags: seoTags,
                },
            }}
            twitter={{
                handle: '@handle',
                site: '@site',
                cardType: 'summary_large_image',
            }}
        />
    )
}