import { textToSlug } from "@/utils/testToSlug";
import { API_BASE_URL } from "../constants";

export interface TagProps {
    name: string;
    slug: string;
}
export type BlogTagProps = { tags: TagProps };

export interface PostCreateBlogProps {
    title: string;
    summary: string;
    content: string;
    published: boolean;
    blogTags: TagProps[];
}
export interface GetBlogsProps {
    blogId: number;
    slug: string;
    title: string;
    summary: string;
    content: string;
    thumbnailUrl: string;
    createdAt: Date;
    updatedAt: Date;
    blogTags: { tags: TagProps }[];
    author: {
        role: {
            roleId: number;
            roleName: "admin" | "user";
        };
        userId: number;
        name: string;
        username: string;
        email: string;
        rank: number;
    };
    _count: {
        userViews: number;
        userLikes: number;
        userSaves: number;
    };
}

export interface GetBlogDetailProps {
    blogId: number;
    slug: string;
    title: string;
    summary: string;
    content: string;
    thumbnailUrl: string;
    createdAt: Date;
    updatedAt: Date;
    blogTags: { tags: TagProps }[];
    author: {
        role: {
            roleId: number;
            roleName: "admin" | "user";
        };
        userId: number;
        name: string;
        username: string;
        email: string;
        rank: number;
    };
    blogImages: { urlImage: string }[];
    _count: {
        userViews: number;
        userLikes: number;
        userSaves: number;
    };
}
export interface GetSearchBlogsProps {
    blogId: number;
    slug: string;
    title: string;
    thumbnailUrl: string;
    createdAt: Date;
    updatedAt: Date;
    blogTags: [
        {
            tags: {
                name: string;
                slug: string;
            };
        },
        {
            tags: {
                name: string;
                slug: string;
            };
        },
        {
            tags: {
                name: string;
                slug: string;
            };
        }
    ];
    author: {
        role: {
            roleId: 3;
            roleName: "admin" | "user";
        };
        userId: 1;
        name: string;
        username: string;
    };
}
export interface GetBlogEditProps {
    blogId: number;
    slug: string;
    title: string;
    summary: string;
    content: string;
    thumbnailUrl: string;
    createdAt: Date;
    updatedAt: Date;
    blogTags: { tags: TagProps }[];
    author: {
        role: {
            roleId: number;
            roleName: "admin" | "user";
        };
        userId: number;
        name: string;
        username: string;
        email: string;
        rank: number;
    };
    blogImages: { blogImageId: number; urlImage: string }[];
    _count: {
        userViews: number;
        userLikes: number;
        userSaves: number;
    };
}
class BlogService {
    async createBlog({
        data,
        token,
    }: {
        data: PostCreateBlogProps;
        token: string;
    }): Promise<any> {
        try {
            const { title, content, published, blogTags, summary } = data;

            const blogRes = await fetch(`${API_BASE_URL}/api/blogs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: title,
                    slug: textToSlug(title),
                    content: content,
                    published: published,
                    blogTags: blogTags,
                    thumbnailUrl: "",
                    summary: summary,
                }),
            });
            const blog = await blogRes.json();
            return blog;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    async getAllBlogs({query, cache, next}: { query?: string, cache?: RequestCache, next?: NextFetchRequestConfig }): Promise<any> {
        try {
            const blogsRes = await fetch(
                `${API_BASE_URL}/api/blogs${query || ""}`,
                {
                    method: "GET",
                    cache: cache || "default",
                    next: next
                }
            );

            const blogs = await blogsRes.json();
            return blogs;
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error,
            };
        }
    }

    async searchBlogs({ query } : { query?: string }): Promise<any> {
        try {
            const blogsRes = await fetch(
                `${API_BASE_URL}/api/blogs/search${query || ""}`,
                {
                    method: "GET",
                    // headers: {
                    //     Authorization: `Bearer ${token}`
                    // }
                }
            );
            const blogs = await blogsRes.json();
            return blogs;
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error,
            };
        }
    }

    async getBlogDetail({query, cache, next}: { query?: string, cache?: RequestCache, next?: NextFetchRequestConfig }): Promise<any> {
        try {
            const blogRes = await fetch(
                `${API_BASE_URL}/api/blogs/${query || ""}`,
                {
                    method: "GET",
                    // next: { revalidate: 3*60*60 }
                    cache: "no-store",
                }
            );
            const blog = await blogRes.json();
            return blog;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    async getBlogEdit(blogId: string, token: string): Promise<any> {
        try {
            const blogRes = await fetch(
                `${API_BASE_URL}/api/blogs/edit?blogId=${blogId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                }
            );
            const blog = await blogRes.json();
            return blog;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    async updateBlog({
        data,
        token,
    }: {
        data: PostCreateBlogProps & { blogId: string };
        token: string;
    }): Promise<any> {
        try {
            const { blogId, title, content, published, summary } = data;

            const blogRes = await fetch(
                `${API_BASE_URL}/api/blogs/edit?blogId=${blogId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: title,
                        content: content,
                        published: published,
                        thumbnailUrl: "",
                        summary: summary,
                    }),
                }
            );
            const blog = await blogRes.json();
            return blog;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    async increaseView({
        blogId,
        token,
    }: {
        blogId: number;
        token?: string;
    }): Promise<any> {
        try {
            const blogRes = await fetch(
                `${API_BASE_URL}/api/blogs/view/${blogId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                }
            );
            const blog = await blogRes.json();
            return blog;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    async findAllSEO(): Promise<any> {
        try {
            const blogsRes = await fetch(
                `${API_BASE_URL}/api/blogs/seo`,
                {
                    method: "GET",
                }
            );

            const blogs = await blogsRes.json();
            return blogs;
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error,
            };
        }
    }
}

const blogService = new BlogService();

export default blogService;
