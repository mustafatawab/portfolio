/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: {
        position: "bottom-right",
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.ctfassets.net",
                port: "",
            },
        ],
    },
}

module.exports = nextConfig
