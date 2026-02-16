/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  i18n: {
    locales: ['tr', 'en', 'el'],
    defaultLocale: 'tr',
  },
}

module.exports = nextConfig
