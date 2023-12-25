import { API_BASE_URL } from "../constants";

export interface GetCommentsProps {
    blogId: number,
    commentId: number,
    commentText: string,
    createdAt: Date,
    updatedAt: Date,
    sender: {
        userId: number,
        name: string,
        username: string,
        rank: number,
        role: {
            roleId: number,
            roleName: "user" | "admin"
        },
        avatarUrl: string | null
    },
    _count: {
        replyComments: number
    }
}

export interface GetReplyCommentsProps extends GetCommentsProps {
    receiver: {
        userId: number,
        name: string,
        username: string
    }
}

class CommentService {

    async addComment({ data, token } : { data: { receiverId?: number, parentId?: number, blogId: number, commentText: string }, token: string }): Promise<any> {
        const { receiverId, parentId, blogId, commentText } = data;

        try {
            const commentRes = await fetch(`${API_BASE_URL}/api/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    blogId: blogId,
                    receiverId,
                    parentId,
                    commentText: commentText,
                }),
            });
            const comment = await commentRes.json();
            return comment;
        } catch (error) {
            return {
                success: false,
                message: "error comment successful",
                error: error,
            };
        }
    }

    async getComments({query, cache, next}: { query?: string, cache?: RequestCache, next?: NextFetchRequestConfig }): Promise<any> {
        try {
            const commentsRes = await fetch(
                `${API_BASE_URL}/api/comments${query || ""}`,
                {
                    method: "GET",
                    cache: cache || "default",
                    next: next
                }
            );
            const comments = await commentsRes.json();
            return comments;
        } catch (error) {
            return {
                success: false,
                message: "error comments successful",
                error: error,
            };
        }
    }

    async getReplyComments({query, cache, next}: { query?: string, cache?: RequestCache, next?: NextFetchRequestConfig }): Promise<any> {
        try {
            const commentsRes = await fetch(
                `${API_BASE_URL}/api/comments/reply${query || ""}`,
                {
                    method: "GET",
                    cache: cache || "default",
                    next: next
                }
            );
            const comments = await commentsRes.json();
            return comments;
        } catch (error) {
            return {
                success: false,
                message: "error comments successful",
                error: error,
            };
        }
    }

    async deleteComment({ commentId, token } : { commentId: number, token: string }): Promise<any> {
        try {
            const commentRes = await fetch(`${API_BASE_URL}/api/comments/${commentId || ""}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const comment = await commentRes.json();
            return comment;
        } catch (error) {
            return {
                success: false,
                message: "error delete comment successful",
                error: error,
            };
        }
    }
}

const commentService = new CommentService();

export default commentService;
