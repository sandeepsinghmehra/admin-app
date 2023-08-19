/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              port: '',
              pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'securegw-stage.paytm.in',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'securegw.paytm.in',
                port: '',
                pathname: '/**',
            }
        ],
    }
}

module.exports = nextConfig
