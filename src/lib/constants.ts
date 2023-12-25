export const API_BASE_URL = process.env.NODE_ENV == "production"
? process.env.NEXT_PUBLIC_BASE_URL
: "http://localhost:4000";

export const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL
// export const API_BASE_URL = "http://localhost:4000";

export const DEFAULT_METADATA = {
    nameWeb: "HOANGBAOVN",
    tags: ["hoangbaovn", "webdev"],
    webUrl: "https://hoangbao.vercel.app"
}

export const REVALIDATE_TIME = 3 * 60 * 60; //3h
export const REVALIDATE_TIME_DETAILS_PAGE = 5 * 60; //5m
