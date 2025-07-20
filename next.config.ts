
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Ensure React Strict Mode is enabled
  poweredByHeader: false, // Disable the X-Powered-By header for security
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', // Increase body size limit for server actions if needed
    },
    // This is required to allow the development environment to make requests to the Next.js server.
    allowedDevOrigins: ["https://*.cloudworkstations.dev"],
    serverComponentsExternalPackages: ['firebase', 'firebase-admin'],
  },
};

export default nextConfig;
