/**
 * @type {import('next').NextConfig}
 */
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  }
];

/**
 * Fetch Revalidation timeout from .env
 * Default value is 4 hours if no env config found
 */

const nextConfig = {
  /* config options here */
  images: {
    domains: ['tailwindui.com'],
    unoptimized: true
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_BASEURL: process.env.API_BASEURL,
    environment: process.env.environment,
    API_AUTH: process.env.API_AUTH,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY
  },
  compiler: {
    removeConsole: true
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  },
  i18n: {
    locales: ['default', 'en', 'es'],
    defaultLocale: 'default',
    localeDetection: false
  }
};

if (process.env.environment == 'dev') {
  nextConfig.compiler.removeConsole = false;
}

console.log(
  `\x1b[36mEnvironment:\x1b[0m`,
  `\x1b[32m${process.env.environment}\x1b[0m`
);

module.exports = nextConfig;
