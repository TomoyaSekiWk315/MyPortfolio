/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/videos/[name][ext]',
      },
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.mp4': ['file-loader'],
        '*.webm': ['file-loader'],
      },
    },
  },
}

module.exports = nextConfig 