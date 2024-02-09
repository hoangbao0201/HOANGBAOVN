// pages/sitemap.xml.js

import blogService from "@/lib/services/blog.service";
import tagService from "@/lib/services/tag.service";
import userService from "@/lib/services/user.service";
import siteMetadata from "@/lib/siteMetadata";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const URL = siteMetadata.urlMain;
 
type UserType = { userId: number, name: string, username: string, updatedAt: Date };
type BlogType = { blogId: number, title: string, slug: string, updatedAt: Date };
type TagType = { tagId: number, name: string, slug: string };
interface generateSiteMapProps {
    users: UserType[]
    blogs: BlogType[]
    tags: TagType[]
}
const generateSiteMap = ({ users, blogs, tags }: generateSiteMapProps) => {

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
                <loc>${URL}/tags</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>hourly</changefreq>
                <priority>1.0</priority>
            </url>

            ${tags ? tags?.map((tag : TagType) => {
                return (
                    `
                        <url>
                            <loc>${URL}/tags/${tag?.slug}</loc>
                            <lastmod>${new Date().toISOString()}</lastmod>
                            <changefreq>daily</changefreq>
                            <priority>0.5</priority>
                        </url>
                    `
                );
            }).join("") : ""}  

            ${users ? users?.map((user : UserType) => {
                return (
                    `
                        <url>
                            <loc>${URL}/user/${user?.username}</loc>
                            <lastmod>${user?.updatedAt}</lastmod>
                            <changefreq>daily</changefreq>
                            <priority>0.5</priority>
                        </url>
                    `
                );
            }).join("") : ""}    

            ${blogs ? blogs?.map((blog : BlogType) => {
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
            }).join("") : ""}    
        </urlset>`
    );
}

export const getServerSideProps : GetServerSideProps = async ({ res } : GetServerSidePropsContext) => {
    const { blogs } = await blogService.findAllSEO();
    const { users } = await userService.findAllSEO();
    const { tags } = await tagService.findAllSEO();

    const sitemap = generateSiteMap({ users: users, blogs: blogs, tags: tags });

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