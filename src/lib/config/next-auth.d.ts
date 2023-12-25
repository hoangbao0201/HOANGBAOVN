import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            userId: number
            name: string
            role: {
                roleId: number
                roleName: "admin" | "user"
            }
            username: string
            avatarUrl: string | null
            candy: number
            description: string | null
            email: string
            rank: number
            createdAt: Date
            updatedAt: Date
        };

        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            userId: number
            name: string
            role: {
                roleId: number
                roleName: "admin" | "user"
            }
            username: string
            avatarUrl: string | null
            candy: number
            description: string | null
            email: string
            rank: number
            createdAt: Date
            updatedAt: Date
        };

        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}
