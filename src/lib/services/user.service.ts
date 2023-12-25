import { API_BASE_URL } from "../constants";

export interface GetUserDetailProps {
    userId: number,
    username: string,
    name: string,
    email: string,
    avatarUrl: string,
    createdAt: Date,
    description: string | null,
    rank: number,
    role: {
        roleId: number,
        roleName: "admin" | "user"
    },
    _count: {
        blogs: number,
        userSaves: number
    }
}
class UserService {

    async loginUser(accout: string, password: string) : Promise<any> {
        try {
            const userRes = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                body: JSON.stringify({
                    email: accout,
                    password: password
                })
            });
            const user = await userRes.json();
            return user;
        } catch (error) {
            return {
                success: false,
                message: "error user successful",
                error: error
            };
        }
    }

    async getUserDetail({username, cache, next}: { username: string, cache?: RequestCache, next?: NextFetchRequestConfig }) : Promise<any> {
        try {
            const userRes = await fetch(`${API_BASE_URL}/api/users/${username || ""}`, {
                method: "GET",
                cache: cache || "default",
                next: next
            });
            const user = await userRes.json();
            return user;
        } catch (error) {
            return {
                success: false,
                message: "error user successful",
                error: error
            };
        }
    }

    async myUser(token: string) : Promise<any> {
        try {
            const userRes = await fetch(`${API_BASE_URL}/api/users/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const user = await userRes.json(); 
            return user;
        } catch (error) {
            return {
                success: false,
                message: "error user successful",
                error: error
            };
        }
    }

    async getUsersByAdmin(token: string) : Promise<any> {
        try {
            const usersRes = await fetch(`${API_BASE_URL}/api/users/admin`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const users = await usersRes.json();
            return users;
        } catch (error) {
            return {
                success: false,
                message: "error user successful",
                error: error
            };
        }
    }

    async test() : Promise<any> {
        try {
            return {
                success: true,
                message: "successful",
            };
        } catch (error) {
            return {
                success: false,
                message: "error users successful",
                error: error
            };
        }
    
    }

}

const userService = new UserService();

export default userService;