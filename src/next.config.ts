
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true, // Ensure React Strict Mode is enabled
  poweredByHeader: false, // Disable the X-Powered-By header for security
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
};

export default nextConfig;
