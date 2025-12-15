const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.paypal.com; connect-src 'self' https://www.paypal.com https://api.sandbox.paypal.com; img-src 'self' data: https://www.paypalobjects.com; style-src 'self' 'unsafe-inline'; frame-src https://www.paypal.com; font-src 'self' data:;",
  },
  { key: 'Referrer-Policy', value: 'strict-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
