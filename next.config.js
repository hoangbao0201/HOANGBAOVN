/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "res.cloudinary.com",
            port: "",
            pathname: "/**",
        },
        {
            protocol: "http",
            hostname: "res.cloudinary.com",
            port: "",
            pathname: "/**",
        },
    ],
},
}

module.exports = nextConfig
