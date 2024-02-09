import axios from "axios";
import { API_BASE_URL } from "../constants";

export interface GetTagsProps {
    tagId: number,
    name: string,
    slug: string,
    _count: {
        blogTags: number
    }
}
class AuthService {

    async register(data: { name: string, username: string, email: string, password: string }): Promise<any> {
        try {
            const { name, username, email, password } = data;
            const tagsRes = await axios.post(
                `${API_BASE_URL}/api/auth/register`,
                {
                    name: name,
                    username: username,
                    email: email,
                    password: password,
                }
            );
            // const tags = await tagsRes.json();
            return tagsRes.data;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }
}

const authService = new AuthService();

export default authService;
