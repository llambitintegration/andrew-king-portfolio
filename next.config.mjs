/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow all hosts for Replit proxy environment
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    // Fix Windows-specific webpack issues
    if (dev && !isServer) {
      // Configure webpack cache for Windows
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        // Add cache invalidation for better Windows compatibility
        cacheDirectory: '.next/cache/webpack',
        compression: false,
      }
      
      // Fix watchpack errors for Windows system files
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
          // Windows system files that cause watchpack errors
          /C:\\hiberfil\.sys$/,
          /C:\\pagefile\.sys$/,
          /C:\\swapfile\.sys$/,
          /C:\\DumpStack\.log\.tmp$/,
          // General Windows temp and system file patterns
          /^[A-Z]:\\(hiberfil|pagefile|swapfile)\.sys$/,
          /^[A-Z]:\\DumpStack\.log\.tmp$/,
        ],
        aggregateTimeout: 300,
        poll: false,
      }
    }
    
    return config
  },
}

export default nextConfig
