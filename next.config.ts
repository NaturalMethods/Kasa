import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3-eu-west-1.amazonaws.com",
            },
            {
                protocol: "http",
                hostname: process.env.BACKEND_PUBLIC_IMAGES ?? "localhost",
                port: process.env.BACKEND_PORT ?? "3000",
                pathname: "/uploads/**",
            },
        ],
    },
};

export default nextConfig;
