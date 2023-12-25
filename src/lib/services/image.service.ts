import axios from "axios";
import { API_BASE_URL } from "../constants";


class ImageService {
    async createImageBlog({
        dataImage,
        token,
        query = ""
    }: {
        dataImage: FormData,
        token: string,
        query?: string
    }): Promise<any> {
        try {

            // const imageRes = await fetch(`${API_BASE_URL}/api/images/cloudinary/upload/blog`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${token}`,
            //     },
            //     body: formData,
            // });

            const imageRes = await axios.post(`${API_BASE_URL}/api/images/cloudinary/upload/blog${query || ""}`, dataImage, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const image = await imageRes.data;
            return image;
        } catch (error) {
            return {
                success: false,
                message: "error image successful",
                error: error,
            };
        }
    }

}

const imageService = new ImageService();

export default imageService;
