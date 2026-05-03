/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    position: 'bottom-right',
  },
  env: {
    CONTENTFULL_SPACE_ID: "viycukvlh0rc",
    CONTENTFULL_API_KEY: '_4klXEsxP4aFBaKXZ4PvRsjVdckdiojre_BB1vUtnw',
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig