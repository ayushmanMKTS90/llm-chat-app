/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@llm-chat/ui',
    '@llm-chat/ollama-client',
    '@llm-chat/mcp-client',
    '@llm-chat/design-tokens',
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;