/** @type {import('next').NextConfig} */
const nextConfig = {
  env :{
    CONTENTFULL_SPACE_ID : "viycukvlh0rc",
    CONTENTFULL_API_KEY : '_4klXEsxP4aFBaKXZ4PvRsjVdckdiojre_BB1vUtnNw'
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