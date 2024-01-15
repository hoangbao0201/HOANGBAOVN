// pages/sitemap.xml.js

import blogService from "@/lib/services/blog.service";
import siteMetadata from "@/lib/siteMetadata";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const URL = siteMetadata.urlMain;
 
interface generateSiteMapProps {
    blogs: { blogId: number, title: string, slug: string }[]
}
const generateSiteMap = ({ blogs }: generateSiteMapProps) => {

    return (
        `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">

            <url>
                <loc>${URL}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>hourly</changefreq>
                <priority>1</priority>
            </url>
            <url>
                <loc>${URL}/tim-truyen</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>hourly</changefreq>
                <priority>1.0</priority>
            </url>

            ${blogs.map((blog : any) => {
                return (
                    `
                        <url>
                            <loc>${URL}/blog/${blog?.slug}-${blog?.blogId}</loc>
                            <lastmod>${blog?.updatedAt}</lastmod>
                            <changefreq>daily</changefreq>
                            <priority>0.5</priority>
                        </url>
                    `
                );
            }).join("")}    
        </urlset>`
    );
}

export const getServerSideProps : GetServerSideProps = async ({ res } : GetServerSidePropsContext) => {
    const { blogs } = await blogService.findAllSEO();

    const sitemap = generateSiteMap({ blogs: blogs });

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default function SiteMap() {
    return null
}