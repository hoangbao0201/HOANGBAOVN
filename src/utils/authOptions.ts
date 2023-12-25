import { NextAuthOptions } from "next-auth";
import { API_BASE_URL } from "@/lib/constants";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";


async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(API_BASE_URL + "/api/auth/refresh", {
        method: "POST",
        headers: {
            authorization: `Refresh ${token.backendTokens.refreshToken}`,
        },
    });

    const response = await res.json();

    return {
        ...token,
        backendTokens: response,
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "hoangbaovn",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;
                const { email, password } = credentials;
                const res = await fetch(API_BASE_URL + "/api/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.status == 401) {
                    return null;
                }

                const user = await res.json();

                return user;
            },
        }),
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user };

            if (new Date().getTime() < token.backendTokens.expiresIn)
                return token;

            return await refreshToken(token);
        },
        async session({ token, session }) {
            session.user = token.user;
            session.backendTokens = token.backendTokens;

            return session;
        },
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};